/* 2026 FIFA World Cup Portal — UI Components v2 (TasteSkill Redesign) */

const Components = {

  // ========== SVG Icon Library ==========
  icons: {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
    table: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>',
    newspaper: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    externalLink: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    radio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>',
    soccer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
  },

  svgEl(iconKey, size = 16) {
    const d = document.createElement('span');
    d.innerHTML = this.icons[iconKey] || '';
    const svg = d.firstChild;
    if (svg) { svg.setAttribute('width', size); svg.setAttribute('height', size); }
    return d;
  },

  // Helper to generate a flag image or a beautiful SVG placeholder for undetermined (TBD) teams
  createFlag(crestUrl, name, sizeClass = 'flag-sm') {
    const isTbd = !name || name.includes('To Be Decided') || name.includes('Winner Group') || name.includes('Runner-up') || name.includes('TBD') || name.includes('W32') || name.includes('W16') || name.includes('W8') || name.includes('W4') || name.includes('RU ') || name.trim() === 'VS';
    
    if (isTbd || !crestUrl) {
      const svgContainer = document.createElement('div');
      svgContainer.innerHTML = `<svg class="${sizeClass} tbd-flag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="color:var(--text-3);padding:1px;display:inline-block;vertical-align:middle;box-sizing:border-box;background:var(--surface-2);"><circle cx="12" cy="12" r="10" stroke-dasharray="3.5 2.5"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 1.5-1.5 2.2-2.3 2.8c-.5.4-.7.7-.7 1.2"/><circle cx="12" cy="16.5" r="1.2" fill="currentColor" stroke="none"/></svg>`;
      return svgContainer.firstChild;
    }

    const img = Utils.el('img', { className: sizeClass, alt: name });
    img.src = crestUrl;
    img.onerror = () => {
      const svg = document.createElement('div');
      svg.innerHTML = `<svg class="${sizeClass} tbd-flag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="color:var(--text-3);padding:1px;display:inline-block;vertical-align:middle;box-sizing:border-box;background:var(--surface-2);"><circle cx="12" cy="12" r="10" stroke-dasharray="3.5 2.5"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 1.5-1.5 2.2-2.3 2.8c-.5.4-.7.7-.7 1.2"/><circle cx="12" cy="16.5" r="1.2" fill="currentColor" stroke="none"/></svg>`;
      img.replaceWith(svg.firstChild);
    };
    return img;
  },

  // Helper to generate a premium player monogram avatar with dynamic color variations
  createPlayerAvatar(playerName, sizeClass = 'scorer-avatar') {
    if (!playerName) return this.createFlag('', '', sizeClass);
    
    const parts = playerName.trim().split(/\s+/);
    let initials = '';
    if (parts.length > 1) {
      initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length > 0) {
      initials = parts[0].substring(0, 2).toUpperCase();
    } else {
      initials = '??';
    }

    let hash = 0;
    for (let i = 0; i < playerName.length; i++) {
      hash = playerName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    const bgStart = `hsl(${hue}, 80%, 92%)`;
    const bgEnd = `hsl(${hue}, 80%, 80%)`;
    const textColor = `hsl(${hue}, 85%, 22%)`;

    return Utils.el('div', { 
      className: sizeClass,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${bgStart}, ${bgEnd})`,
        color: textColor,
        fontWeight: '700',
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.72rem',
        borderRadius: '50%',
        border: '1px solid var(--border)',
        flexShrink: '0',
        userSelect: 'none'
      }
    }, initials);
  },

  // ========== Navigation Bar ==========
  Navbar(activeRoute) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const otherLang = isCn ? 'en' : 'zh-CN';
    const langBtnText = isCn ? 'EN' : '中';

    const menuItems = [
      { route: '#/', label: isCn ? '首页' : 'Home', icon: 'home' },
      { route: '#/news', label: isCn ? '新闻' : 'News', icon: 'newspaper' },
      { route: '#/matches', label: isCn ? '赛程' : 'Schedule', icon: 'calendar' },
      { route: '#/standings', label: isCn ? '积分榜' : 'Standings', icon: 'table' },
      { route: '#/teams', label: isCn ? '球队' : 'Teams', icon: 'flag' },
      { route: '#/players', label: isCn ? '球员' : 'Players', icon: 'users' },
    ];

    const header = document.getElementById('main-header');
    header.innerHTML = '';

    const nav = Utils.el('nav', { className: 'nav-shell' });

    // Brand
    const brand = Utils.el('a', { href: '#/', className: 'brand' });
    const brandIcon = Utils.el('div', { className: 'brand-icon' }, '⚽');
    const brandText = document.createElement('span');
    brandText.className = 'brand-text';
    brandText.innerHTML = 'WorldCup<sup>2026</sup>';
    brand.appendChild(brandIcon);
    brand.appendChild(brandText);
    nav.appendChild(brand);

    // Menu
    const ul = Utils.el('ul', { id: 'nav-menu', className: 'nav-menu' });
    menuItems.forEach(item => {
      const isActive = activeRoute === item.route ||
        (item.route === '#/' && (activeRoute === '' || activeRoute === '#/')) ||
        (item.route === '#/matches' && activeRoute.startsWith('#/match/')) ||
        (item.route === '#/teams' && activeRoute.startsWith('#/team/'));
      const link = Utils.el('a', { href: item.route, className: `nav-link ${isActive ? 'active' : ''}` });
      link.appendChild(this.svgEl(item.icon, 15));
      link.appendChild(document.createTextNode(' ' + item.label));
      ul.appendChild(Utils.el('li', {}, link));
    });
    nav.appendChild(ul);

    // Actions
    const actions = Utils.el('div', { className: 'nav-actions' });

    const langBtn = Utils.el('button', { className: 'lang-btn', onClick: () => I18n.switchLanguage(otherLang) }, langBtnText);
    actions.appendChild(langBtn);

    const mobileBtn = Utils.el('button', { className: 'icon-btn mobile-toggle', onClick: () => ul.classList.toggle('active') });
    mobileBtn.appendChild(this.svgEl('menu', 18));
    actions.appendChild(mobileBtn);

    nav.appendChild(actions);
    header.appendChild(nav);
  },

  // ========== Section Bar ==========
  SectionBar(iconKey, title, viewAllHref) {
    const bar = Utils.el('div', { className: 'section-bar' });
    const left = Utils.el('div', { className: 'section-bar-left' });
    left.appendChild(this.svgEl(iconKey, 15));
    left.appendChild(Utils.el('p', { className: 'section-bar-title' }, title));
    bar.appendChild(left);

    if (viewAllHref) {
      const link = Utils.el('a', { href: viewAllHref, className: 'view-all-link' }, I18n.t('dashboard.viewAll'));
      link.appendChild(this.svgEl('arrowRight', 12));
      bar.appendChild(link);
    }
    return bar;
  },

  // ========== Tournament Strip (replaces WCIdentityCard + ProgressCard) ==========
  TournamentStrip(matches) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const total = matches.length || 104;
    const finished = matches.filter(m => m.status === 'FINISHED').length;
    const live = matches.filter(m => m.status === 'LIVE' || m.status === 'IN_PLAY').length;
    const pct = total > 0 ? Math.round((finished / total) * 100) : 0;

    const strip = Utils.el('div', { className: 'tournament-strip' });

    // FIFA 2026 label
    strip.appendChild(Utils.el('div', { className: 'tournament-strip-title' },
      isCn ? '🏆 FIFA 世界杯 2026™' : '🏆 FIFA World Cup 2026™'
    ));

    strip.appendChild(Utils.el('div', { className: 'tournament-strip-divider' }));

    // Stats
    [
      { val: total, lbl: isCn ? '场次' : 'MATCHES' },
      { val: finished, lbl: isCn ? '完赛' : 'PLAYED' },
      { val: live || 0, lbl: isCn ? '直播' : 'LIVE' },
    ].forEach(s => {
      strip.appendChild(Utils.el('div', { className: 'tournament-strip-stat' },
        Utils.el('span', { className: 'tournament-strip-val' }, s.val),
        Utils.el('span', { className: 'tournament-strip-lbl' }, s.lbl)
      ));
    });

    strip.appendChild(Utils.el('div', { className: 'tournament-strip-divider' }));

    // Progress bar
    const progressWrap = Utils.el('div', { className: 'strip-progress-wrap' });
    progressWrap.appendChild(Utils.el('span', { className: 'strip-progress-label' }, `${pct}% ${isCn ? '赛程完成' : 'Complete'}`));
    const bar = Utils.el('div', { className: 'strip-progress-bar' });
    const fill = Utils.el('div', { className: 'strip-progress-fill' });
    bar.appendChild(fill);
    progressWrap.appendChild(bar);
    strip.appendChild(progressWrap);

    // Animate fill
    requestAnimationFrame(() => setTimeout(() => { fill.style.width = `${pct}%`; }, 100));
    return strip;
  },

  // ========== Next Match Hero Card ==========
  NextMatchCard(match) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const card = Utils.el('div', { className: 'next-match-card' });

    // Background stadium image - real Unsplash football stadium
    const bg = Utils.el('img', {
      className: 'next-match-bg',
      alt: '',
      src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop'
    });
    bg.onerror = () => { bg.src = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop'; };
    card.appendChild(bg);
    card.appendChild(Utils.el('div', { className: 'next-match-overlay' }));

    const content = Utils.el('div', { className: 'next-match-content' });

    // Eyebrow
    const eyebrow = Utils.el('div', { className: 'next-match-eyebrow' });
    eyebrow.appendChild(Utils.el('span', { className: 'next-match-eyebrow-dot' }));
    eyebrow.appendChild(document.createTextNode(isCn ? '下一场比赛' : 'Next Match'));
    content.appendChild(eyebrow);

    if (match) {
      // Teams
      const teamsDiv = Utils.el('div', { className: 'next-match-teams' });

      const makeTeam = (team) => {
        const div = Utils.el('div', { className: 'next-match-team' });
        const flag = this.createFlag(team.crest, team.name, 'next-match-flag');
        div.appendChild(flag);
        div.appendChild(Utils.el('span', { className: 'next-match-team-name' }, I18n.tTeam(team.name)));
        return div;
      };

      teamsDiv.appendChild(makeTeam(match.homeTeam));
      teamsDiv.appendChild(Utils.el('span', { className: 'next-match-vs' }, 'VS'));
      teamsDiv.appendChild(makeTeam(match.awayTeam));
      content.appendChild(teamsDiv);

      // Bottom: countdown + date + go button
      const bottom = Utils.el('div', { className: 'next-match-bottom' });
      const cdArea = Utils.el('div', { className: 'countdown-area' });
      cdArea.appendChild(Utils.el('span', { className: 'countdown-label' }, isCn ? '距开球' : 'Until Kickoff'));
      const digits = Utils.el('div', { className: 'countdown-digits' });
      digits.innerHTML = `<span id="cd-days">--</span><span class="countdown-colon">:</span><span id="cd-hours">--</span><span class="countdown-colon">:</span><span id="cd-mins">--</span><span class="countdown-colon">:</span><span id="cd-secs">--</span>`;
      cdArea.appendChild(digits);
      bottom.appendChild(cdArea);

      const goBtn = Utils.el('a', { href: '#/matches', className: 'countdown-go-btn' });
      goBtn.appendChild(this.svgEl('arrowRight', 18));
      bottom.appendChild(goBtn);
      content.appendChild(bottom);

      this.StartCountdownTicker(match.utcDate);
    } else {
      const empty = Utils.el('div', { className: 'next-match-empty' });
      empty.appendChild(Utils.el('p', {}, isCn ? '等待最新赛程' : 'Schedule pending'));
      empty.appendChild(Utils.el('p', {}, isCn ? '比赛数据即将更新' : 'Match data will update soon'));
      content.appendChild(empty);
    }

    card.appendChild(content);
    return card;
  },

  countdownTimerId: null,
  StartCountdownTicker(targetDateStr) {
    if (this.countdownTimerId) clearInterval(this.countdownTimerId);
    const update = () => {
      const { days, hours, minutes, seconds, expired } = Utils.getCountdown(targetDateStr);
      if (expired) { clearInterval(this.countdownTimerId); return; }
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = String(v).padStart(2, '0'); };
      set('cd-days', days); set('cd-hours', hours); set('cd-mins', minutes); set('cd-secs', seconds);
    };
    update();
    this.countdownTimerId = setInterval(update, 1000);
  },

  // ========== Match List Item (compact, for sidebar) ==========
  MatchListItem(match) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const isLive = match.status === 'LIVE' || match.status === 'IN_PLAY';
    const isFinished = match.status === 'FINISHED';
    const homeScore = match.score.fullTime.home;
    const awayScore = match.score.fullTime.away;
    const showScore = homeScore !== null && awayScore !== null;
    const homeWinner = showScore && match.score.winner === 'HOME_TEAM';
    const awayWinner = showScore && match.score.winner === 'AWAY_TEAM';

    const item = Utils.el('a', { href: `#/match/${match.id}`, className: 'match-list-item' });

    // Teams column
    const teamsCol = Utils.el('div', { className: 'match-list-teams' });
    const makeRow = (team, score, isWinner, isNull) => {
      const row = Utils.el('div', { className: 'match-list-team' });
      const nameDiv = Utils.el('div', { className: `match-list-team-name${isWinner ? ' winner' : ''}` });
      const flag = this.createFlag(team.crest, team.name, 'flag-sm');
      nameDiv.appendChild(flag);
      nameDiv.appendChild(document.createTextNode(I18n.tTeam(team.name)));
      row.appendChild(nameDiv);
      const scoreEl = Utils.el('span', { className: `match-list-score${isWinner ? ' winner' : ''}${isNull ? ' null-score' : ''}` },
        isNull ? '-' : String(score)
      );
      row.appendChild(scoreEl);
      return row;
    };
    teamsCol.appendChild(makeRow(match.homeTeam, homeScore, homeWinner, homeScore === null));
    teamsCol.appendChild(makeRow(match.awayTeam, awayScore, awayWinner, awayScore === null));
    item.appendChild(teamsCol);

    // Status column
    const statusCol = Utils.el('div', { className: 'match-list-status' });
    const badge = Utils.el('span', { className: `status-badge ${isLive ? 'live' : isFinished ? 'finished' : 'scheduled'}` });
    if (isLive) {
      badge.appendChild(Utils.el('span', { className: 'live-pulse' }));
      badge.appendChild(document.createTextNode(isCn ? '直播' : 'Live'));
    } else if (isFinished) {
      badge.appendChild(document.createTextNode(isCn ? '完赛' : 'FT'));
    } else {
      badge.appendChild(document.createTextNode(Utils.formatTimeOnly(match.utcDate)));
    }
    statusCol.appendChild(badge);
    item.appendChild(statusCol);

    return item;
  },

  // ========== Match Card (grid view) ==========
  MatchCard(match) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const isLive = match.status === 'LIVE' || match.status === 'IN_PLAY';
    const isFinished = match.status === 'FINISHED';
    const statusText = Utils.translateMatchStatus(match.status, isCn);
    const homeScore = match.score.fullTime.home;
    const awayScore = match.score.fullTime.away;
    const showScore = homeScore !== null && awayScore !== null;
    const homeWinner = showScore && match.score.winner === 'HOME_TEAM';
    const awayWinner = showScore && match.score.winner === 'AWAY_TEAM';

    const card = Utils.el('article', { className: 'card match-card' });

    // Header
    const header = Utils.el('div', { className: 'match-card-header' });
    header.appendChild(Utils.el('span', {}, `${Utils.translateStage(match.stage, isCn)}${match.group ? ' · ' + match.group.replace('GROUP_', '') : ''}`));
    const badge = Utils.el('span', { className: `status-badge ${isLive ? 'live' : isFinished ? 'finished' : 'scheduled'}` });
    if (isLive) { badge.appendChild(Utils.el('span', { className: 'live-pulse' })); badge.appendChild(document.createTextNode(statusText)); }
    else { badge.appendChild(document.createTextNode(statusText)); }
    header.appendChild(badge);
    card.appendChild(header);

    // Team rows
    const makeTeamRow = (team, score, isWinner) => {
      const row = Utils.el('div', { className: 'match-row' });
      const info = Utils.el('div', { className: 'match-team-info' });
      const flag = this.createFlag(team.crest, team.name, 'flag-sm');
      info.appendChild(flag);
      info.appendChild(Utils.el('span', { className: `team-name${isWinner ? ' winner' : ''}` }, I18n.tTeam(team.name)));
      row.appendChild(info);
      const cls = `team-score${isWinner ? ' winner' : ''}${score === null ? ' null-score' : ''}`;
      row.appendChild(Utils.el('span', { className: cls }, score !== null ? score : '-'));
      return row;
    };
    card.appendChild(makeTeamRow(match.homeTeam, homeScore, homeWinner));
    card.appendChild(makeTeamRow(match.awayTeam, awayScore, awayWinner));

    // Footer
    const footer = Utils.el('div', { className: 'match-card-footer' });
    footer.appendChild(Utils.el('span', {}, isFinished ? Utils.getRelativeTime(match.utcDate, isCn) : `${Utils.formatDateOnly(match.utcDate, isCn)} ${Utils.formatTimeOnly(match.utcDate)}`));
    footer.appendChild(Utils.el('a', { href: `#/match/${match.id}`, className: 'detail-link' }, isCn ? '详情 →' : 'Details →'));
    card.appendChild(footer);

    return card;
  },

  // ========== News Row (compact sidebar) ==========
  NewsRow(article) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const row = Utils.el('a', { href: article.url, target: '_blank', rel: 'noopener noreferrer', className: 'news-row' });
    const thumbImg = Utils.el('img', { className: 'news-thumb', alt: article.title });
    thumbImg.src = article.image || '';
    thumbImg.onerror = () => {
      // Use a reliable football news fallback image
      thumbImg.src = 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=200&auto=format&fit=crop';
    };
    row.appendChild(thumbImg);
    const content = Utils.el('div', { className: 'news-row-content' });
    content.appendChild(Utils.el('span', { className: 'news-row-title' }, article.title));
    content.appendChild(Utils.el('span', { className: 'news-row-meta' }, `${article.source.name} · ${Utils.getRelativeTime(article.publishedAt, isCn)}`));
    row.appendChild(content);
    return row;
  },

  // ========== News Card (full page grid) ==========
  NewsCard(article) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const card = Utils.el('article', { className: 'card news-card-full' });

    const imgWrap = Utils.el('div', { className: 'news-card-img-wrap' });
    const img = Utils.el('img', { className: 'news-card-img', alt: article.title });
    img.src = article.image || '';
    img.onerror = () => {
      img.src = 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=600&auto=format&fit=crop';
    };
    imgWrap.appendChild(img);
    card.appendChild(imgWrap);

    const body = Utils.el('div', { className: 'news-card-body' });
    body.appendChild(Utils.el('span', { className: 'news-card-source' }, article.source.name));
    body.appendChild(Utils.el('h3', { className: 'news-card-title' }, article.title));
    body.appendChild(Utils.el('p', { className: 'news-card-desc' }, article.description || ''));

    const footer = Utils.el('div', { className: 'news-card-footer' });
    footer.appendChild(Utils.el('span', {}, Utils.getRelativeTime(article.publishedAt, isCn)));
    const btn = Utils.el('a', { href: article.url, target: '_blank', rel: 'noopener noreferrer', className: 'read-more-btn' });
    btn.appendChild(document.createTextNode(isCn ? '阅读原文' : 'Read'));
    btn.appendChild(this.svgEl('externalLink', 11));
    footer.appendChild(btn);
    body.appendChild(footer);
    card.appendChild(body);
    return card;
  },

  // ========== Scorer Row ==========
  ScorerRow(scorer, rank) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const row = Utils.el('div', { className: 'scorer-row' });
    row.appendChild(Utils.el('span', { className: `scorer-rank${rank <= 3 ? ' top3' : ''}` }, rank));

    const avatar = this.createPlayerAvatar(scorer.player.name, 'scorer-avatar');
    row.appendChild(avatar);

    row.appendChild(Utils.el('span', { className: 'scorer-name' }, scorer.player.name));

    const teamBadge = Utils.el('span', { className: 'scorer-team-badge' });
    const teamFlag = this.createFlag(scorer.team.crest, scorer.team.name, 'flag-sm');
    teamFlag.style.width = '14px';
    teamFlag.style.height = '14px';
    teamFlag.style.borderRadius = '50%';
    teamBadge.appendChild(teamFlag);
    teamBadge.appendChild(Utils.el('span', {}, I18n.tTeam(scorer.team.name)));
    row.appendChild(teamBadge);

    row.appendChild(Utils.el('span', { className: 'scorer-goals' }, scorer.goals ?? '—'));
    return row;
  },

  // ========== Group Card (standings) ==========
  GroupCard(groupStanding) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const groupLabel = groupStanding.group.replace('GROUP_', '');
    const card = Utils.el('article', { className: 'group-card' });

    // Header row
    card.appendChild(Utils.el('div', { className: 'group-header-row' },
      Utils.el('span', {}, `${isCn ? '组' : 'Group'} ${groupLabel}`),
      Utils.el('span', {}, 'P'),
      Utils.el('span', {}, 'W'),
      Utils.el('span', {}, 'D'),
      Utils.el('span', {}, 'L'),
      Utils.el('span', {}, 'Pts')
    ));

    // Team rows
    groupStanding.table.forEach(row => {
      const isQualified = row.position <= 2;
      const teamRow = Utils.el('div', { className: `group-team-row${isQualified ? ' qualified-row' : ''}` });

      const cell = Utils.el('a', { href: `#/team/${row.team.id}`, className: 'group-team-cell' });
      cell.appendChild(Utils.el('span', { className: `group-team-pos${isQualified ? ' qualified' : ''}` }, row.position));
      const flag = this.createFlag(row.team.crest, row.team.name, 'flag-sm');
      cell.appendChild(flag);
      cell.appendChild(Utils.el('span', { className: 'group-team-name' }, I18n.tTeam(row.team.name)));
      teamRow.appendChild(cell);

      teamRow.appendChild(Utils.el('span', { className: 'group-stat' }, row.playedGames));
      teamRow.appendChild(Utils.el('span', { className: 'group-stat' }, row.won));
      teamRow.appendChild(Utils.el('span', { className: 'group-stat' }, row.draw));
      teamRow.appendChild(Utils.el('span', { className: 'group-stat' }, row.lost));
      teamRow.appendChild(Utils.el('span', { className: 'group-pts' }, row.points));
      card.appendChild(teamRow);
    });

    return card;
  },

  // ========== Team Card ==========
  TeamCard(team) {
    const card = Utils.el('a', { href: `#/team/${team.id}`, className: 'card team-card' });
    const flag = this.createFlag(team.crest, team.name, 'flag-md');
    card.appendChild(flag);
    card.appendChild(Utils.el('span', { className: 'team-card-name' }, I18n.tTeam(team.name)));
    card.appendChild(Utils.el('span', { className: 'team-card-group' }, (team.group || '').replace('GROUP_', 'Group ')));
    return card;
  },

  // ========== Footer ==========
  Footer() {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const footer = document.getElementById('main-footer');
    footer.innerHTML = '';
    footer.appendChild(Utils.el('div', { className: 'footer-inner' },
      Utils.el('span', { className: 'footer-brand' }, 'WorldCup 2026™'),
      Utils.el('span', {}, isCn ? '数据来源：Football-Data.org · GNews API' : 'Data: Football-Data.org · GNews API'),
      Utils.el('span', {}, '© 2026 Antigravity')
    ));
  },

  // ========== Settings Modal ==========
  OpenSettingsModal() {
    let overlay = document.getElementById('settings-overlay');
    if (!overlay) {
      overlay = Utils.el('div', { id: 'settings-overlay', className: 'modal-overlay' });
      document.getElementById('modal-container').appendChild(overlay);
    }
    overlay.innerHTML = '';
    const isCn = I18n.getLanguage() === 'zh-CN';
    const keys = ApiService.getKeys();

    const modal = Utils.el('div', { className: 'modal-box' });

    const modalHeader = Utils.el('div', { className: 'modal-header' });
    modalHeader.appendChild(Utils.el('h2', { className: 'modal-title' }, I18n.t('settings.title')));
    modalHeader.appendChild(Utils.el('button', { className: 'modal-close', onClick: () => overlay.classList.remove('active') }, '×'));
    modal.appendChild(modalHeader);

    modal.appendChild(Utils.el('p', { style: { fontSize: '0.78rem', color: 'var(--text-2)', marginBottom: '1.25rem', lineHeight: '1.6' } }, I18n.t('settings.desc')));

    [
      { id: 'setting-key-football', label: I18n.t('settings.key.football'), placeholder: 'Football-Data.org API Key' },
      { id: 'setting-key-gnews', label: I18n.t('settings.key.gnews'), placeholder: 'GNews.io API Key' }
    ].forEach(f => {
      const group = Utils.el('div', { className: 'form-group' });
      group.appendChild(Utils.el('label', { className: 'form-label' }, f.label));
      group.appendChild(Utils.el('input', { id: f.id, type: 'password', className: 'form-input', value: (f.id === 'setting-key-football' ? keys.football : keys.gnews) || '', placeholder: f.placeholder }));
      modal.appendChild(group);
    });

    const btnRow = Utils.el('div', { style: { display: 'flex', gap: '0.75rem', marginTop: '1.25rem' } });
    btnRow.appendChild(Utils.el('button', { className: 'btn-primary', style: { flex: '1' }, onClick: () => {
      ApiService.saveKeys(document.getElementById('setting-key-football').value, document.getElementById('setting-key-gnews').value);
      Utils.showToast(I18n.t('settings.success'));
      overlay.classList.remove('active');
      ['wc_matches','wc_standings','wc_scorers','wc_news_zh','wc_news_en','wc_teams_list'].forEach(k => Utils.cache.remove(k));
      if (window.App) window.App.reRender();
    }}, I18n.t('settings.save')));

    btnRow.appendChild(Utils.el('button', { className: 'btn-secondary', onClick: () => {
      ApiService.clearKeys();
      Utils.showToast(I18n.t('settings.clearSuccess'));
      overlay.classList.remove('active');
      Utils.cache.clear();
      if (window.App) window.App.reRender();
    }}, I18n.t('settings.clear')));

    modal.appendChild(btnRow);
    overlay.appendChild(modal);
    setTimeout(() => overlay.classList.add('active'), 50);
  }
};
