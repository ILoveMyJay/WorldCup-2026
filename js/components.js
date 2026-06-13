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
    const isTbd = !name || typeof name !== 'string' || name.includes('To Be Decided') || name.includes('Winner Group') || name.includes('Runner-up') || name.includes('TBD') || name.includes('W32') || name.includes('W16') || name.includes('W8') || name.includes('W4') || name.includes('RU ') || name.trim() === 'VS';
    
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

  // Helper to generate a player avatar from Wikipedia photo with dynamic monogram fallback
  createPlayerAvatar(playerName, sizeClass = 'scorer-avatar') {
    if (!playerName) return this.createFlag('', '', sizeClass);

    // Generate fallback monogram DOM
    const generateFallback = () => {
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
          textTransform: 'uppercase',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
          userSelect: 'none'
        }
      }, initials);
    };

    // Return image that redirects to Wikipedia pageimage api
    const img = Utils.el('img', {
      className: sizeClass,
      src: `/api/avatar?name=${encodeURIComponent(playerName)}&v=6`,
      alt: playerName,
      style: {
        objectFit: 'cover',
        borderRadius: '50%',
        background: 'var(--surface-2)',
        border: '1px solid var(--border)'
      }
    });

    img.onerror = () => {
      img.replaceWith(generateFallback());
    };

    return img;
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
      { route: '#/fanzone', label: isCn ? '球迷乐园' : 'Fan Zone', icon: 'soccer' },
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

    row.appendChild(Utils.el('span', { className: 'scorer-name' }, I18n.tPlayer(scorer.player.name)));

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

  // ========== Settings Modal (Data Source Info) ==========
  OpenSettingsModal() {
    let overlay = document.getElementById('settings-overlay');
    if (!overlay) {
      overlay = Utils.el('div', { id: 'settings-overlay', className: 'modal-overlay' });
      document.getElementById('modal-container').appendChild(overlay);
    }
    overlay.innerHTML = '';
    const isCn = I18n.getLanguage() === 'zh-CN';

    const modal = Utils.el('div', { className: 'modal-box' });

    const modalHeader = Utils.el('div', { className: 'modal-header' });
    modalHeader.appendChild(Utils.el('h2', { className: 'modal-title' }, isCn ? '数据来源' : 'Data Sources'));
    modalHeader.appendChild(Utils.el('button', { className: 'modal-close', onClick: () => overlay.classList.remove('active') }, '×'));
    modal.appendChild(modalHeader);

    modal.appendChild(Utils.el('p', { style: { fontSize: '0.78rem', color: 'var(--text-2)', marginBottom: '1.25rem', lineHeight: '1.6' } },
      isCn
        ? '本站数据来源于 Football-Data.org 和 GNews.io 的实时 API，并通过 Cloudflare 安全代理访问。'
        : 'This portal fetches real-time data from Football-Data.org and GNews.io APIs, securely proxied through Cloudflare.'
    ));

    const btnRow = Utils.el('div', { style: { display: 'flex', gap: '0.75rem', marginTop: '1.25rem' } });
    btnRow.appendChild(Utils.el('button', { className: 'btn-primary', style: { flex: '1' }, onClick: () => {
      // Clear all caches and reload
      Utils.cache.clear();
      overlay.classList.remove('active');
      if (window.App) window.App.reRender();
      Utils.showToast(isCn ? '缓存已清除，数据已刷新' : 'Cache cleared, data refreshed');
    }}, isCn ? '清除缓存并刷新' : 'Clear Cache & Refresh'));

    btnRow.appendChild(Utils.el('button', { className: 'btn-secondary', onClick: () => overlay.classList.remove('active') },
      isCn ? '关闭' : 'Close'
    ));

    modal.appendChild(btnRow);
    overlay.appendChild(modal);
    setTimeout(() => overlay.classList.add('active'), 50);
  },

  // ========== Fan Zone Page ==========
  FanZonePage(votes, userVotes, onVote) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const container = Utils.el('div', { className: 'fanzone-container', style: { display: 'flex', flexDirection: 'column', gap: '1.5rem' } });

    // Page Title
    const title = Utils.el('h1', { className: 'page-title' });
    title.innerHTML = isCn ? '球迷乐园 · <span class="accent">互动社区</span>' : 'Fan Zone · <span class="accent">Interactive Hub</span>';
    container.appendChild(title);

    // Two-column layout for Fan Zone
    const grid = Utils.el('div', { className: 'grid-2' });

    // Card 1: Champion prediction
    const champCard = Utils.el('article', { className: 'card card-pad' });
    champCard.appendChild(this.SectionBar('trophy', isCn ? '2026 世界杯冠军大预测' : '2026 World Cup Champion Prediction'));
    champCard.appendChild(Utils.el('p', { style: { fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '1.25rem' } }, 
      isCn ? '谁将捧起 2026 年美加墨世界杯神力神杯？投下你神圣的一票！' : 'Who will lift the trophy in North America? Cast your vote!'
    ));

    const champList = Utils.el('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.85rem' } });
    
    // Sort teams by vote counts
    const teams = ['Argentina', 'Brazil', 'France', 'England', 'Germany', 'Spain', 'Portugal', 'United States', 'Canada', 'Mexico'];
    const voteCounts = votes.champion || {};
    const totalVotes = Object.values(voteCounts).reduce((a, b) => a + b, 0) || 1;

    // Calculate percentage and sort
    const sortedTeams = teams.map(t => ({
      name: t,
      count: voteCounts[t] || 0,
      pct: ((voteCounts[t] || 0) / totalVotes * 100).toFixed(1)
    })).sort((a, b) => b.count - a.count);

    const hasVotedChamp = !!userVotes.champion;

    sortedTeams.forEach(t => {
      const row = Utils.el('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.25rem' } });
      const info = Utils.el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', fontWeight: '600' } });
      
      const teamLabel = Utils.el('span', { style: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem' } });
      const crestUrl = `https://crests.football-data.org/${this.getTeamCrestId(t.name)}.png`;
      teamLabel.appendChild(this.createFlag(crestUrl, t.name, 'flag-sm'));
      teamLabel.appendChild(document.createTextNode(I18n.tTeam(t.name)));
      info.appendChild(teamLabel);

      const stats = Utils.el('span', { style: { color: 'var(--text-2)' } }, `${t.count} ${isCn ? '票' : 'votes'} (${t.pct}%)`);
      info.appendChild(stats);
      row.appendChild(info);

      // Bar container
      const barBg = Utils.el('div', { style: { background: 'var(--surface-2)', height: '8px', borderRadius: '4px', position: 'relative', display: 'flex', overflow: 'hidden' } });
      const barFill = Utils.el('div', { style: { 
        background: t.name === userVotes.champion ? 'var(--accent)' : 'linear-gradient(90deg, var(--accent-light), var(--accent))', 
        width: `${t.pct}%`, 
        height: '100%', 
        borderRadius: '4px',
        transition: 'width 0.6s ease'
      } });
      barBg.appendChild(barFill);
      row.appendChild(barBg);

      // Vote button
      if (!hasVotedChamp) {
        const btn = Utils.el('button', {
          className: 'btn-secondary',
          style: { alignSelf: 'flex-end', padding: '0.25rem 0.6rem', fontSize: '0.75rem', borderRadius: '5px', marginTop: '0.25rem' },
          onClick: () => onVote('champion', t.name)
        }, isCn ? '支持' : 'Vote');
        row.appendChild(btn);
      } else if (t.name === userVotes.champion) {
        const votedBadge = Utils.el('span', { style: { alignSelf: 'flex-end', fontSize: '0.7rem', color: 'var(--accent)', fontWeight: '700', marginTop: '0.25rem' } }, 
          isCn ? '★ 已投此队' : '★ Voted'
        );
        row.appendChild(votedBadge);
      }

      champList.appendChild(row);
    });

    champCard.appendChild(champList);
    grid.appendChild(champCard);

    // Card 2: Support Leaderboard & Fun interactions
    const funCard = Utils.el('article', { className: 'card card-pad' });
    funCard.appendChild(this.SectionBar('radio', isCn ? '球迷助威大本营' : 'Fan Cheer Center'));
    funCard.appendChild(Utils.el('p', { style: { fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '1.25rem' } },
      isCn ? '在这里你可以看到全球球迷最关注的球队，发表留言或者为心爱战队打 Call。' : 'Cheer for your team and comment on matches with fans worldwide.'
    ));

    // Support leaderboard lists
    const commentBox = Utils.el('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.75rem' } });
    commentBox.appendChild(Utils.el('h3', { style: { fontSize: '0.9rem', fontWeight: '700' } }, isCn ? '球迷碎碎念 / Live Comments' : 'Live Comments'));
    
    const commentList = Utils.el('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto', background: 'var(--surface-2)', padding: '0.75rem', borderRadius: '8px' } });
    
    const mockComments = [
      { user: 'Lionel_Fan', text: 'Vamos Argentina! Back to back champion?', time: '2 mins ago' },
      { user: 'SamArmy', text: 'Pochettino is cooking something special for USA!', time: '10 mins ago' },
      { user: 'ZizouLegacy', text: 'France is still the strongest squad in my opinion.', time: '23 mins ago' },
      { user: 'NeymarGinga', text: 'Brazil will show the world Jogo Bonito again in Los Angeles.', time: '1 hr ago' }
    ];

    mockComments.forEach(c => {
      const comm = Utils.el('div', { style: { fontSize: '0.78rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' } });
      const cHeader = Utils.el('div', { style: { display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: 'var(--text-1)', marginBottom: '0.15rem' } });
      cHeader.appendChild(Utils.el('span', {}, c.user));
      cHeader.appendChild(Utils.el('span', { style: { fontWeight: '400', color: 'var(--text-3)', fontSize: '0.7rem' } }, c.time));
      comm.appendChild(cHeader);
      comm.appendChild(Utils.el('p', { style: { color: 'var(--text-2)', lineHeight: '1.4' } }, c.text));
      commentList.appendChild(comm);
    });
    commentBox.appendChild(commentList);

    // Comment input box
    const inputArea = Utils.el('div', { style: { display: 'flex', gap: '0.5rem', marginTop: '0.5rem' } });
    const input = Utils.el('input', {
      type: 'text',
      placeholder: isCn ? '说点什么吧...' : 'Add to the discussion...',
      style: { flex: '1', padding: '0.5rem', background: 'var(--surface-1)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-1)' }
    });
    const sendBtn = Utils.el('button', {
      className: 'btn-primary',
      style: { padding: '0.5rem 1rem', fontSize: '0.8rem', borderRadius: '6px' },
      onClick: () => {
        if (!input.value.trim()) return;
        const newComm = Utils.el('div', { style: { fontSize: '0.78rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' } });
        const cHeader = Utils.el('div', { style: { display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: 'var(--text-1)', marginBottom: '0.15rem' } });
        cHeader.appendChild(Utils.el('span', {}, isCn ? '我 (球迷)' : 'Me (Fan)'));
        cHeader.appendChild(Utils.el('span', { style: { fontWeight: '400', color: 'var(--text-3)', fontSize: '0.7rem' } }, isCn ? '刚刚' : 'just now'));
        newComm.appendChild(cHeader);
        newComm.appendChild(Utils.el('p', { style: { color: 'var(--text-2)', lineHeight: '1.4' } }, input.value));
        commentList.insertBefore(newComm, commentList.firstChild);
        input.value = '';
        Utils.showToast(isCn ? '发布成功！' : 'Comment posted!');
      }
    }, isCn ? '发送' : 'Send');

    inputArea.appendChild(input);
    inputArea.appendChild(sendBtn);
    commentBox.appendChild(inputArea);

    funCard.appendChild(commentBox);
    grid.appendChild(funCard);

    container.appendChild(grid);
    return container;
  },

  // Helper mapping team names to crest IDs for flag generation in champion poll
  getTeamCrestId(teamName) {
    const map = {
      'Argentina': 762, 'Brazil': 764, 'France': 773, 'England': 770, 'Germany': 759,
      'Spain': 760, 'Portugal': 765, 'United States': 784, 'Canada': 782, 'Mexico': 783
    };
    return map[teamName] || 762;
  },

  // ========== Match Prediction Voting Widget ==========
  MatchVoteWidget(match, matchVotes, userVote, onVote) {
    const isCn = I18n.getLanguage() === 'zh-CN';
    const widget = Utils.el('div', { className: 'card card-pad', style: { marginTop: '1.5rem' } });
    widget.appendChild(this.SectionBar('soccer', isCn ? '本场胜负大竞猜' : 'Match Outcome Prediction'));

    const votes = matchVotes || { home: 12, draw: 8, away: 5 };
    const total = votes.home + votes.draw + votes.away;
    const homePct = ((votes.home / total) * 100).toFixed(0);
    const drawPct = ((votes.draw / total) * 100).toFixed(0);
    const awayPct = ((votes.away / total) * 100).toFixed(0);

    const hasVoted = !!userVote;

    const wrapper = Utils.el('div', { style: { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' } });

    if (!hasVoted) {
      // 3 clickable columns
      const cols = Utils.el('div', { style: { display: 'flex', gap: '0.75rem', width: '100%' } });
      const btns = [
        { key: 'home', label: isCn ? `${I18n.tTeam(match.homeTeam.name)} 胜` : `${I18n.tTeam(match.homeTeam.name)} Win` },
        { key: 'draw', label: isCn ? '双方战平' : 'Draw' },
        { key: 'away', label: isCn ? `${I18n.tTeam(match.awayTeam.name)} 胜` : `${I18n.tTeam(match.awayTeam.name)} Win` }
      ];

      btns.forEach(b => {
        const btn = Utils.el('button', {
          className: 'btn-secondary',
          style: { flex: '1', padding: '0.75rem', fontSize: '0.8rem', borderRadius: '8px', fontWeight: '600' },
          onClick: () => onVote('match', match.id, b.key)
        }, b.label);
        cols.appendChild(btn);
      });
      wrapper.appendChild(cols);
    } else {
      // 3 progress bars showing percentages
      const stats = [
        { key: 'home', label: I18n.tTeam(match.homeTeam.name), count: votes.home, pct: homePct, color: 'var(--accent)' },
        { key: 'draw', label: isCn ? '战平' : 'Draw', count: votes.draw, pct: drawPct, color: 'var(--text-3)' },
        { key: 'away', label: I18n.tTeam(match.awayTeam.name), count: votes.away, pct: awayPct, color: 'var(--accent)' }
      ];

      stats.forEach(s => {
        const row = Utils.el('div', { style: { display: 'flex', flexDirection: 'column', gap: '0.3rem' } });
        const labelRow = Utils.el('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: '700' } });
        
        const isUserChoice = s.key === userVote;
        labelRow.appendChild(Utils.el('span', {}, s.label + (isUserChoice ? (isCn ? ' (我的选择)' : ' (Your Choice)') : '')));
        labelRow.appendChild(Utils.el('span', {}, `${s.pct}% (${s.count} ${isCn ? '票' : 'votes'})`));
        row.appendChild(labelRow);

        const barBg = Utils.el('div', { style: { background: 'var(--surface-2)', height: '10px', borderRadius: '5px', overflow: 'hidden' } });
        const barFill = Utils.el('div', { style: { 
          background: isUserChoice ? 'var(--accent)' : 'linear-gradient(90deg, var(--accent-light), var(--accent))',
          width: `${s.pct}%`, 
          height: '100%', 
          borderRadius: '5px',
          transition: 'width 0.5s ease'
        } });
        barBg.appendChild(barFill);
        row.appendChild(barBg);

        wrapper.appendChild(row);
      });
    }

    widget.appendChild(wrapper);
    return widget;
  },

  // Helper for generating player details consistently
  getPlayerExtraDetails(playerName) {
    const db = {
      "Kylian Mbappé": { jersey: 10, pos: "FW", club: "Real Madrid", age: 27, height: "178 cm", weight: "75 kg", skills: [97, 90, 80, 92, 36, 78] },
      "Kylian Mbappe": { jersey: 10, pos: "FW", club: "Real Madrid", age: 27, height: "178 cm", weight: "75 kg", skills: [97, 90, 80, 92, 36, 78] },
      "Lionel Messi": { jersey: 10, pos: "FW", club: "Inter Miami", age: 38, height: "170 cm", weight: "72 kg", skills: [80, 91, 94, 93, 35, 65] },
      "Harry Kane": { jersey: 9, pos: "FW", club: "Bayern Munich", age: 32, height: "188 cm", weight: "86 kg", skills: [70, 93, 84, 81, 45, 82] },
      "Christian Pulisic": { jersey: 10, pos: "MF", club: "AC Milan", age: 27, height: "178 cm", weight: "73 kg", skills: [88, 80, 78, 86, 38, 68] },
      "Vinicius Junior": { jersey: 7, pos: "FW", club: "Real Madrid", age: 25, height: "176 cm", weight: "73 kg", skills: [95, 82, 79, 90, 29, 68] },
      "Vinícius Júnior": { jersey: 7, pos: "FW", club: "Real Madrid", age: 25, height: "176 cm", weight: "73 kg", skills: [95, 82, 79, 90, 29, 68] },
      "Alvaro Morata": { jersey: 7, pos: "FW", club: "AC Milan", age: 33, height: "189 cm", weight: "84 kg", skills: [80, 82, 72, 78, 40, 76] },
      "Álvaro Morata": { jersey: 7, pos: "FW", club: "AC Milan", age: 33, height: "189 cm", weight: "84 kg", skills: [80, 82, 72, 78, 40, 76] },
      "Robert Lewandowski": { jersey: 9, pos: "FW", club: "Barcelona", age: 37, height: "185 cm", weight: "81 kg", skills: [75, 89, 79, 82, 42, 78] }
    };

    const key = playerName.trim();
    if (db[key]) return db[key];

    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash);
    
    const positions = ["FW", "MF", "DF", "GK"];
    const pos = positions[absHash % positions.length];
    const jersey = (absHash % 23) + 1;
    
    const age = 20 + (absHash % 16); 
    const height = `${170 + (absHash % 26)} cm`; 
    const weight = `${65 + (absHash % 26)} kg`; 
    
    const clubs = ["Real Madrid", "Manchester City", "Barcelona", "Liverpool", "Bayern Munich", "Arsenal", "Paris Saint-Germain", "Juventus", "Inter Milan", "Chelsea", "AC Milan", "Al Hilal"];
    const club = clubs[absHash % clubs.length];
    
    let skills = [];
    if (pos === "FW") {
      skills = [80 + (absHash % 18), 80 + (absHash % 16), 70 + (absHash % 20), 75 + (absHash % 20), 30 + (absHash % 20), 65 + (absHash % 25)];
    } else if (pos === "MF") {
      skills = [75 + (absHash % 18), 70 + (absHash % 18), 80 + (absHash % 18), 80 + (absHash % 16), 55 + (absHash % 25), 70 + (absHash % 20)];
    } else if (pos === "DF") {
      skills = [70 + (absHash % 20), 50 + (absHash % 25), 65 + (absHash % 25), 60 + (absHash % 25), 80 + (absHash % 17), 75 + (absHash % 21)];
    } else {
      skills = [45 + (absHash % 20), 80 + (absHash % 18), 70 + (absHash % 25), 75 + (absHash % 20), 78 + (absHash % 20), 65 + (absHash % 25)];
    }
    
    return { jersey, pos, club, age, height, weight, skills };
  },

  // Wikipedia Bio + Radar Chart Player Detail Card
  PlayerDetailCard(player, isCn) {
    const extra = this.getPlayerExtraDetails(player.player.name);
    const card = Utils.el('div', { className: 'player-detail-card card' });

    // Gradient Header
    const header = Utils.el('div', { className: 'player-detail-header' });
    const bgPattern = Utils.el('div', { className: 'player-detail-header-bg' });
    
    // Outline Jersey number
    const jerseyText = Utils.el('div', { className: 'player-detail-jersey-large' }, `#${extra.jersey}`);
    header.appendChild(bgPattern);
    header.appendChild(jerseyText);

    // Left info
    const infoLeft = Utils.el('div', { className: 'player-detail-info-left' });
    const teamBadge = Utils.el('div', { className: 'player-detail-team' });
    const teamFlag = this.createFlag(player.team.crest, player.team.name, 'flag-sm');
    teamFlag.style.borderRadius = '50%';
    teamBadge.appendChild(teamFlag);
    teamBadge.appendChild(Utils.el('span', {}, I18n.tTeam(player.team.name)));
    infoLeft.appendChild(teamBadge);

    const name = Utils.el('h2', { className: 'player-detail-name' }, I18n.tPlayer(player.player.name));
    infoLeft.appendChild(name);

    const posBadge = Utils.el('span', { className: 'player-detail-pos-badge' }, 
      (extra.pos === 'FW' ? (isCn ? '前锋' : 'Forward') : 
       extra.pos === 'MF' ? (isCn ? '中场' : 'Midfielder') : 
       extra.pos === 'DF' ? (isCn ? '后卫' : 'Defender') : (isCn ? '门将' : 'Goalkeeper'))
    );
    infoLeft.appendChild(posBadge);
    header.appendChild(infoLeft);

    // Right avatar
    const avatar = this.createPlayerAvatar(player.player.name, 'player-detail-avatar');
    header.appendChild(avatar);
    card.appendChild(header);

    // Vitals grid
    const vitals = Utils.el('div', { className: 'player-vitals-grid' });
    const makeVital = (label, val) => {
      const item = Utils.el('div', { className: 'vital-item' });
      item.appendChild(Utils.el('span', { className: 'vital-label' }, label));
      item.appendChild(Utils.el('span', { className: 'vital-val' }, val));
      return item;
    };
    vitals.appendChild(makeVital(I18n.t('players.club'), I18n.tClub(extra.club)));
    vitals.appendChild(makeVital(I18n.t('players.age'), extra.age));
    vitals.appendChild(makeVital(I18n.t('players.height'), extra.height));
    vitals.appendChild(makeVital(I18n.t('players.weight'), extra.weight));
    card.appendChild(vitals);

    // Tabs inside the card
    const tabsContainer = Utils.el('div', { className: 'player-tabs' });
    const tabHeaders = Utils.el('div', { className: 'player-tabs-headers' });
    const tabContents = Utils.el('div', { className: 'player-tabs-contents' });

    const tabs = [
      { id: 'bio', label: I18n.t('players.bioTitle') },
      { id: 'stats', label: I18n.t('players.statsTitle') },
      { id: 'skills', label: I18n.t('players.skillsTitle') }
    ];

    const tabElMap = {};
    const contentElMap = {};

    // 1. Bio Content
    const bioContent = Utils.el('div', { className: 'player-tab-pane active' });
    const bioText = Utils.el('div', { className: 'player-bio-text' }, isCn ? '正在从维基百科加载个人简介...' : 'Loading biography from Wikipedia...');
    bioContent.appendChild(bioText);
    contentElMap['bio'] = bioContent;

    // Fetch bio asynchronously
    const lookupName = isCn ? I18n.tPlayer(player.player.name) : player.player.name;
    ApiService.getPlayerBio(lookupName, I18n.getLanguage()).then(bio => {
      if (bio) {
        bioText.innerHTML = '';
        bioText.appendChild(Utils.el('p', { style: { lineHeight: '1.6', fontSize: '0.85rem' } }, bio));
      } else {
        bioText.innerHTML = '';
        const fallbackBio = isCn ? 
          `${I18n.tPlayer(player.player.name)}（生于 ${2026 - extra.age} 年），是一位职业足球运动员，在本次美加墨世界杯中代表 ${I18n.tTeam(player.team.name)} 国家队出战，目前效力于 ${I18n.tClub(extra.club)} 俱乐部，司职${I18n.tPos(extra.pos)}。` :
          `${player.player.name} (born in ${2026 - extra.age}), is a professional football player representing ${player.team.name} national team in the FIFA World Cup 2026. He plays as a Forward for ${extra.club}.`;
        bioText.appendChild(Utils.el('p', { style: { lineHeight: '1.6', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--text-3)' } }, fallbackBio));
      }
    });

    // 2. Stats Content
    const statsContent = Utils.el('div', { className: 'player-tab-pane' });
    const statsGrid = Utils.el('div', { className: 'player-stats-grid' });
    const makeStat = (val, label) => {
      const item = Utils.el('div', { className: 'stat-box' });
      item.appendChild(Utils.el('div', { className: 'stat-box-val' }, val));
      item.appendChild(Utils.el('div', { className: 'stat-box-label' }, label));
      return item;
    };
    statsGrid.appendChild(makeStat(player.goals ?? 0, I18n.t('players.goals')));
    statsGrid.appendChild(makeStat(player.assists ?? 0, I18n.t('players.assistsCount')));
    statsGrid.appendChild(makeStat(player.penalties ?? 0, I18n.t('players.penalties')));
    
    // Games played (estimated to be 3 for simplicity)
    const gp = 3;
    const gaRatio = (((player.goals || 0) + (player.assists || 0)) / gp).toFixed(2);
    statsGrid.appendChild(makeStat(gp, I18n.t('players.games')));
    statsGrid.appendChild(makeStat(gaRatio, isCn ? '场均造球' : 'G/A per Match'));
    statsContent.appendChild(statsGrid);
    contentElMap['stats'] = statsContent;

    // 3. Skills Content (Radar Chart)
    const skillsContent = Utils.el('div', { className: 'player-tab-pane', style: { padding: '0.5rem 0' } });
    const canvas = Utils.el('canvas', { id: 'player-skills-canvas', style: { width: '100%', height: '220px', display: 'block' } });
    skillsContent.appendChild(canvas);
    contentElMap['skills'] = skillsContent;

    // Trigger radar chart render when the skills tab is active
    let radarDrawn = false;
    const triggerRadarDraw = () => {
      if (radarDrawn) return;
      setTimeout(() => {
        this.drawPlayerRadarChart('player-skills-canvas', extra.skills, isCn);
        radarDrawn = true;
      }, 50);
    };

    // Build Tab Headers
    tabs.forEach(tab => {
      const tabBtn = Utils.el('button', {
        className: `player-tab-btn ${tab.id === 'bio' ? 'active' : ''}`,
        onClick: () => {
          // Switch active tabs
          Object.keys(tabElMap).forEach(key => tabElMap[key].classList.remove('active'));
          Object.keys(contentElMap).forEach(key => contentElMap[key].classList.remove('active'));
          
          tabBtn.classList.add('active');
          contentElMap[tab.id].classList.add('active');

          if (tab.id === 'skills') {
            triggerRadarDraw();
          }
        }
      }, tab.label);
      tabElMap[tab.id] = tabBtn;
      tabHeaders.appendChild(tabBtn);
      tabContents.appendChild(contentElMap[tab.id]);
    });

    tabsContainer.appendChild(tabHeaders);
    tabsContainer.appendChild(tabContents);
    card.appendChild(tabsContainer);

    return card;
  },

  // ========== Banner Carousel (Xiaohongshu style) ==========
  BannerCarousel(banners, lang) {
    if (!banners || banners.length === 0) return document.createDocumentFragment();

    const container = Utils.el('div', { className: 'banner-carousel' });
    const track = Utils.el('div', { className: 'carousel-track' });
    
    let activeIdx = 0;
    const dots = [];

    banners.forEach((b, idx) => {
      const slide = Utils.el('div', { className: `carousel-slide ${idx === 0 ? 'active' : ''}` });
      
      const img = Utils.el('img', { className: 'carousel-img', src: b.cover, alt: b.title[lang] || b.title['en'] });
      slide.appendChild(img);

      const overlay = Utils.el('div', { className: 'carousel-overlay' });
      slide.appendChild(overlay);

      const content = Utils.el('div', { className: 'carousel-content' });
      
      const liveBadge = Utils.el('span', { className: 'carousel-badge' });
      const badgeText = lang === 'zh-CN' ? '精彩看点' : 'Highlights';
      liveBadge.innerHTML = `<span class="live-pulse"></span>${badgeText}`;
      content.appendChild(liveBadge);

      const title = Utils.el('h2', { className: 'carousel-title' }, b.title[lang] || b.title['en']);
      content.appendChild(title);

      const playBtn = Utils.el('a', {
        href: b.url,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'carousel-btn'
      });
      const btnText = lang === 'zh-CN' ? '立即看视频' : 'Watch Video';
      playBtn.innerHTML = `<span>▶</span> ${btnText}`;
      content.appendChild(playBtn);

      slide.appendChild(content);
      track.appendChild(slide);
    });
    
    container.appendChild(track);

    const indicator = Utils.el('div', { className: 'carousel-dots' });
    banners.forEach((_, idx) => {
      const dot = Utils.el('span', {
        className: `carousel-dot ${idx === 0 ? 'active' : ''}`,
        onClick: () => goToSlide(idx)
      });
      dots.push(dot);
      indicator.appendChild(dot);
    });
    container.appendChild(indicator);

    const prevBtn = Utils.el('button', { className: 'carousel-nav-btn prev', onClick: () => prevSlide() }, '‹');
    const nextBtn = Utils.el('button', { className: 'carousel-nav-btn next', onClick: () => nextSlide() }, '›');
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);

    function goToSlide(idx) {
      const slides = track.querySelectorAll('.carousel-slide');
      if (slides.length === 0) return;
      slides[activeIdx].classList.remove('active');
      dots[activeIdx].classList.remove('active');

      activeIdx = (idx + banners.length) % banners.length;

      slides[activeIdx].classList.add('active');
      dots[activeIdx].classList.add('active');
    }

    function nextSlide() {
      goToSlide(activeIdx + 1);
    }

    function prevSlide() {
      goToSlide(activeIdx - 1);
    }

    const intervalId = setInterval(nextSlide, 5000);
    container.dataset.intervalId = intervalId;

    return container;
  },

  // Draw Player Radar Chart using Canvas
  drawPlayerRadarChart(canvasId, skills, isCn) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI screens
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2 - 5; // offset slightly up for labels
    const maxRadius = Math.min(width, height) * 0.35;

    const labels = isCn ? 
      ['速度 (PAC)', '射门 (SHO)', '传球 (PAS)', '盘带 (DRI)', '防守 (DEF)', '力量 (PHY)'] :
      ['Pace (PAC)', 'Shooting (SHO)', 'Passing (PAS)', 'Dribbling (DRI)', 'Defending (DEF)', 'Physical (PHY)'];

    // 1. Concentric background polygons (5 levels)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    const isLightTheme = document.documentElement.classList.contains('light-theme') || 
                          window.getComputedStyle(document.body).getPropertyValue('--background').trim() === '#f4f4f6';
    if (isLightTheme) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
    }
    ctx.lineWidth = 1;

    for (let level = 1; level <= 5; level++) {
      const radius = (maxRadius / 5) * level;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 2. Axes
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius);
    }
    ctx.stroke();

    // 3. Player Stats shape
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const val = skills[i] || 50;
      const radius = (maxRadius * val) / 100;
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Gradient fill
    const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, maxRadius);
    gradient.addColorStop(0, 'rgba(235, 94, 40, 0.15)');
    gradient.addColorStop(1, 'rgba(235, 94, 40, 0.45)');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = '#eb5e28';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 4. Dot markers + values
    for (let i = 0; i < 6; i++) {
      const val = skills[i] || 50;
      const radius = (maxRadius * val) / 100;
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Draw dot
      ctx.fillStyle = '#eb5e28';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Value text
      ctx.fillStyle = isLightTheme ? '#252422' : '#f4f4f6';
      ctx.font = 'bold 9px var(--font-body, sans-serif)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const valOffset = radius > 15 ? 12 : -12;
      const valX = centerX + Math.cos(angle) * (radius + valOffset);
      const valY = centerY + Math.sin(angle) * (radius + valOffset);
      ctx.fillText(val, valX, valY);
    }

    // 5. Labels
    ctx.fillStyle = isLightTheme ? '#403d39' : '#ccc';
    ctx.font = 'bold 10px var(--font-body, sans-serif)';
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const labelRadius = maxRadius + 15;
      const x = centerX + Math.cos(angle) * labelRadius;
      const y = centerY + Math.sin(angle) * labelRadius;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Fine-tune labels alignment
      if (Math.abs(Math.cos(angle)) < 0.1) {
        ctx.textAlign = 'center';
      } else if (Math.cos(angle) > 0) {
        ctx.textAlign = 'left';
      } else {
        ctx.textAlign = 'right';
      }
      ctx.fillText(labels[i], x, y);
    }
  }
};
