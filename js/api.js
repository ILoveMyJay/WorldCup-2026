/* 2026 FIFA World Cup Portal - API Service Layer */

const ApiService = {
  // Pre-configured API keys provided by the user
  DEFAULT_KEYS: {
    football: '2dd9538e55ec4835b66e5d54583e4fa5',
    gnews: '5f43d1e07702a7d37a9e8725ec9bdde0'
  },

  // Rotated list of GNews API keys provided by the user
  GNEWS_KEYS: [
    '5f43d1e07702a7d37a9e8725ec9bdde0',
    'ea1f982ccc563371598966c650b4531b',
    'fe9c2b6b84abfcb634bd049e75a84d8e'
  ],
  gnewsKeyIndex: 0,

  // Get active keys (prioritize user local input, fallback to rotated keys)
  getKeys() {
    return {
      football: localStorage.getItem('wc_key_football') || this.DEFAULT_KEYS.football,
      gnews: localStorage.getItem('wc_key_gnews') || this.GNEWS_KEYS[this.gnewsKeyIndex]
    };
  },

  // Save keys
  saveKeys(footballKey, gnewsKey) {
    if (footballKey) localStorage.setItem('wc_key_football', footballKey.trim());
    if (gnewsKey) localStorage.setItem('wc_key_gnews', gnewsKey.trim());
  },

  // Clear keys
  clearKeys() {
    localStorage.removeItem('wc_key_football');
    localStorage.removeItem('wc_key_gnews');
  },

  // Fetch helper with headers and rate-limiting handles
  async fetchWithAuth(url, headers = {}) {
    let targetUrl = url;
    // 如果是 football-data.org 的请求，自动通过 CORS 代理转发以绕过浏览器跨域限制
    if (url.includes('api.football-data.org')) {
      targetUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    }

    try {
      const response = await fetch(targetUrl, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (e) {
      console.warn(`Fetch failed for URL: ${targetUrl}. Error:`, e);
      throw e;
    }
  },

  // Get fallback mock data
  async getFallbackData() {
    const cached = Utils.cache.get('fallback_data');
    if (cached) return cached;

    try {
      const res = await fetch('data/fallback-data.json');
      const data = await res.json();
      // Cache fallback data for 1 hour to reduce file system requests
      Utils.cache.set('fallback_data', data, 3600);
      return data;
    } catch (e) {
      console.error('Failed to load fallback-data.json:', e);
      return { standings: [], matches: [], scorers: [], news: { 'zh-CN': [], 'en': [] } };
    }
  },

  // 1. Matches (Schedule & Live Scores)
  async getMatches() {
    const cacheKey = 'wc_matches';
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    const keys = this.getKeys();
    if (!keys.football) {
      console.log('No Football API key. Using fallback data.');
      const fallback = await this.getFallbackData();
      return fallback.matches;
    }

    try {
      // football-data.org WC Matches endpoint
      // Note: Because of free-tier restrictions and CORS on browsers, we catch errors and fallback.
      const url = 'https://api.football-data.org/v4/competitions/WC/matches';
      const data = await this.fetchWithAuth(url, {
        'X-Auth-Token': keys.football
      });
      
      if (data && data.matches) {
        Utils.cache.set(cacheKey, data.matches, 60); // Cache for 60 seconds (rate limit friendly)
        return data.matches;
      }
      throw new Error('Invalid matches data structure');
    } catch (e) {
      console.warn('Matches API call failed. Falling back to local data.');
      const fallback = await this.getFallbackData();
      return fallback.matches;
    }
  },

  // 2. Standings
  async getStandings() {
    const cacheKey = 'wc_standings';
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    const keys = this.getKeys();
    if (!keys.football) {
      const fallback = await this.getFallbackData();
      return fallback.standings;
    }

    try {
      const url = 'https://api.football-data.org/v4/competitions/WC/standings';
      const data = await this.fetchWithAuth(url, {
        'X-Auth-Token': keys.football
      });
      
      if (data && data.standings) {
        Utils.cache.set(cacheKey, data.standings, 300); // Cache standings for 5 minutes
        return data.standings;
      }
      throw new Error('Invalid standings data structure');
    } catch (e) {
      console.warn('Standings API call failed. Falling back to local standings.');
      const fallback = await this.getFallbackData();
      return fallback.standings;
    }
  },

  // 3. Scorers
  async getScorers() {
    const cacheKey = 'wc_scorers';
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    const keys = this.getKeys();
    if (!keys.football) {
      const fallback = await this.getFallbackData();
      return fallback.scorers;
    }

    try {
      const url = 'https://api.football-data.org/v4/competitions/WC/scorers';
      const data = await this.fetchWithAuth(url, {
        'X-Auth-Token': keys.football
      });
      
      if (data && data.scorers) {
        Utils.cache.set(cacheKey, data.scorers, 300); // Cache scorers for 5 minutes
        return data.scorers;
      }
      throw new Error('Invalid scorers data structure');
    } catch (e) {
      console.warn('Scorers API call failed. Falling back to local scorers.');
      const fallback = await this.getFallbackData();
      return fallback.scorers;
    }
  },

  // 4. World Cup Teams (Generated from Standings or Matches to avoid extra requests)
  async getTeams() {
    const cacheKey = 'wc_teams_list';
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    try {
      // We can derive the list of unique teams from standings or matches
      // This saves API request quota!
      const standings = await this.getStandings();
      const teamsMap = new Map();

      standings.forEach(groupStanding => {
        if (groupStanding.table) {
          groupStanding.table.forEach(row => {
            const team = row.team;
            if (team && !teamsMap.has(team.id)) {
              teamsMap.set(team.id, {
                id: team.id,
                name: team.name,
                crest: team.crest,
                group: groupStanding.group
              });
            }
          });
        }
      });

      const teamsList = Array.from(teamsMap.values()).sort((a, b) => a.name.localeCompare(b.name));
      if (teamsList.length > 0) {
        Utils.cache.set(cacheKey, teamsList, 600); // Cache teams list for 10 minutes
        return teamsList;
      }
      
      // Fallback if standings empty
      const fallback = await this.getFallbackData();
      return fallback.standings.flatMap(g => g.table.map(t => ({...t.team, group: g.group})));
    } catch (e) {
      const fallback = await this.getFallbackData();
      return fallback.standings.flatMap(g => g.table.map(t => ({...t.team, group: g.group})));
    }
  },

  // 5. News from GNews.io - Always fetch English news for rich real-time content
  async getNews() {
    const apiLang = 'en';
    const cacheKey = 'wc_news_en';
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    // Use user-configured key if present, otherwise rotate our default keys.
    // If the key matches one of our GNEWS_KEYS, we still rotate it on failure.
    let gnewsKey = localStorage.getItem('wc_key_gnews');
    let usingRotatedKeys = false;
    if (!gnewsKey || this.GNEWS_KEYS.includes(gnewsKey)) {
      gnewsKey = this.GNEWS_KEYS[this.gnewsKeyIndex];
      usingRotatedKeys = true;
    }

    if (!gnewsKey) {
      console.log('No GNews key available. Using fallback news.');
      const fallback = await this.getFallbackData();
      return fallback.news['en'] || [];
    }

    try {
      const query = encodeURIComponent('"World Cup 2026" OR "FIFA World Cup"');
      const url = `https://gnews.io/api/v4/search?q=${query}&lang=${apiLang}&max=10&apikey=${gnewsKey}`;
      
      const data = await this.fetchWithAuth(url);
      
      if (data && data.articles) {
        const articles = data.articles.map(art => ({
          title: art.title,
          description: art.description,
          content: art.content,
          url: art.url,
          image: art.image || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop',
          publishedAt: art.publishedAt,
          source: {
            name: art.source.name,
            url: art.source.url
          }
        }));

        Utils.cache.set(cacheKey, articles, 600);
        return articles;
      }
      throw new Error('Invalid news response structure');
    } catch (e) {
      console.warn(`GNews API call failed with key: ${gnewsKey}.`);

      // Rotate default key and retry if using default keys
      if (usingRotatedKeys && this.gnewsKeyIndex < this.GNEWS_KEYS.length - 1) {
        this.gnewsKeyIndex++;
        console.log(`Rotating to next GNews key at index: ${this.gnewsKeyIndex}`);
        return await this.getNews();
      }

      console.warn('GNews API exhausted or failed. Falling back to local news.');
      const fallback = await this.getFallbackData();
      return fallback.news['en'] || [];
    }
  }
};
