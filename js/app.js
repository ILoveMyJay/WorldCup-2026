/* 2026 FIFA World Cup Portal — App v2 (TasteSkill Redesign) */

const App = {
  activeRoute: '',
  timerInterval: null,
  newsTimerInterval: null,

  async init() {
    // Pre-populate default API keys
    if (!localStorage.getItem('wc_key_football') && !localStorage.getItem('wc_key_gnews')) {
      localStorage.setItem('wc_key_football', ApiService.DEFAULT_KEYS.football);
      localStorage.setItem('wc_key_gnews', ApiService.DEFAULT_KEYS.gnews);
    }
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
    const isNewsView = this.activeRoute === '#/' || this.activeRoute === '' || this.activeRoute === '#/news';
    if (isNewsView) {
      await this.handleRouting(true);
    }
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
    const [matches, news, scorers, standings] = await Promise.all([
      ApiService.getMatches(),
      ApiService.getNews(I18n.getLanguage()),
      ApiService.getScorers(),
      ApiService.getStandings()
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
    title.innerHTML = isCn ? '数据统计 · <span class="accent">射手榜</span>' : 'Stats · <span class="accent">Top Scorers</span>';
    container.appendChild(title);

    // Chart
    const chartCard = Utils.el('div', { className: 'card card-pad', style: { marginBottom: '1.5rem' } });
    chartCard.appendChild(Components.SectionBar('chart', I18n.t('players.visualTitle')));
    chartCard.appendChild(Utils.el('canvas', { id: 'scorers-canvas-full', className: 'chart-canvas', style: { height: '300px' } }));
    container.appendChild(chartCard);

    // Table
    const wrap = Utils.el('div', { className: 'data-table-wrap' });
    const table = Utils.el('table', { className: 'data-table' });
    table.appendChild(Utils.el('thead', {},
      Utils.el('tr', {},
        Utils.el('th', { style: { textAlign: 'center', width: '40px' } }, '#'),
        Utils.el('th', {}, isCn ? '球员' : 'Player'),
        Utils.el('th', {}, isCn ? '国家队' : 'Team'),
        Utils.el('th', { style: { textAlign: 'right' } }, isCn ? '进球' : 'Goals'),
        Utils.el('th', { style: { textAlign: 'right' } }, isCn ? '助攻' : 'Assists'),
        Utils.el('th', { style: { textAlign: 'right' } }, isCn ? '点球' : 'Pens')
      )
    ));
    const tbody = Utils.el('tbody');
    scorers.forEach((s, i) => {
      const row = Utils.el('tr');
      row.appendChild(Utils.el('td', { style: { textAlign: 'center', fontWeight: '700', color: i < 3 ? 'var(--accent)' : 'var(--text-3)', fontVariantNumeric: 'tabular-nums' } }, i + 1));
      row.appendChild(Utils.el('td', { style: { fontWeight: '600', color: 'var(--text-1)' } }, s.player.name));
      const teamCell = Utils.el('td');
      const teamInner = Utils.el('span', { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' } });
      const teamFlag = Utils.el('img', { className: 'flag-sm', alt: s.team.name });
      teamFlag.src = s.team.crest || '';
      teamFlag.onerror = () => { teamFlag.style.opacity = '0.2'; };
      teamInner.appendChild(teamFlag);
      teamInner.appendChild(document.createTextNode(I18n.tTeam(s.team.name)));
      teamCell.appendChild(teamInner);
      row.appendChild(teamCell);
      row.appendChild(Utils.el('td', { style: { textAlign: 'right', fontWeight: '700', color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' } }, s.goals));
      row.appendChild(Utils.el('td', { className: 'num-col', style: { textAlign: 'right' } }, s.assists || 0));
      row.appendChild(Utils.el('td', { className: 'num-col', style: { textAlign: 'right' } }, s.penalties || 0));
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    container.appendChild(wrap);

    setTimeout(() => Charts.drawScorers('scorers-canvas-full', scorers, isCn), 100);
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
    }
  }
};

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  window.App = App;
  App.init();
});
