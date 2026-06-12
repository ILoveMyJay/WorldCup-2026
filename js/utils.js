/* 2026 FIFA World Cup Portal - Utility Functions */

const Utils = {
  // DOM element creator helper
  el(tag, attrs = {}, ...children) {
    const element = document.createElement(tag);
    
    for (const [key, val] of Object.entries(attrs)) {
      if (key === 'style' && typeof val === 'object') {
        Object.assign(element.style, val);
      } else if (key === 'className') {
        element.className = val;
      } else if (key.startsWith('on') && typeof val === 'function') {
        const eventName = key.substring(2).toLowerCase();
        element.addEventListener(eventName, val);
      } else {
        element.setAttribute(key, val);
      }
    }
    
    for (const child of children) {
      if (child === null || child === undefined) continue;
      if (typeof child === 'string' || typeof child === 'number') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    }
    
    return element;
  },

  // Date formatter (local timezone)
  formatDate(utcDateStr, isCn = true) {
    if (!utcDateStr) return '';
    const date = new Date(utcDateStr);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    if (isCn) {
      return `${year}年${month}月${day}日 ${hours}:${minutes}`;
    } else {
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  },

  // Date only formatter
  formatDateOnly(utcDateStr, isCn = true) {
    if (!utcDateStr) return '';
    const date = new Date(utcDateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    if (isCn) {
      return `${month}月${day}日`;
    } else {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${day}`;
    }
  },

  // Time only formatter
  formatTimeOnly(utcDateStr) {
    if (!utcDateStr) return '';
    const date = new Date(utcDateStr);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  },

  // Relative time formatter
  getRelativeTime(utcDateStr, isCn = true) {
    if (!utcDateStr) return '';
    const date = new Date(utcDateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
      return isCn ? '刚刚' : 'just now';
    } else if (diffMin < 60) {
      return isCn ? `${diffMin}分钟前` : `${diffMin}m ago`;
    } else if (diffHour < 24) {
      return isCn ? `${diffHour}小时前` : `${diffHour}h ago`;
    } else if (diffDay < 30) {
      return isCn ? `${diffDay}天前` : `${diffDay}d ago`;
    } else {
      return this.formatDateOnly(utcDateStr, isCn);
    }
  },

  // Countdown calculations
  getCountdown(targetDateStr) {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const diff = target - now;
    
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds, expired: false };
  },

  // Cache Utility (localStorage wrapper with TTL)
  cache: {
    set(key, val, ttlSeconds = 60) {
      const expiry = new Date().getTime() + ttlSeconds * 1000;
      const data = { val, expiry };
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error('Storage error:', e);
      }
    },
    
    get(key) {
      try {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
        
        const item = JSON.parse(itemStr);
        const now = new Date().getTime();
        
        if (now > item.expiry) {
          localStorage.removeItem(key);
          return null;
        }
        return item.val;
      } catch (e) {
        return null;
      }
    },

    remove(key) {
      localStorage.removeItem(key);
    },

    clear() {
      localStorage.clear();
    }
  },

  // API response translation mappings
  translateMatchStatus(status, isCn = true) {
    const mapping = {
      'SCHEDULED': { cn: '未开始', en: 'Scheduled' },
      'TIMED': { cn: '未开始', en: 'Timed' },
      'LIVE': { cn: '进行中', en: 'Live' },
      'IN_PLAY': { cn: '进行中', en: 'In Play' },
      'PAUSED': { cn: '半场休息', en: 'Paused' },
      'FINISHED': { cn: '已结束', en: 'Finished' },
      'POSTPONED': { cn: '已推迟', en: 'Postponed' },
      'SUSPENDED': { cn: '已暂停', en: 'Suspended' },
      'CANCELLED': { cn: '已取消', en: 'Cancelled' }
    };
    return (mapping[status] || { cn: status, en: status })[isCn ? 'cn' : 'en'];
  },

  translateStage(stage, isCn = true) {
    const mapping = {
      'GROUP_STAGE': { cn: '小组赛', en: 'Group Stage' },
      'ROUND_OF_32': { cn: '32强赛', en: 'Round of 32' },
      'ROUND_OF_16': { cn: '16强赛', en: 'Round of 16' },
      'QUARTER_FINALS': { cn: '四分之一决赛', en: 'Quarter-finals' },
      'SEMI_FINALS': { cn: '半决赛', en: 'Semi-finals' },
      'THIRD_PLACE': { cn: '季军争夺战', en: 'Third-place Match' },
      'FINAL': { cn: '决赛', en: 'Final' }
    };
    return (mapping[stage] || { cn: stage, en: stage })[isCn ? 'cn' : 'en'];
  },

  // Toast notifications helper
  showToast(message, isCn = true, duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = this.el('div', { id: 'toast-container', style: {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }});
      document.body.appendChild(container);
    }
    
    const toast = this.el('div', { className: 'toast active' }, message);
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 500);
    }, duration);
  }
};
