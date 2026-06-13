/* 2026 FIFA World Cup Portal — App v2 (TasteSkill Redesign) */

const App = {
  activeRoute: '',
  timerInterval: null,
  newsTimerInterval: null,

  async init() {
    // Clean up legacy API key data from localStorage (keys are now server-side)
    localStorage.removeItem('wc_key_football');
    localStorage.removeItem('wc_key_gnews');

    window.addEventListener('hashchange', () => this.handleRouting());
    
    // Auto re-render on system dark mode change
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      this.reRender();
    });

    await this.handleRouting();

    // Auto refresh matches every 60s
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => this.autoRefresh(), 60000);

    // Auto refresh news every 10 minutes (600s)
    if (this.newsTimerInterval) clearInterval(this.newsTimerInterval);
    this.newsTimerInterval = setInterval(() => this.newsRefresh(), 600000);
  },

  async reRender() { await this.handleRouting(); },

  async autoRefresh() {
    const isLive = this.activeRoute === '#/' || this.activeRoute === '' || this.activeRoute === '#/matches' || this.activeRoute.startsWith('#/match/');
    if (isLive) {
      Utils.cache.remove('wc_matches');
      await this.handleRouting(true);
    }
  },

  async newsRefresh() {
    Utils.cache.remove('wc_news_en');
    Utils.cache.remove('wc_news_zh-CN');
    const isNewsView = this.activeRoute === '#/' || this.activeRoute === '' || this.activeRoute === '#/news';
    if (isNewsView) {
      await this.handleRouting(true);
    }
  },

  // Fetch global voting data (live from Cloudflare KV/Functions with 10s cache)
  async getVotes() {
    const cacheKey = 'wc_votes_data';
    const cached = Utils.cache.get(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch('/api/vote');
      if (response.ok) {
        const data = await response.json();
        Utils.cache.set(cacheKey, data, 10);
        return data;
      }
    } catch (e) {
      console.warn('Failed to fetch votes from KV. Using fallback simulation.', e);
    }

    return {
      champion: {
        'Argentina': 420, 'Brazil': 380, 'France': 310, 'England': 290, 'Germany': 240, 'Spain': 260, 'Portugal': 210, 'United States': 180, 'Canada': 95, 'Mexico': 110
      },
      matches: {}
    };
  },

  // Submit a vote to Cloudflare KV
  async submitVote(type, id, option) {
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, option })
      });
      if (response.ok) {
        const data = await response.json();
        Utils.cache.remove('wc_votes_data');
        return data.votes;
      }
    } catch (e) {
      console.error('Vote submission failed:', e);
    }
    return null;
  },

  async handleRouting(silent = false) {
    const hash = window.location.hash || '#/';
    this.activeRoute = hash;
    Components.Navbar(this.activeRoute);
    Components.Footer();

    const root = document.getElementById('app-root');
    if (!silent) {
      root.innerHTML = `<div class="initial-loader"><div class="spinner"></div><p>${I18n.t('ui.loading')}</p></div>`;
    }

    try {
      if (hash === '#/' || hash === '')             await this.renderDashboard(root);
      else if (hash === '#/matches')                await this.renderSchedule(root);
      else if (hash === '#/standings')              await this.renderStandings(root);
      else if (hash === '#/news')                   await this.renderNews(root);
      else if (hash === '#/teams')                  await this.renderTeams(root);
      else if (hash.startsWith('#/team/'))          await this.renderTeamDetail(root, parseInt(hash.split('/').pop()));
      else if (hash === '#/players')                await this.renderPlayers(root);
      else if (hash === '#/fanzone')                await this.renderFanZone(root);
      else if (hash.startsWith('#/match/'))         await this.renderMatchDetail(root, parseInt(hash.split('/').pop()));
      else                                          this.render404(root);
    } catch (e) {
      console.error('Routing error:', e);
      root.innerHTML = `<div style="text-align:center;padding:4rem;color:var(--text-2)"><h3 style="font-family:'Outfit',sans-serif;font-size:1.5rem;font-weight:800">${I18n.t('ui.error')}</h3><p style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-3)">${e.message}</p></div>`;
    }
  },

  render404(container) {
    container.innerHTML = `
      <div style="text-align:center;padding:6rem 2rem;display:flex;flex-direction:column;align-items:center;gap:1rem">
        <div style="font-family:'Outfit',sans-serif;font-size:5rem;font-weight:900;color:var(--accent);line-height:1">404</div>
        <h2 style="font-family:'Outfit',sans-serif;font-size:1.5rem;font-weight:700;color:var(--text-1)">Page not found</h2>
        <p style="color:var(--text-2);font-size:0.9rem">The page you're looking for doesn't exist.</p>
        <a href="#/" style="margin-top:0.5rem;padding:0.6rem 1.25rem;background:var(--accent);color:#fff;border-radius:7px;font-weight:600;font-size:0.85rem;text-decoration:none">Back to Home</a>
      </div>
    `;
  },

  // ========== 1. Dashboard — Two-Column Layout ==========
  async renderDashboard(container) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const [matches, news, scorers, standings, banners] = await Promise.all([
      ApiService.getMatches(),
      ApiService.getNews(I18n.getLanguage()),
      ApiService.getScorers(),
      ApiService.getStandings(),
      ApiService.getBanners()
    ]);

    const upcoming = matches.filter(m => m.status === 'SCHEDULED' || m.status === 'TIMED')
      .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
    const nextMatch = upcoming[0] || null;
    const liveMatches = matches.filter(m => m.status === 'LIVE' || m.status === 'IN_PLAY');
    const todayMatches = (() => {
      const today = new Date().toDateString();
      return matches.filter(m => new Date(m.utcDate).toDateString() === today);
    })();
    const recentFinished = matches.filter(m => m.status === 'FINISHED')
      .sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate)).slice(0, 6);

    container.innerHTML = '';

    // Banner carousel (Xiaohongshu style highlight slider)
    container.appendChild(Components.BannerCarousel(banners, I18n.getLanguage()));

    // Tournament strip (replaces WC identity card)
    container.appendChild(Components.TournamentStrip(matches));

    // Two-column main grid
    const grid = Utils.el('div', { className: 'dash-main-grid' });

    // ---- LEFT COLUMN ----
    const left = Utils.el('div', { className: 'dash-left' });

    // Next match hero
    left.appendChild(Components.NextMatchCard(nextMatch));

    // Live / today's matches card
    const liveCard = Utils.el('div', { className: 'card card-pad' });
    const liveTitle = isCn ? '正在直播' : 'Live Now';
    const todayTitle = isCn ? '今日赛程' : "Today's Matches";
    const displayMatches = liveMatches.length > 0 ? liveMatches : (todayMatches.length > 0 ? todayMatches : recentFinished.slice(0, 4));
    const displayTitle = liveMatches.length > 0 ? liveTitle : (todayMatches.length > 0 ? todayTitle : (isCn ? '近期比赛' : 'Recent Matches'));

    liveCard.appendChild(Components.SectionBar(liveMatches.length > 0 ? 'radio' : 'calendar', displayTitle, '#/matches'));
    const liveGrid = Utils.el('div', { className: 'grid-2-fixed' });
    displayMatches.slice(0, 4).forEach(m => liveGrid.appendChild(Components.MatchCard(m)));
    if (displayMatches.length === 0) {
      liveCard.appendChild(Utils.el('p', { style: { color: 'var(--text-3)', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem 0' } },
        isCn ? '暂无比赛数据' : 'No matches available'
      ));
    } else {
      liveCard.appendChild(liveGrid);
    }
    left.appendChild(liveCard);

    // Goals Chart Card (Draw grouped GF/GA chart to balance the column heights and add visual stats)
    if (standings.length > 0) {
      const goalsCard = Utils.el('div', { className: 'card card-pad' });
      goalsCard.appendChild(Components.SectionBar('chart', isCn ? '球队攻防数据统计' : 'Team Attack & Defense Stats', '#/standings'));
      goalsCard.appendChild(Utils.el('canvas', { id: 'goals-canvas-dash', className: 'chart-canvas', style: { height: '220px', width: '100%' } }));
      left.appendChild(goalsCard);
    }

    grid.appendChild(left);

    // ---- RIGHT COLUMN ----
    const right = Utils.el('div', { className: 'dash-right' });

    // Today's match list (compact)
    const matchListCard = Utils.el('div', { className: 'card card-pad' });
    const sidebarMatches = todayMatches.length > 0 ? todayMatches : recentFinished;
    matchListCard.appendChild(Components.SectionBar('soccer', isCn ? '最新比赛' : 'Matches', '#/matches'));
    sidebarMatches.slice(0, 6).forEach(m => matchListCard.appendChild(Components.MatchListItem(m)));
    if (sidebarMatches.length === 0) {
      matchListCard.appendChild(Utils.el('p', { style: { color: 'var(--text-3)', fontSize: '0.8rem', padding: '1rem 0' } }, isCn ? '暂无数据' : 'No data'));
    }
    right.appendChild(matchListCard);

    // News sidebar
    const newsCard = Utils.el('div', { className: 'card card-pad' });
    newsCard.appendChild(Components.SectionBar('newspaper', isCn ? '最新新闻' : 'Latest News', '#/news'));
    news.slice(0, 5).forEach(art => newsCard.appendChild(Components.NewsRow(art)));
    right.appendChild(newsCard);

    // Scorers sidebar
    const scorersCard = Utils.el('div', { className: 'card card-pad' });
    scorersCard.appendChild(Components.SectionBar('trophy', isCn ? '射手榜' : 'Top Scorers', '#/players'));
    scorers.slice(0, 5).forEach((s, i) => scorersCard.appendChild(Components.ScorerRow(s, i + 1)));
    right.appendChild(scorersCard);

    grid.appendChild(right);
    container.appendChild(grid);

    // Group standings (full-width below)
    if (standings.length > 0) {
      const standingsSection = Utils.el('div', { style: { marginTop: '1.5rem' } });
      const sHeader = Utils.el('div', { className: 'section-bar', style: { marginBottom: '1rem' } });
      const sLeft = Utils.el('div', { className: 'section-bar-left' });
      sLeft.appendChild(Components.svgEl('table', 15));
      sLeft.appendChild(Utils.el('p', { className: 'section-bar-title' }, isCn ? '小组积分榜' : 'Group Standings'));
      sHeader.appendChild(sLeft);
      const sViewAll = Utils.el('a', { href: '#/standings', className: 'view-all-link' }, I18n.t('dashboard.viewAll'));
      sViewAll.appendChild(Components.svgEl('arrowRight', 12));
      sHeader.appendChild(sViewAll);
      standingsSection.appendChild(sHeader);

      const sGrid = Utils.el('div', { className: 'standings-grid' });
      standings.forEach(g => sGrid.appendChild(Components.GroupCard(g)));
      standingsSection.appendChild(sGrid);
      container.appendChild(standingsSection);
    }

    // Draw the goals chart after DOM is updated to avoid size calculations issues
    if (standings.length > 0) {
      setTimeout(() => {
        Charts.drawTeamGoals('goals-canvas-dash', standings, isCn);
      }, 100);
    }
  },

  // ========== 2. Schedule ==========
  async renderSchedule(container) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const matches = await ApiService.getMatches();
    container.innerHTML = '';

    const title = Utils.el('h1', { className: 'page-title' });
    title.innerHTML = isCn ? '赛事 <span class="accent">赛程</span>' : 'Tournament <span class="accent">Schedule</span>';
    container.appendChild(title);

    const tabs = Utils.el('div', { className: 'tabs-bar' });
    const listWrapper = Utils.el('div', {});

    const tabDefs = [
      { key: 'ALL', label: isCn ? '全部' : 'All' },
      { key: 'GROUP', label: isCn ? '小组赛' : 'Group Stage' },
      { key: 'KNOCKOUT', label: isCn ? '淘汰赛' : 'Knockouts' }
    ];

    const renderList = (filter) => {
      listWrapper.innerHTML = '';
      let filtered = matches;
      if (filter === 'GROUP') filtered = matches.filter(m => m.stage === 'GROUP_STAGE');
      else if (filter === 'KNOCKOUT') filtered = matches.filter(m => m.stage !== 'GROUP_STAGE');

      if (filtered.length === 0) {
        listWrapper.appendChild(Utils.el('div', { className: 'card', style: { textAlign: 'center', padding: '3rem', color: 'var(--text-3)' } }, I18n.t('schedule.noMatches')));
        return;
      }

      const groups = {};
      filtered.forEach(m => { const d = Utils.formatDateOnly(m.utcDate, isCn); if (!groups[d]) groups[d] = []; groups[d].push(m); });
      for (const [date, arr] of Object.entries(groups)) {
        const dg = Utils.el('div', { className: 'date-group' });
        dg.appendChild(Utils.el('h3', { className: 'date-group-title' }, date));
        const g = Utils.el('div', { className: 'grid-2' });
        arr.forEach(m => g.appendChild(Components.MatchCard(m)));
        dg.appendChild(g);
        listWrapper.appendChild(dg);
      }
    };

    tabDefs.forEach((td, i) => {
      const btn = Utils.el('button', { className: `tab-btn${i === 0 ? ' active' : ''}`, onClick: (e) => {
        tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderList(td.key);
      }}, td.label);
      tabs.appendChild(btn);
    });

    container.appendChild(tabs);
    container.appendChild(listWrapper);
    renderList('ALL');
  },

  // ========== 3. Standings ==========
  async renderStandings(container) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const standings = await ApiService.getStandings();
    container.innerHTML = '';

    const title = Utils.el('h1', { className: 'page-title' });
    title.innerHTML = isCn ? '小组 <span class="accent">积分榜</span>' : 'Group <span class="accent">Standings</span>';
    container.appendChild(title);

    const grid = Utils.el('div', { className: 'standings-grid' });
    standings.forEach(g => grid.appendChild(Components.GroupCard(g)));
    container.appendChild(grid);
  },

  // ========== Fan Zone ==========
  async renderFanZone(container) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const votes = await this.getVotes();
    const userVotes = JSON.parse(localStorage.getItem('wc_user_votes') || '{"champion":null,"matches":{}}');

    container.innerHTML = '';
    const fanzoneElement = Components.FanZonePage(votes, userVotes, async (type, id) => {
      if (type === 'champion') {
        userVotes.champion = id;
        localStorage.setItem('wc_user_votes', JSON.stringify(userVotes));
        Utils.showToast(isCn ? '投票成功，感谢你的支持！' : 'Vote submitted, thank you!');
        await this.submitVote(type, id);
        this.renderFanZone(container);
      }
    });

    container.appendChild(fanzoneElement);
  },

  // ========== 4. News ==========
  async renderNews(container) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const news = await ApiService.getNews(I18n.getLanguage());
    container.innerHTML = '';

    const title = Utils.el('h1', { className: 'page-title' });
    title.innerHTML = isCn ? '世界杯 <span class="accent">新闻资讯</span>' : 'World Cup <span class="accent">News</span>';
    container.appendChild(title);

    if (news.length === 0) {
      container.appendChild(Utils.el('div', { className: 'card', style: { textAlign: 'center', padding: '4rem', color: 'var(--text-3)' } }, I18n.t('news.noNews')));
      return;
    }
    const grid = Utils.el('div', { className: 'grid-3' });
    news.forEach(art => grid.appendChild(Components.NewsCard(art)));
    container.appendChild(grid);
  },

  // ========== 5. Teams ==========
  async renderTeams(container) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const teams = await ApiService.getTeams();
    container.innerHTML = '';

    const title = Utils.el('h1', { className: 'page-title' });
    title.innerHTML = isCn ? '参赛 <span class="accent">国家队</span>' : 'Participating <span class="accent">Teams</span>';
    container.appendChild(title);

    const grid = Utils.el('div', { className: 'team-grid' });
    teams.forEach(t => grid.appendChild(Components.TeamCard(t)));
    container.appendChild(grid);
  },

  // ========== 6. Team Detail ==========
  async renderTeamDetail(container, teamId) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const [matches, teams] = await Promise.all([ApiService.getMatches(), ApiService.getTeams()]);
    const team = teams.find(t => t.id === teamId);
    if (!team) {
      container.innerHTML = '<div style="text-align:center;padding:3rem"><h2 style="font-family:\'Outfit\',sans-serif">Team not found</h2><a href="#/teams" style="color:var(--accent)">← Back to Teams</a></div>';
      return;
    }

    const teamMatches = matches.filter(m => m.homeTeam.id === teamId || m.awayTeam.id === teamId);
    const coachMap = {
      'United States': 'Mauricio Pochettino', 'Mexico': 'Javier Aguirre', 'Canada': 'Jesse Marsch',
      'Argentina': 'Lionel Scaloni', 'France': 'Didier Deschamps', 'England': 'Thomas Tuchel',
      'Brazil': 'Dorival Júnior', 'Spain': 'Luis de la Fuente', 'Germany': 'Julian Nagelsmann', 'Portugal': 'Roberto Martínez'
    };

    container.innerHTML = '';

    // Back link
    container.appendChild(Utils.el('a', { href: '#/teams', style: { display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '1.25rem', fontWeight: '500' } },
      '← ' + (isCn ? '返回球队列表' : 'Back to Teams')
    ));

    // Header card
    const header = Utils.el('div', { className: 'card team-detail-header' });
    const flag = Components.createFlag(team.crest, team.name, 'team-detail-flag');
    header.appendChild(flag);

    const info = Utils.el('div');
    info.appendChild(Utils.el('h1', { className: 'team-detail-name' }, I18n.tTeam(team.name)));
    const pills = Utils.el('div', { className: 'team-pills' });
    pills.appendChild(Utils.el('span', { className: 'pill' }, `${isCn ? '组别' : 'Group'}: ${(team.group || '').replace('GROUP_', '')}`));
    pills.appendChild(Utils.el('span', { className: 'pill' }, `${isCn ? '主教练' : 'Manager'}: ${coachMap[team.name] || 'N/A'}`));
    info.appendChild(pills);
    header.appendChild(info);
    container.appendChild(header);

    // Helper to fetch national team squads
    const getSquad = (teamName) => {
      const db = {
        'Argentina': ['Lionel Messi', 'Julián Álvarez', 'Enzo Fernández', 'Alexis Mac Allister', 'Lautaro Martínez'],
        'Brazil': ['Vinícius Júnior', 'Neymar Jr', 'Rodrygo', 'Bruno Guimarães', 'Marquinhos'],
        'France': ['Kylian Mbappé', 'Antoine Griezmann', 'Ousmane Dembélé', 'Aurélien Tchouaméni', 'Theo Hernández'],
        'England': ['Harry Kane', 'Jude Bellingham', 'Bukayo Saka', 'Phil Foden', 'Declan Rice'],
        'Germany': ['Jamal Musiala', 'Florian Wirtz', 'Kai Havertz', 'Joshua Kimmich', 'Antonio Rüdiger'],
        'Spain': ['Lamine Yamal', 'Álvaro Morata', 'Pedri', 'Rodri', 'Dani Carvajal'],
        'Portugal': ['Cristiano Ronaldo', 'Bruno Fernandes', 'Bernardo Silva', 'Rafael Leão', 'Rúben Dias'],
        'United States': ['Christian Pulisic', 'Weston McKennie', 'Timothy Weah', 'Tyler Adams', 'Matt Turner'],
        'Canada': ['Alphonso Davies', 'Jonathan David', 'Cyle Larin', 'Stephen Eustáquio', 'Tajon Buchanan'],
        'Mexico': ['Santiago Giménez', 'Hirving Lozano', 'Edson Álvarez', 'Guillermo Ochoa', 'Luis Chávez']
      };
      return db[teamName] || [];
    };

    // Star Lineup (Xiaohongshu style)
    const squadList = getSquad(team.name);
    if (squadList.length > 0) {
      const lineupTitle = Utils.el('h2', { className: 'lineup-title' });
      lineupTitle.innerHTML = isCn ? '球星阵容 · <span style="color:var(--accent)">国家队大名单</span>' : 'Star Lineup · <span style="color:var(--accent)">National Squad</span>';
      container.appendChild(lineupTitle);

      const lineupScroll = Utils.el('div', { className: 'lineup-scroll-container' });
      squadList.forEach(playerName => {
        const extra = Components.getPlayerExtraDetails(playerName);
        const card = Utils.el('div', { 
          className: 'lineup-card',
          onClick: () => {
            window.preselectedPlayerName = playerName;
            location.hash = '#/players';
          }
        });

        const avatar = Components.createPlayerAvatar(playerName, 'lineup-card-avatar');
        card.appendChild(avatar);

        const pName = Utils.el('span', { className: 'lineup-card-name' }, I18n.tPlayer(playerName));
        card.appendChild(pName);

        const posText = extra.pos === 'FW' ? (isCn ? '前锋' : 'FW') :
                        extra.pos === 'MF' ? (isCn ? '中场' : 'MF') :
                        extra.pos === 'DF' ? (isCn ? '后卫' : 'DF') : (isCn ? '门将' : 'GK');
        const pPos = Utils.el('span', { className: 'lineup-card-pos' }, posText);
        card.appendChild(pPos);

        lineupScroll.appendChild(card);
      });
      container.appendChild(lineupScroll);
    }

    // Matches
    const matchTitle = Utils.el('h2', { style: { fontFamily: "'Outfit', sans-serif", fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-1)', margin: '1.5rem 0 1rem', letterSpacing: '-0.02em' } });
    matchTitle.innerHTML = isCn ? '参赛 <span style="color:var(--accent)">比赛记录</span>' : 'Match <span style="color:var(--accent)">History</span>';
    container.appendChild(matchTitle);

    const mGrid = Utils.el('div', { className: 'grid-2' });
    teamMatches.forEach(m => mGrid.appendChild(Components.MatchCard(m)));
    if (teamMatches.length === 0) {
      mGrid.appendChild(Utils.el('p', { style: { color: 'var(--text-3)', fontSize: '0.85rem' } }, isCn ? '暂无比赛记录' : 'No match records'));
    }
    container.appendChild(mGrid);
  },

  // ========== 7. Players ==========
  async renderPlayers(container) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const scorers = await ApiService.getScorers();
    container.innerHTML = '';

    const title = Utils.el('h1', { className: 'page-title' });
    title.innerHTML = isCn ? '数据统计 · <span class="accent">球员大厅</span>' : 'Stats · <span class="accent">Players Lobby</span>';
    container.appendChild(title);

    // Initial state
    let activeTab = 'goals'; // 'goals', 'assists', 'pks'
    let searchQuery = '';
    let selectedPlayer = scorers[0] || null;
    if (window.preselectedPlayerName) {
      const found = scorers.find(s => s.player.name.toLowerCase() === window.preselectedPlayerName.toLowerCase());
      if (found) {
        selectedPlayer = found;
      }
      window.preselectedPlayerName = null;
    }

    // Split container
    const lobby = Utils.el('div', { className: 'players-lobby' });
    const leftCol = Utils.el('div', { className: 'players-list-column' });
    const rightCol = Utils.el('div', { className: 'player-detail-column' });

    // Search bar
    const searchWrap = Utils.el('div', { className: 'player-search-wrap' });
    const searchInput = Utils.el('input', {
      type: 'text',
      className: 'player-search-input',
      placeholder: I18n.t('players.searchPlaceholder'),
      value: searchQuery,
      onInput: (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        updateList();
      }
    });
    searchWrap.appendChild(searchInput);
    leftCol.appendChild(searchWrap);

    // Filter tabs
    const filterTabs = Utils.el('div', { className: 'player-filter-tabs' });
    const tabs = [
      { id: 'goals', label: I18n.t('players.tabScorers'), icon: '⚽' },
      { id: 'assists', label: I18n.t('players.tabAssists'), icon: '👟' },
      { id: 'pks', label: I18n.t('players.tabPKs'), icon: '🎯' }
    ];

    const tabButtons = {};
    tabs.forEach(t => {
      const btn = Utils.el('button', {
        className: `player-filter-btn ${activeTab === t.id ? 'active' : ''}`,
        onClick: () => {
          Object.values(tabButtons).forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeTab = t.id;
          updateList();
        }
      });
      btn.innerHTML = `${t.icon} ${t.label}`;
      tabButtons[t.id] = btn;
      filterTabs.appendChild(btn);
    });
    leftCol.appendChild(filterTabs);

    // List container
    const listContainer = Utils.el('div', { className: 'players-scroll-list' });
    leftCol.appendChild(listContainer);
    lobby.appendChild(leftCol);
    lobby.appendChild(rightCol);
    container.appendChild(lobby);

    // Function to update the list when search/tab changes
    const updateList = () => {
      listContainer.innerHTML = '';

      // Filter and Sort
      let filtered = scorers.filter(s => {
        const nameMatch = s.player.name.toLowerCase().includes(searchQuery);
        const teamMatch = s.team.name.toLowerCase().includes(searchQuery) || 
                          I18n.tTeam(s.team.name).toLowerCase().includes(searchQuery);
        return nameMatch || teamMatch;
      });

      // Sort based on active tab
      if (activeTab === 'goals') {
        filtered.sort((a, b) => (b.goals || 0) - (a.goals || 0));
      } else if (activeTab === 'assists') {
        filtered.sort((a, b) => (b.assists || 0) - (a.assists || 0));
      } else if (activeTab === 'pks') {
        filtered.sort((a, b) => (b.penalties || 0) - (a.penalties || 0));
      }

      // If selected player is no longer in filtered list, select first of filtered
      if (filtered.length > 0) {
        if (!filtered.find(p => p.player.id === selectedPlayer?.player?.id)) {
          selectedPlayer = filtered[0];
        }
      } else {
        selectedPlayer = null;
      }

      // Render rows
      if (filtered.length === 0) {
        listContainer.appendChild(Utils.el('p', { className: 'no-players-text' }, isCn ? '没有找到符合条件的球员' : 'No matching players found'));
      } else {
        filtered.forEach((s, idx) => {
          const isSelected = selectedPlayer && selectedPlayer.player.id === s.player.id;
          const row = Utils.el('div', { 
            className: `player-lobby-row ${isSelected ? 'active' : ''}`,
            onClick: () => {
              // Highlight row
              const rows = listContainer.querySelectorAll('.player-lobby-row');
              rows.forEach(r => r.classList.remove('active'));
              row.classList.add('active');
              
              selectedPlayer = s;
              renderDetail();

              // On mobile, show detail card in overlay
              if (window.innerWidth <= 768) {
                showMobileDrawer();
              }
            }
          });

          // Rank
          row.appendChild(Utils.el('span', { className: `player-row-rank ${idx < 3 ? 'top3' : ''}` }, idx + 1));
          
          // Avatar
          const avatar = Components.createPlayerAvatar(s.player.name, 'player-row-avatar');
          row.appendChild(avatar);

          // Name and Team
          const meta = Utils.el('div', { className: 'player-row-meta' });
          meta.appendChild(Utils.el('span', { className: 'player-row-name' }, I18n.tPlayer(s.player.name)));
          
          const teamBadge = Utils.el('span', { className: 'player-row-team' });
          const teamFlag = Components.createFlag(s.team.crest, s.team.name, 'flag-sm');
          teamFlag.style.width = '12px';
          teamFlag.style.height = '12px';
          teamFlag.style.borderRadius = '50%';
          teamBadge.appendChild(teamFlag);
          teamBadge.appendChild(Utils.el('span', {}, I18n.tTeam(s.team.name)));
          meta.appendChild(teamBadge);
          row.appendChild(meta);

          // Stat Value
          let val = 0;
          let label = '';
          if (activeTab === 'goals') {
            val = s.goals || 0;
            label = isCn ? '进球' : 'G';
          } else if (activeTab === 'assists') {
            val = s.assists || 0;
            label = isCn ? '助攻' : 'A';
          } else if (activeTab === 'pks') {
            val = s.penalties || 0;
            label = isCn ? '点球' : 'PK';
          }

          const valueBadge = Utils.el('div', { className: 'player-row-stat-badge' });
          valueBadge.appendChild(Utils.el('span', { className: 'badge-num' }, val));
          valueBadge.appendChild(Utils.el('span', { className: 'badge-lbl' }, label));
          row.appendChild(valueBadge);

          listContainer.appendChild(row);
        });
      }

      renderDetail();
    };

    // Render detailed card
    const renderDetail = () => {
      rightCol.innerHTML = '';
      if (!selectedPlayer) {
        const hint = Utils.el('div', { className: 'player-detail-hint' });
        hint.appendChild(Utils.el('span', { style: { fontSize: '2rem' } }, '👤'));
        hint.appendChild(Utils.el('p', {}, I18n.t('players.selectHint')));
        rightCol.appendChild(hint);
        return;
      }

      const detailCard = Components.PlayerDetailCard(selectedPlayer, isCn);
      rightCol.appendChild(detailCard);
    };

    // Show mobile drawer/overlay
    const showMobileDrawer = () => {
      let overlay = document.getElementById('player-mobile-overlay');
      if (overlay) overlay.remove();

      overlay = Utils.el('div', { id: 'player-mobile-overlay', className: 'player-mobile-overlay' });
      const drawerContainer = Utils.el('div', { className: 'player-mobile-container' });
      
      const closeBtn = Utils.el('button', {
        className: 'player-mobile-close',
        onClick: () => {
          overlay.classList.remove('active');
          setTimeout(() => overlay.remove(), 300);
        }
      }, '✕');
      
      drawerContainer.appendChild(closeBtn);
      drawerContainer.appendChild(Components.PlayerDetailCard(selectedPlayer, isCn));
      overlay.appendChild(drawerContainer);
      document.body.appendChild(overlay);

      // Trigger transition
      setTimeout(() => overlay.classList.add('active'), 10);
    };

    // Initial render
    updateList();
  },

  // ========== 8. Match Detail ==========
  async renderMatchDetail(container, matchId) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const matches = await ApiService.getMatches();
    const match = matches.find(m => m.id === matchId);
    if (!match) {
      container.innerHTML = '<div style="text-align:center;padding:3rem"><h2>Match not found</h2><a href="#/matches" style="color:var(--accent)">← Back to Schedule</a></div>';
      return;
    }

    const homeScore = match.score.fullTime.home;
    const awayScore = match.score.fullTime.away;
    const isFinished = match.status === 'FINISHED';
    container.innerHTML = '';

    // Back link
    container.appendChild(Utils.el('a', { href: '#/matches', style: { display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '1.25rem', fontWeight: '500' } },
      '← ' + (isCn ? '返回赛程' : 'Back to Schedule')
    ));

    // Hero card
    const hero = Utils.el('div', { className: 'card match-hero' });
    hero.appendChild(Utils.el('div', { className: 'match-hero-stage' },
      `${Utils.translateStage(match.stage, isCn)}${match.group ? ' · ' + match.group.replace('GROUP_', '') : ''}`
    ));

    const board = Utils.el('div', { className: 'match-hero-board' });

    const makeHeroTeam = (team) => {
      const div = Utils.el('div', { className: 'match-hero-team' });
      const flagImg = Utils.el('img', { className: 'match-hero-flag', alt: team.name });
      flagImg.src = team.crest || '';
      flagImg.onerror = () => { flagImg.style.opacity = '0.2'; };
      div.appendChild(flagImg);
      div.appendChild(Utils.el('span', { className: 'match-hero-name' }, I18n.tTeam(team.name)));
      return div;
    };

    board.appendChild(makeHeroTeam(match.homeTeam));
    board.appendChild(Utils.el('div', { className: 'match-hero-score' },
      Utils.el('span', {}, homeScore !== null ? homeScore : '-'),
      Utils.el('span', { className: 'score-dash' }, ':'),
      Utils.el('span', {}, awayScore !== null ? awayScore : '-')
    ));
    board.appendChild(makeHeroTeam(match.awayTeam));
    hero.appendChild(board);

    hero.appendChild(Utils.el('div', { className: 'match-hero-meta' },
      Utils.el('span', {}, `${isCn ? '开球时间' : 'Kickoff'}: ${Utils.formatDate(match.utcDate, isCn)}`),
      Utils.el('span', {}, `${isCn ? '场地' : 'Venue'}: ${match.venue || 'N/A'}`),
      Utils.el('span', {}, `${isCn ? '裁判' : 'Referee'}: ${match.referee || 'N/A'}`)
    ));
    container.appendChild(hero);

    // Stats table (for finished matches)
    if (isFinished) {
      const statsTitle = Utils.el('h3', { style: { fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: '700', color: 'var(--text-1)', margin: '1.5rem 0 0.85rem' } },
        isCn ? '比赛统计' : 'Match Statistics'
      );
      container.appendChild(statsTitle);

      const stats = [
        { name: isCn ? '控球率' : 'Possession', home: '54%', away: '46%' },
        { name: isCn ? '射门' : 'Shots', home: '14', away: '9' },
        { name: isCn ? '射正' : 'On Target', home: '6', away: '3' },
        { name: isCn ? '犯规' : 'Fouls', home: '11', away: '14' },
        { name: isCn ? '角球' : 'Corners', home: '5', away: '4' },
        { name: isCn ? '黄牌' : 'Yellow Cards', home: '2', away: '3' },
      ];

      const wrap = Utils.el('div', { className: 'data-table-wrap' });
      const tbl = Utils.el('table', { className: 'data-table' });
      const tb = Utils.el('tbody');
      stats.forEach(s => {
        const row = Utils.el('tr');
        row.appendChild(Utils.el('td', { style: { textAlign: 'left', fontWeight: '700', fontVariantNumeric: 'tabular-nums' } }, s.home));
        row.appendChild(Utils.el('td', { style: { textAlign: 'center', color: 'var(--text-2)', fontWeight: '600', fontSize: '0.8rem' } }, s.name));
        row.appendChild(Utils.el('td', { style: { textAlign: 'right', fontWeight: '700', fontVariantNumeric: 'tabular-nums' } }, s.away));
        tb.appendChild(row);
      });
      tbl.appendChild(tb);
      wrap.appendChild(tbl);
      container.appendChild(wrap);
    } else {
      // Show match outcome prediction voting for scheduled/live matches
      const votes = await this.getVotes();
      const userVotes = JSON.parse(localStorage.getItem('wc_user_votes') || '{"champion":null,"matches":{}}');
      
      const voteWidget = Components.MatchVoteWidget(match, votes.matches[match.id], userVotes.matches[match.id], async (type, matchId, option) => {
        userVotes.matches[matchId] = option;
        localStorage.setItem('wc_user_votes', JSON.stringify(userVotes));
        Utils.showToast(isCn ? '预测成功，感谢参与！' : 'Prediction recorded, thanks!');
        await this.submitVote(type, matchId, option);
        this.renderMatchDetail(container, matchId);
      });
      container.appendChild(voteWidget);
    }
  }
};

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  window.App = App;
  App.init();
});
