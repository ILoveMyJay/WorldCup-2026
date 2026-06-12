/* 2026 FIFA World Cup Portal - Custom Native HTML5 Canvas Charts */

const Charts = {
  // Setup Canvas high DPI resolution
  setupCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Get actual layout sizes
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Scale all drawing operations by DPR
    ctx.scale(dpr, dpr);
    
    // Keep internal sizes matching CSS
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    return { ctx, width: rect.width, height: rect.height };
  },

  // Draw Horizontal Bar Chart: Scorers Top 10
  drawScorers(canvasId, scorers, isCn = true) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Filter top 8 or 10 scorers
    const data = scorers.slice(0, 8);
    if (data.length === 0) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    
    // Colors & Styling (Theme-aware)
    const style = getComputedStyle(document.documentElement);
    const textPrimary = style.getPropertyValue('--text-1').trim() || '#0f1117';
    const textSecondary = style.getPropertyValue('--text-2').trim() || '#5a5c63';
    const gridColor = style.getPropertyValue('--border').trim() || 'rgba(15, 17, 23, 0.08)';
    const goldGradStart = '#ffd07d';
    const goldGradEnd = '#f5a623';

    // Margins
    const paddingLeft = 145; // Space for names
    const paddingRight = 40;
    const paddingTop = 20;
    const paddingBottom = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;
    const rowHeight = chartHeight / data.length;
    
    // Find max goals for scaling
    const maxGoals = Math.max(...data.map(d => d.goals)) || 5;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Grid lines (vertical)
    const gridCount = Math.min(maxGoals, 6);
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.fillStyle = textSecondary;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';

    for (let i = 0; i <= gridCount; i++) {
      const val = Math.round((maxGoals / gridCount) * i);
      const x = paddingLeft + (val / maxGoals) * chartWidth;
      
      ctx.beginPath();
      ctx.moveTo(x, paddingTop);
      ctx.lineTo(x, paddingTop + chartHeight);
      ctx.stroke();
      
      // Draw grid text label
      ctx.fillText(val, x, paddingTop + chartHeight + 15);
    }

    // 2. Draw Bars
    data.forEach((item, index) => {
      const y = paddingTop + index * rowHeight + rowHeight * 0.15;
      const barHeight = rowHeight * 0.7;
      const barWidth = (item.goals / maxGoals) * chartWidth;

      // Draw Y-axis Label: Player Name (Team Name) - overlap-free layout
      const teamName = `(${I18n.tTeam(item.team.name)})`;
      
      // Smart name formatter
      let displayName = item.player.name;
      if (displayName.includes('Vinicius')) {
        displayName = 'Vinicius Jr.';
      } else if (displayName.length > 14) {
        const parts = displayName.split(' ');
        displayName = parts.length > 1 ? parts[parts.length - 1] : displayName;
      }

      // Draw team name (right aligned to paddingLeft - 10)
      ctx.fillStyle = textSecondary;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(teamName, paddingLeft - 10, y + barHeight / 2 + 4);
      
      // Measure team name width
      const teamWidth = ctx.measureText(teamName).width;

      // Draw player name (right-aligned to the left of the team name with a 6px gap)
      ctx.fillStyle = textPrimary;
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(displayName, paddingLeft - 10 - teamWidth - 6, y + barHeight / 2 + 4);

      // Create Golden Gradient for bars
      const grad = ctx.createLinearGradient(paddingLeft, 0, paddingLeft + barWidth, 0);
      grad.addColorStop(0, goldGradStart);
      grad.addColorStop(1, goldGradEnd);

      // Draw Bar
      ctx.fillStyle = grad;
      this.roundRect(ctx, paddingLeft, y, barWidth, barHeight, 4);
      ctx.fill();

      // Draw Goals Value at end of bar
      ctx.fillStyle = '#000';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'right';
      if (barWidth > 25) {
        ctx.fillText(item.goals, paddingLeft + barWidth - 8, y + barHeight / 2 + 4);
      } else {
        ctx.fillStyle = textPrimary;
        ctx.textAlign = 'left';
        ctx.fillText(item.goals, paddingLeft + barWidth + 8, y + barHeight / 2 + 4);
      }
    });
  },

  // Draw Grouped Bar Chart: Top Teams GF vs GA
  drawTeamGoals(canvasId, standings, isCn = true) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Extract top 6 teams based on points
    const teams = [];
    standings.slice(0, 3).forEach(group => {
      if (group.table) {
        group.table.slice(0, 2).forEach(row => {
          teams.push({
            name: row.team.name,
            gf: row.goalsFor,
            ga: row.goalsAgainst
          });
        });
      }
    });

    if (teams.length === 0) return;

    const { ctx, width, height } = this.setupCanvas(canvas);
    
    // Styling (Theme-aware)
    const style = getComputedStyle(document.documentElement);
    const textPrimary = style.getPropertyValue('--text-1').trim() || '#0f1117';
    const textSecondary = style.getPropertyValue('--text-2').trim() || '#5a5c63';
    const gridColor = style.getPropertyValue('--border').trim() || 'rgba(15, 17, 23, 0.08)';
    const gfColor = '#10b981'; // Green for goals for
    const gaColor = '#ef4444'; // Red for goals against

    const paddingLeft = 40;
    const paddingRight = 100; // Legend space
    const paddingTop = 25;
    const paddingBottom = 40;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;
    const groupWidth = chartWidth / teams.length;
    
    // Max goals for scale
    const maxVal = Math.max(...teams.map(t => Math.max(t.gf, t.ga))) || 5;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Y-axis grid
    const gridCount = 4;
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.fillStyle = textSecondary;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';

    for (let i = 0; i <= gridCount; i++) {
      const val = Math.round((maxVal / gridCount) * i);
      const y = paddingTop + chartHeight - (val / maxVal) * chartHeight;
      
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(paddingLeft + chartWidth, y);
      ctx.stroke();
      
      ctx.fillText(val, paddingLeft - 8, y + 4);
    }

    // 2. Draw Grouped Bars
    teams.forEach((team, index) => {
      const xGroupStart = paddingLeft + index * groupWidth;
      const barWidth = groupWidth * 0.35;
      const spacing = groupWidth * 0.1;

      // Draw GF Bar
      const gfHeight = (team.gf / maxVal) * chartHeight;
      const gfX = xGroupStart + spacing;
      const gfY = paddingTop + chartHeight - gfHeight;
      ctx.fillStyle = gfColor;
      this.roundRect(ctx, gfX, gfY, barWidth, gfHeight, { tl: 3, tr: 3, bl: 0, br: 0 });
      ctx.fill();

      // Draw GA Bar
      const gaHeight = (team.ga / maxVal) * chartHeight;
      const gaX = xGroupStart + spacing + barWidth + spacing * 0.5;
      const gaY = paddingTop + chartHeight - gaHeight;
      ctx.fillStyle = gaColor;
      this.roundRect(ctx, gaX, gaY, barWidth, gaHeight, { tl: 3, tr: 3, bl: 0, br: 0 });
      ctx.fill();

      // Draw X-axis label (Team name)
      ctx.fillStyle = textPrimary;
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      const displayName = I18n.tTeam(team.name).substring(0, 4); // Limit string length
      ctx.fillText(displayName, xGroupStart + groupWidth / 2, paddingTop + chartHeight + 18);
    });

    // 3. Draw Legend (Top Right)
    const legendX = width - paddingRight + 15;
    const legendY = paddingTop + 10;
    
    // GF Legend
    ctx.fillStyle = gfColor;
    ctx.fillRect(legendX, legendY, 12, 12);
    ctx.fillStyle = textPrimary;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(isCn ? '进球数 (GF)' : 'Goals For (GF)', legendX + 18, legendY + 10);

    // GA Legend
    ctx.fillStyle = gaColor;
    ctx.fillRect(legendX, legendY + 22, 12, 12);
    ctx.fillStyle = textPrimary;
    ctx.fillText(isCn ? '失球数 (GA)' : 'Goals Against (GA)', legendX + 18, legendY + 32);
  },

  // Helper function to draw rounded rectangles
  roundRect(ctx, x, y, width, height, radius) {
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, bl: radius, br: radius };
    } else {
      const defaultRadius = { tl: 0, tr: 0, bl: 0, br: 0 };
      for (const side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
  }
};
