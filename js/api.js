/* 2026 FIFA World Cup Portal - API Service Layer
   All external API calls are proxied through Cloudflare Pages Functions (/api/*).
   API keys are stored server-side in Cloudflare environment variables. */

const ApiService = {

  // Fetch helper with error handling
  async fetchJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (e) {
      console.warn(`Fetch failed for: ${url}`, e);
      throw e;
    }
  },

  // Get fallback mock data (local JSON, no API key needed)
  async getFallbackData() {
    const cached = Utils.cache.get('fallback_data');
    if (cached) return cached;

    try {
      const res = await fetch('data/fallback-data.json');
      const data = await res.json();
      Utils.cache.set('fallback_data', data, 3600);
      return data;
    } catch (e) {
      console.error('Failed to load fallback-data.json:', e);
      return { standings: [], matches: [], scorers: [], news: { 'en': [] } };
    }
  },

  // 1. Matches (Schedule & Live Scores)
  async getMatches() {
    const cacheKey = 'wc_matches';
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.fetchJSON('/api/matches');

      if (data && data.matches) {
        Utils.cache.set(cacheKey, data.matches, 60);
        return data.matches;
      }
      throw new Error('Invalid matches data structure');
    } catch (e) {
      console.warn('Matches API failed. Falling back to local data.');
      const fallback = await this.getFallbackData();
      return fallback.matches;
    }
  },

  // 2. Standings
  async getStandings() {
    const cacheKey = 'wc_standings';
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.fetchJSON('/api/standings');

      if (data && data.standings) {
        Utils.cache.set(cacheKey, data.standings, 300);
        return data.standings;
      }
      throw new Error('Invalid standings data structure');
    } catch (e) {
      console.warn('Standings API failed. Falling back to local data.');
      const fallback = await this.getFallbackData();
      return fallback.standings;
    }
  },

  // 3. Scorers
  async getScorers() {
    const cacheKey = 'wc_scorers';
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.fetchJSON('/api/scorers');

      if (data && data.scorers) {
        Utils.cache.set(cacheKey, data.scorers, 300);
        return data.scorers;
      }
      throw new Error('Invalid scorers data structure');
    } catch (e) {
      console.warn('Scorers API failed. Falling back to local data.');
      const fallback = await this.getFallbackData();
      return fallback.scorers;
    }
  },

  // 4. Teams (derived from standings to save API quota)
  async getTeams() {
    const cacheKey = 'wc_teams_list';
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    try {
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
        Utils.cache.set(cacheKey, teamsList, 600);
        return teamsList;
      }

      const fallback = await this.getFallbackData();
      return fallback.standings.flatMap(g => g.table.map(t => ({...t.team, group: g.group})));
    } catch (e) {
      const fallback = await this.getFallbackData();
      return fallback.standings.flatMap(g => g.table.map(t => ({...t.team, group: g.group})));
    }
  },

  // 5. News
  async getNews(lang = 'en') {
    // Force English to retrieve rich World Cup news articles, avoiding the sparse/garbled Chinese results from GNews.
    const targetLang = 'en';
    const cacheKey = `wc_news_${targetLang}`;
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.fetchJSON(`/api/news?lang=${targetLang}`);

      if (data && data.articles) {
        Utils.cache.set(cacheKey, data.articles, 600);
        return data.articles;
      }
      throw new Error('Invalid news response structure');
    } catch (e) {
      console.warn('News API failed. Falling back to local news.');
      const fallback = await this.getFallbackData();
      return fallback.news[targetLang] || fallback.news['en'] || [];
    }
  },

  // 6. Player Bio
  async getPlayerBio(name, lang = 'zh-CN') {
    const cacheKey = `bio_${name}_${lang}`;
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.fetchJSON(`/api/player-bio?name=${encodeURIComponent(name)}&lang=${lang}`);
      if (data && data.bio !== undefined) {
        Utils.cache.set(cacheKey, data.bio, 86400); // Cache locally for 24 hours
        return data.bio;
      }
      return '';
    } catch (e) {
      console.warn(`Player bio API failed for ${name}:`, e);
      return '';
    }
  },

  // 7. Banners (Video highlights from Xiaohongshu World Cup portal)
  async getBanners() {
    const fallback = await this.getFallbackData();
    return fallback.banners || [];
  }
};
