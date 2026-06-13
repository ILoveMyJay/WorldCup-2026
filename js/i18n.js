/* 2026 FIFA World Cup Portal - Internationalization & Team Name Translation */

const I18n = {
  currentLang: localStorage.getItem('wc_lang') || 'zh-CN',
  
  // Translation dictionary for general UI strings
  dictionary: {
    'zh-CN': {
      // Navigation
      'nav.home': '首页',
      'nav.schedule': '赛程',
      'nav.standings': '积分榜',
      'nav.news': '新闻',
      'nav.teams': '球队',
      'nav.players': '球员',
      'nav.settings': '设置',
      
      // Hero / Dashboard
      'hero.subtitle': '2026年美加墨世界杯',
      'hero.title': 'FIFA 世界杯 26™',
      'hero.desc': '欢迎来到首届 48 支球队参赛、三国联合举办的世界杯。在这里获取最新的赛事动态、实时比分与独家资讯。',
      'countdown.days': '天',
      'countdown.hours': '时',
      'countdown.minutes': '分',
      'countdown.seconds': '秒',
      'countdown.title': '下场焦点战倒计时',
      'dashboard.live': '实时进行中',
      'dashboard.recent': '近期比赛',
      'dashboard.news': '最新动态',
      'dashboard.topScorers': '射手榜速览',
      'dashboard.viewAll': '查看全部',
      
      // Schedule Page
      'schedule.title': '世界杯完整赛程',
      'schedule.stage.group': '小组赛',
      'schedule.stage.knockout': '淘汰赛',
      'schedule.filter.day': '比赛日',
      'schedule.noMatches': '该阶段暂无比赛数据',
      
      // Standings Page
      'standings.title': '小组积分榜',
      'standings.table.team': '球队',
      'standings.table.played': '赛',
      'standings.table.won': '胜',
      'standings.table.draw': '平',
      'standings.table.lost': '负',
      'standings.table.goals': '进/失',
      'standings.table.diff': '净',
      'standings.table.points': '分',
      
      // News Page
      'news.title': '新闻资讯',
      'news.loadMore': '加载更多',
      'news.readOriginal': '阅读原文',
      'news.noNews': '暂无相关新闻',
      
      // Teams Page
      'teams.title': '参赛国家队 (48支)',
      'teams.filter.all': '全部小组',
      'teams.manager': '主教练',
      'teams.group': '所属小组',
      'teams.matches': '赛事记录',
      'teams.squad': '队员名单',
      
      // Players Page
      'players.title': '数据统计 & 球员榜',
      'players.scorers': '最佳射手榜',
      'players.assists': '助攻榜',
      'players.goals': '进球数',
      'players.assistsCount': '助攻数',
      'players.penalties': '点球数',
      'players.visualTitle': '神射手进球分布对比 (Top 10)',
      'players.searchPlaceholder': '搜索球员或国家队...',
      'players.tabScorers': '最佳射手',
      'players.tabAssists': '最佳助攻',
      'players.tabPKs': '点球射手',
      'players.selectHint': '点击列表中的球员查看详细履历与能力数据',
      'players.bioTitle': '个人简介',
      'players.statsTitle': '生涯统计',
      'players.skillsTitle': '能力分布',
      'players.club': '效力俱乐部',
      'players.jersey': '球衣号码',
      'players.age': '年龄',
      'players.height': '身高',
      'players.weight': '体重',
      'players.pos': '场上位置',
      'players.games': '出场次数',
      'players.attribute.pace': '速度',
      'players.attribute.shooting': '射门',
      'players.attribute.passing': '传球',
      'players.attribute.dribbling': '盘带',
      'players.attribute.defending': '防守',
      'players.attribute.physical': '力量',
      
      // Match Details
      'match.details': '比赛详情',
      'match.venue': '比赛场馆',
      'match.referee': '裁判',
      'match.stats': '比赛统计',
      'match.timeline': '比赛事件',
      'match.halfTime': '半场比分',
      'match.fullTime': '全场比分',
      
      // Settings Modal
      'settings.title': 'API Key 设置',
      'settings.desc': '本项目使用免费的第三方 API 获取数据。为了保证请求频次和获取最新内容，请输入你的个人 API Key：',
      'settings.key.football': 'Football-Data.org API Key',
      'settings.key.gnews': 'GNews.io API Key',
      'settings.placeholder.football': '请输入 32 位 API Key',
      'settings.placeholder.gnews': '请输入 32 位 API Key',
      'settings.save': '保存设置',
      'settings.success': 'API Key 保存成功！已切换到在线数据源。',
      'settings.clear': '清除 API Key',
      'settings.clearSuccess': 'API Key 已清除，网站降级到模拟数据模式。',
      'settings.demoMode': '（当前运行于模拟数据模式）',
      
      // Other UI
      'ui.loading': '加载中...',
      'ui.error': '加载失败，请检查网络或 API Key 限制',
      'ui.nodata': '暂无数据',
      'ui.venue': '场馆',
      'ui.kickoff': '开球时间'
    },
    'en': {
      // Navigation
      'nav.home': 'Home',
      'nav.schedule': 'Matches',
      'nav.standings': 'Standings',
      'nav.news': 'News',
      'nav.teams': 'Teams',
      'nav.players': 'Players',
      'nav.settings': 'Settings',
      
      // Hero / Dashboard
      'hero.subtitle': 'FIFA World Cup 2026 USA - Mexico - Canada',
      'hero.title': 'FIFA World Cup 26™',
      'hero.desc': 'Welcome to the first-ever 48-team World Cup co-hosted by three nations. Stay up to date with live scores, matches, standings, and top stories.',
      'countdown.days': 'Days',
      'countdown.hours': 'Hours',
      'countdown.minutes': 'Mins',
      'countdown.seconds': 'Secs',
      'countdown.title': 'Countdown to Next Big Match',
      'dashboard.live': 'Live Now',
      'dashboard.recent': 'Recent Matches',
      'dashboard.news': 'Latest News',
      'dashboard.topScorers': 'Top Scorers Preview',
      'dashboard.viewAll': 'View All',
      
      // Schedule Page
      'schedule.title': 'Tournament Schedule',
      'schedule.stage.group': 'Group Stage',
      'schedule.stage.knockout': 'Knockouts',
      'schedule.filter.day': 'Matchday',
      'schedule.noMatches': 'No match data found for this stage',
      
      // Standings Page
      'standings.title': 'Group Standings',
      'standings.table.team': 'Team',
      'standings.table.played': 'PL',
      'standings.table.won': 'W',
      'standings.table.draw': 'D',
      'standings.table.lost': 'L',
      'standings.table.goals': 'GF/GA',
      'standings.table.diff': 'GD',
      'standings.table.points': 'PTS',
      
      // News Page
      'news.title': 'Latest Stories',
      'news.loadMore': 'Load More',
      'news.readOriginal': 'Read More',
      'news.noNews': 'No news available',
      
      // Teams Page
      'teams.title': 'Participating Teams (48)',
      'teams.filter.all': 'All Groups',
      'teams.manager': 'Manager',
      'teams.group': 'Group',
      'teams.matches': 'Matches',
      'teams.squad': 'Squad',
      
      // Players Page
      'players.title': 'Statistics & Players',
      'players.scorers': 'Top Scorers',
      'players.assists': 'Top Assists',
      'players.goals': 'Goals',
      'players.assistsCount': 'Assists',
      'players.penalties': 'PKs',
      'players.visualTitle': 'Top 10 Scorers Goals Comparison',
      'players.searchPlaceholder': 'Search players or national teams...',
      'players.tabScorers': 'Goals',
      'players.tabAssists': 'Assists',
      'players.tabPKs': 'Penalties',
      'players.selectHint': 'Click a player to view detailed profile and stats',
      'players.bioTitle': 'Biography',
      'players.statsTitle': 'Career Statistics',
      'players.skillsTitle': 'Skill Attributes',
      'players.club': 'Club',
      'players.jersey': 'Jersey Number',
      'players.age': 'Age',
      'players.height': 'Height',
      'players.weight': 'Weight',
      'players.pos': 'Position',
      'players.games': 'Matches',
      'players.attribute.pace': 'Pace',
      'players.attribute.shooting': 'Shooting',
      'players.attribute.passing': 'Passing',
      'players.attribute.dribbling': 'Dribbling',
      'players.attribute.defending': 'Defending',
      'players.attribute.physical': 'Physical',
      
      // Match Details
      'match.details': 'Match Details',
      'match.venue': 'Venue',
      'match.referee': 'Referee',
      'match.stats': 'Match Stats',
      'match.timeline': 'Timeline',
      'match.halfTime': 'Half Time Score',
      'match.fullTime': 'Full Time Score',
      
      // Settings Modal
      'settings.title': 'API Key Configuration',
      'settings.desc': 'This portal fetches dynamic data from free third-party APIs. To ensure high limit rates and the latest information, input your API Keys:',
      'settings.key.football': 'Football-Data.org API Key',
      'settings.key.gnews': 'GNews.io API Key',
      'settings.placeholder.football': 'Enter 32-character API Key',
      'settings.placeholder.gnews': 'Enter 32-character API Key',
      'settings.save': 'Save Configuration',
      'settings.success': 'API Keys saved successfully! Switched to online API sources.',
      'settings.clear': 'Clear API Keys',
      'settings.clearSuccess': 'API Keys cleared. Reverted to Demo mode.',
      'settings.demoMode': '(Currently running in local demo mode)',
      
      // Other UI
      'ui.loading': 'Loading...',
      'ui.error': 'Failed to load. Check connection or API limit.',
      'ui.nodata': 'No data available',
      'ui.venue': 'Venue',
      'ui.kickoff': 'Kickoff Time'
    }
  },

  // Team translations (English API Name -> Chinese Name)
  teamTranslations: {
    // A-Z common teams and World Cup participants
    'Albania': '阿尔巴尼亚',
    'Algeria': '阿尔及利亚',
    'Andorra': '安道尔',
    'Angola': '安哥拉',
    'Argentina': '阿根廷',
    'Armenia': '亚美尼亚',
    'Australia': '澳大利亚',
    'Austria': '奥地利',
    'Azerbaijan': '阿塞拜疆',
    'Bahrain': '巴林',
    'Belarus': '白俄罗斯',
    'Belgium': '比利时',
    'Benin': '贝宁',
    'Bolivia': '玻利维亚',
    'Bosnia and Herzegovina': '波黑',
    'Bosnia-Herzegovina': '波黑',
    'Brazil': '巴西',
    'Bulgaria': '保加利亚',
    'Burkina Faso': '布基纳法索',
    'Cabo Verde': '佛得角',
    'Cameroon': '喀麦隆',
    'Canada': '加拿大',
    'Cape Verde': '佛得角',
    'Cape Verde Islands': '佛得角',
    'Chile': '智利',
    'China': '中国',
    'China PR': '中国',
    'Colombia': '哥伦比亚',
    'Congo DR': '刚果民主共和国',
    'Costa Rica': '哥斯达黎加',
    'Cote d\'Ivoire': '科特迪瓦',
    'Côte d\'Ivoire': '科特迪瓦',
    'Ivory Coast': '科特迪瓦',
    'Croatia': '克罗地亚',
    'Cuba': '古巴',
    'Curacao': '库拉索',
    'Curaçao': '库拉索',
    'Cyprus': '塞浦路斯',
    'Czech Republic': '捷克',
    'Czechia': '捷克',
    'Denmark': '丹麦',
    'DR Congo': '刚果民主共和国',
    'Ecuador': '厄瓜多尔',
    'Egypt': '埃及',
    'El Salvador': '萨尔瓦多',
    'England': '英格兰',
    'Equatorial Guinea': '赤道几内亚',
    'Estonia': '爱沙尼亚',
    'Faroe Islands': '法罗群岛',
    'Finland': '芬兰',
    'France': '法国',
    'Gabon': '加蓬',
    'Georgia': '格鲁吉亚',
    'Germany': '德国',
    'Ghana': '加纳',
    'Gibraltar': '直布罗陀',
    'Greece': '希腊',
    'Guatemala': '危地马拉',
    'Guinea': '几内亚',
    'Guinea-Bissau': '几内亚比绍',
    'Haiti': '海地',
    'Haïti': '海地',
    'Honduras': '洪都拉斯',
    'Hungary': '匈牙利',
    'Iceland': '冰岛',
    'India': '印度',
    'Indonesia': '印度尼西亚',
    'Iran': '伊朗',
    'IR Iran': '伊朗',
    'Iraq': '伊拉克',
    'Ireland': '爱尔兰',
    'Israel': '以色列',
    'Italy': '意大利',
    'Jamaica': '牙买加',
    'Japan': '日本',
    'Jordan': '约旦',
    'Kazakhstan': '哈萨克斯坦',
    'Kenya': '肯尼亚',
    'Korea Republic': '韩国',
    'Kosovo': '科索沃',
    'Kuwait': '科威特',
    'Latvia': '拉脱维亚',
    'Lebanon': '黎巴嫩',
    'Liberia': '利比里亚',
    'Libya': '利比亚',
    'Liechtenstein': '列支敦士登',
    'Lithuania': '立陶宛',
    'Luxembourg': '卢森堡',
    'Madagascar': '马达加斯加',
    'Malaysia': '马来西亚',
    'Mali': '马里',
    'Malta': '马耳他',
    'Mauritania': '毛里塔尼亚',
    'Mexico': '墨西哥',
    'Moldova': '摩尔多瓦',
    'Montenegro': '黑山',
    'Morocco': '摩洛哥',
    'Mozambique': '莫桑比克',
    'Netherlands': '荷兰',
    'New Zealand': '新西兰',
    'Nigeria': '尼日利亚',
    'North Korea': '朝鲜',
    'North Macedonia': '北马其顿',
    'Northern Ireland': '北爱尔兰',
    'Norway': '挪威',
    'Oman': '阿曼',
    'Palestine': '巴勒斯坦',
    'Panama': '巴拿马',
    'Paraguay': '巴拉圭',
    'Peru': '秘鲁',
    'Poland': '波兰',
    'Portugal': '葡萄牙',
    'Qatar': '卡塔尔',
    'Republic of Ireland': '爱尔兰',
    'Romania': '罗马尼亚',
    'Russia': '俄罗斯',
    'Rwanda': '卢旺达',
    'San Marino': '圣马力诺',
    'Saudi Arabia': '沙特阿拉伯',
    'Scotland': '苏格兰',
    'Senegal': '塞内加尔',
    'Serbia': '塞尔维亚',
    'Singapore': '新加坡',
    'Slovakia': '斯洛伐克',
    'Slovenia': '斯洛文尼亚',
    'South Africa': '南非',
    'South Korea': '韩国',
    'Spain': '西班牙',
    'Sudan': '苏丹',
    'Sweden': '瑞典',
    'Switzerland': '瑞士',
    'Syria': '叙利亚',
    'Tanzania': '坦桑尼亚',
    'Thailand': '泰国',
    'Togo': '多哥',
    'Trinidad and Tobago': '特立尼达和多巴哥',
    'Tunisia': '突尼斯',
    'Turkey': '土耳其',
    'UAE': '阿联酋',
    'Uganda': '乌干达',
    'Ukraine': '乌克兰',
    'United Arab Emirates': '阿联酋',
    'United States': '美国',
    'Uruguay': '乌拉圭',
    'USA': '美国',
    'Uzbekistan': '乌兹别克斯坦',
    'Venezuela': '委内瑞拉',
    'Vietnam': '越南',
    'Wales': '威尔士',
    'Zambia': '赞比亚',
    'Zimbabwe': '津巴布韦'
  },

  // Translate a UI string key
  t(key) {
    const lang = this.currentLang;
    return this.dictionary[lang][key] || this.dictionary['en'][key] || key;
  },

  // Translate a team name
  tTeam(teamName) {
    if (this.currentLang === 'en') return teamName;
    if (!teamName) return '';
    const name = teamName.trim();
    if (this.teamTranslations[name]) return this.teamTranslations[name];
    
    // Normalize and clean up prefixes/suffixes commonly found in API outputs
    const cleanName = name
      .replace(/\s+PR$/, '')
      .replace(/^IR\s+/, '')
      .replace(/^DR\s+/, '')
      .replace(/\s+DR$/, '')
      .replace(/^Republic of\s+/, '')
      .trim();
      
    if (this.teamTranslations[cleanName]) return this.teamTranslations[cleanName];

    // Regex matching for placeholder teams in knockout stages (e.g. Winner Group A, Runner-up Group B)
    if (/^Winner\s+Group\s+([A-L])$/i.test(name)) {
      return name.replace(/^Winner\s+Group\s+([A-L])$/i, '$1组第一');
    }
    if (/^Runner-up\s+Group\s+([A-L])$/i.test(name)) {
      return name.replace(/^Runner-up\s+Group\s+([A-L])$/i, '$1组第二');
    }
    if (/^Winner\s+Match\s+(\d+)$/i.test(name)) {
      return name.replace(/^Winner\s+Match\s+(\d+)$/i, '第 $1 场胜者');
    }
    if (/^Winner\s+R32\s+(\d+)$/i.test(name)) {
      return name.replace(/^Winner\s+R32\s+(\d+)$/i, '32强第 $1 场胜者');
    }
    if (/^Winner\s+R16\s+(\d+)$/i.test(name)) {
      return name.replace(/^Winner\s+R16\s+(\d+)$/i, '16强第 $1 场胜者');
    }
    if (/^Winner\s+QF\s+(\d+)$/i.test(name)) {
      return name.replace(/^Winner\s+QF\s+(\d+)$/i, '八强第 $1 场胜者');
    }
    if (/^Winner\s+SF\s+(\d+)$/i.test(name)) {
      return name.replace(/^Winner\s+SF\s+(\d+)$/i, '半决赛第 $1 场胜者');
    }
    if (/^Winner\s+Play-off\s*(\d*)$/i.test(name)) {
      return name.replace(/^Winner\s+Play-off\s*(\d*)$/i, '附加赛胜者 $1').trim();
    }
    if (/^To\s+Be\s+Decided$/i.test(name) || name === 'TBD') {
      return '待定';
    }

    return name;
  },

  // Get current language
  getLanguage() {
    return this.currentLang;
  },

  // Switch UI language
  switchLanguage(lang) {
    if (lang === 'zh-CN' || lang === 'en') {
      this.currentLang = lang;
      localStorage.setItem('wc_lang', lang);
      // Trigger page re-render
      if (window.App && typeof window.App.reRender === 'function') {
        window.App.reRender();
      }
    }
  },

  playerTranslations: {
    'Kylian Mbappé': '基利安·姆巴佩',
    'Kylian Mbappe': '基利安·姆巴佩',
    'Lionel Messi': '利昂内尔·梅西',
    'Harry Kane': '哈里·凯恩',
    'Christian Pulisic': '克里斯蒂安·普利西奇',
    'Vinicius Junior': '维尼修斯·儒尼奥尔',
    'Vinícius Júnior': '维尼修斯·儒尼奥尔',
    'Alvaro Morata': '阿尔瓦罗·莫拉塔',
    'Álvaro Morata': '阿尔瓦罗·莫拉塔',
    'Robert Lewandowski': '罗伯特·莱万多夫斯基',
    // Argentina
    'Julián Álvarez': '胡利安·阿尔瓦雷斯',
    'Julian Alvarez': '胡利安·阿尔瓦雷斯',
    'Enzo Fernández': '恩佐·费尔南德斯',
    'Enzo Fernandez': '恩佐·费尔南德斯',
    'Alexis Mac Allister': '亚历克西斯·麦卡利斯特',
    'Lautaro Martínez': '劳塔罗·马丁内斯',
    'Lautaro Martinez': '劳塔罗·马丁内斯',
    // Brazil
    'Neymar Jr': '内马尔',
    'Neymar': '内马尔',
    'Rodrygo': '罗德里戈',
    'Bruno Guimarães': '布鲁诺·吉马良斯',
    'Bruno Guimaraes': '布鲁诺·吉马良斯',
    'Marquinhos': '马尔基尼奥斯',
    // France
    'Antoine Griezmann': '安东尼·格里兹曼',
    'Ousmane Dembélé': '奥斯曼·登贝莱',
    'Ousmane Dembele': '奥斯曼·登贝莱',
    'Aurélien Tchouaméni': '奥雷利安·楚阿梅尼',
    'Aurelien Tchouameni': '奥雷利安·楚阿梅尼',
    'Theo Hernández': '特奥·埃尔南德斯',
    'Theo Hernandez': '特奥·埃尔南德斯',
    // England
    'Jude Bellingham': '朱德·贝林厄姆',
    'Bukayo Saka': '布卡约·萨卡',
    'Phil Foden': '菲尔·福登',
    'Declan Rice': '德克兰·赖斯',
    // Germany
    'Jamal Musiala': '贾马尔·穆西亚拉',
    'Florian Wirtz': '弗洛里安·维尔茨',
    'Kai Havertz': '凯·哈弗茨',
    'Joshua Kimmich': '约书亚·基米希',
    'Antonio Rüdiger': '安东尼奥·吕迪格',
    'Antonio Rudiger': '安东尼奥·吕迪格',
    // Spain
    'Lamine Yamal': '拉明·亚马尔',
    'Pedri': '佩德里',
    'Rodri': '罗德里',
    'Dani Carvajal': '丹尼·卡瓦哈尔',
    // Portugal
    'Cristiano Ronaldo': '克里斯蒂亚诺·罗纳尔多',
    'Bruno Fernandes': '布鲁诺·费尔南德斯',
    'Bernardo Silva': '贝尔纳多·席尔瓦',
    'Rafael Leão': '拉斐尔·莱奥',
    'Rafael Leao': '拉斐尔·莱奥',
    'Rúben Dias': '鲁本·迪亚斯',
    'Ruben Dias': '鲁本·迪亚斯',
    // United States
    'Weston McKennie': '韦斯顿·麦肯尼',
    'Timothy Weah': '蒂莫西·维阿',
    'Tyler Adams': '泰勒·亚当斯',
    'Matt Turner': '马特·特纳',
    // Canada
    'Alphonso Davies': '阿方索·戴维斯',
    'Jonathan David': '乔纳森·戴维',
    'Cyle Larin': '塞林·拉林',
    'Stephen Eustáquio': '斯蒂芬·欧斯塔基奥',
    'Stephen Eustaquio': '斯蒂芬·欧斯塔基奥',
    'Tajon Buchanan': '泰江·布坎南',
    // Mexico
    'Santiago Giménez': '圣地亚哥·希门尼斯',
    'Santiago Gimenez': '圣地亚哥·希门尼斯',
    'Hirving Lozano': '伊尔温·洛萨诺',
    'Edson Álvarez': '埃德森·阿尔瓦雷斯',
    'Edson Alvarez': '埃德森·阿尔瓦雷斯',
    'Guillermo Ochoa': '吉列尔莫·奥乔亚',
    'Luis Chávez': '路易斯·查韦斯',
    'Luis Chavez': '路易斯·查韦斯',
    'Folarin Balogun': '弗拉林·巴洛贡',
    'Julián Quiñones': '胡利安·基尼奥内斯',
    'Raúl Jiménez': '劳尔·希门尼斯',
    'Ladislav Krejčí': '拉迪斯拉夫·克雷伊奇',
    'In-beom Hwang': '黄仁范',
    'Hyun-Gyu Oh': '吴贤揆',
    'Jovo Lukić': '乔沃·卢基奇',
    'Mauricio': '毛里西奥',
    'Gio Reyna': '乔瓦尼·雷纳'
  },
  
  clubTranslations: {
    'Real Madrid': '皇家马德里',
    'Inter Miami': '迈阿密国际',
    'Bayern Munich': '拜仁慕尼黑',
    'AC Milan': 'AC米兰',
    'Barcelona': '巴塞罗那',
    'Manchester City': '曼彻斯特城',
    'Liverpool': '利物浦',
    'Arsenal': '阿森纳',
    'Paris Saint-Germain': '巴黎圣日耳曼',
    'Juventus': '尤文图斯',
    'Inter Milan': '国际米兰',
    'Chelsea': '切尔西',
    'Al Hilal': '利雅得新月',
    'Aston Villa': '阿斯顿维拉',
    'Manchester United': '曼彻斯特联',
    'Atletico Madrid': '马德里竞技',
    'Atlético Madrid': '马德里竞技',
    'Tottenham Hotspur': '托特纳姆热刺',
    'Bayer Leverkusen': '勒沃库森',
    'Real Sociedad': '皇家社会',
    'FC Porto': '波尔图',
    'Lille': '里尔',
    'Feyenoord': '费耶诺德',
    'Bournemouth': '伯恩茅斯',
    'Nottingham Forest': '诺丁汉森林',
    'Crystal Palace': '水晶宫',
    'Fulham': '富勒姆',
    'AS Monaco': '摩纳哥',
    'Marseille': '马赛',
    'Nice': '尼斯',
    'Lyon': '里昂'
  },

  posTranslations: {
    'FW': '前锋',
    'MF': '中场',
    'DF': '后卫',
    'GK': '门将',
    'Offence': '前锋',
    'Midfield': '中场',
    'Defence': '后卫',
    'Goalkeeper': '门将'
  },

  tPlayer(playerName) {
    if (this.currentLang === 'en') return playerName;
    if (!playerName) return '';
    return this.playerTranslations[playerName.trim()] || playerName;
  },

  tClub(clubName) {
    if (this.currentLang === 'en') return clubName;
    if (!clubName) return '';
    return this.clubTranslations[clubName.trim()] || clubName;
  },

  tPos(posCode) {
    if (this.currentLang === 'en') return posCode;
    if (!posCode) return '';
    return this.posTranslations[posCode.trim()] || posCode;
  }
};
