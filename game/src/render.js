// Rendering canvas graphics for Neo City Drive - Ultra Rich Visuals (Rewritten)
import { FIELD, FONT, PALETTE } from './config.js';

export const SCREEN_TITLE = 'title';
export const SCREEN_PLAY = 'play';
export const SCREEN_PAUSED = 'paused';
export const SCREEN_OVER = 'over';

export function createRenderer(canvas, world = null) {
  const context = canvas.getContext('2d');
  const view = { scale: 1, x: 0, y: 0 };

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    const width = Math.round(window.innerWidth * ratio);
    const height = Math.round(window.innerHeight * ratio);
    canvas.width = width;
    canvas.height = height;
    view.scale = Math.min(width / FIELD.width, height / FIELD.height);
    view.x = (width - FIELD.width * view.scale) / 2;
    view.y = (height - FIELD.height * view.scale) / 2;
  }

  function text(value, x, y, size, color, align) {
    context.font = `bold ${size}px ${FONT}`;
    context.fillStyle = color;
    context.textAlign = align;
    context.fillText(value, x, y);
  }

  function drawWorld(world) {
    // Ultra rich city background and gradient mesh
    const grad = context.createLinearGradient(0, 0, FIELD.width, FIELD.height);
    grad.addColorStop(0, '#020617');
    grad.addColorStop(0.5, '#090d16');
    grad.addColorStop(1, '#0f172a');
    context.fillStyle = grad;
    context.fillRect(0, 0, FIELD.width, FIELD.height);

    // Roads and glowing grid
    context.fillStyle = PALETTE.road;
    context.fillRect(0, 0, FIELD.width, FIELD.height);

    context.strokeStyle = PALETTE.neonCyan;
    context.lineWidth = 6;
    context.setLineDash([30, 20]);
    for (let x = 280; x < FIELD.width; x += 320) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, FIELD.height);
      context.stroke();
    }
    for (let y = 280; y < FIELD.height; y += 320) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(FIELD.width, y);
      context.stroke();
    }
    context.setLineDash([]);

    // Detailed buildings with vibrant neon windows
    for (const b of world.buildings) {
      context.fillStyle = PALETTE.buildingBase;
      context.fillRect(b.x, b.y, b.width, b.height);
      context.strokeStyle = PALETTE.neonPink;
      context.lineWidth = 4;
      context.strokeRect(b.x, b.y, b.width, b.height);

      // Dense lit windows
      context.fillStyle = PALETTE.windowLit;
      for (let wx = b.x + 12; wx < b.x + b.width - 12; wx += 20) {
        for (let wy = b.y + 12; wy < b.y + b.height - 12; wy += 28) {
          context.fillRect(wx, wy, 10, 16);
          context.fillStyle = PALETTE.neonCyan;
          context.fillRect(wx + 2, wy + 2, 6, 12);
          context.fillStyle = PALETTE.windowLit;
        }
      }
    }

    // Traffic cars with details
    for (const car of world.traffic) {
      context.save();
      context.translate(car.x + car.width / 2, car.y + car.height / 2);
      context.rotate(car.angle);
      context.fillStyle = PALETTE.trafficCar;
      context.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
      context.fillStyle = '#fef08a';
      context.fillRect(-car.width / 2 + 4, -car.height / 2 - 6, 8, 8);
      context.fillRect(car.width / 2 - 12, -car.height / 2 - 6, 8, 8);
      context.restore();
    }

    // Player car
    const player = world.state.player;
    if (player.invulnerable === 0 || Math.floor(player.invulnerable * 10) % 2 === 1) {
      context.save();
      context.translate(player.x + player.width / 2, player.y + player.height / 2);
      context.rotate(player.angle);
      context.fillStyle = PALETTE.playerCar;
      context.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
      context.fillStyle = '#0f172a';
      context.fillRect(-player.width / 2 + 6, -player.height / 2 + 12, player.width - 12, 22);
      context.strokeStyle = PALETTE.neonCyan;
      context.lineWidth = 5;
      context.strokeRect(-player.width / 2 - 3, -player.height / 2 - 3, player.width + 6, player.height + 6);
      context.restore();
    }
  }

  function drawHud(state) {
    context.fillStyle = PALETTE.hudBg;
    context.fillRect(20, 20, 480, 90);
    context.strokeStyle = PALETTE.neonCyan;
    context.lineWidth = 4;
    context.strokeRect(20, 20, 480, 90);

    text(`SCORE: ${state.score}`, 40, 42, 26, PALETTE.hudText, 'left');
    text(`CASH: $${state.cash}`, 40, 76, 26, PALETTE.neonPink, 'left');
    text(`WANTED: ${'★'.repeat(state.wantedStars)}`, 260, 42, 24, '#eab308', 'left');
    text(`LIVES: ${state.lives}`, 260, 76, 24, PALETTE.accent, 'left');

    const mmSize = 200;
    const mmX = FIELD.width - mmSize - 20;
    const mmY = 20;
    context.fillStyle = PALETTE.hudBg;
    context.fillRect(mmX, mmY, mmSize, mmSize);
    context.strokeStyle = PALETTE.neonPink;
    context.lineWidth = 4;
    context.strokeRect(mmX, mmY, mmSize, mmSize);

    const pX = mmX + (state.player.x / FIELD.width) * mmSize;
    const pY = mmY + (state.player.y / FIELD.height) * mmSize;
    context.fillStyle = PALETTE.playerCar;
    context.beginPath();
    context.arc(pX, pY, 7, 0, Math.PI * 2);
    context.fill();
  }

  function drawPanel(title, lines, prompt) {
    const w = 780;
    const h = 460;
    const x = (FIELD.width - w) / 2;
    const y = (FIELD.height - h) / 2;

    context.fillStyle = PALETTE.hudBg;
    context.fillRect(x, y, w, h);
    context.strokeStyle = PALETTE.neonCyan;
    context.lineWidth = 5;
    context.strokeRect(x, y, w, h);

    text(title, FIELD.width / 2, y + 80, 56, PALETTE.neonPink, 'center');
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], FIELD.width / 2, y + 170 + i * 44, 26, PALETTE.hudText, 'center');
    }
    text(prompt, FIELD.width / 2, y + h - 60, 28, PALETTE.neonCyan, 'center');
  }

  function draw(state, screen, best) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillStyle = '#020617';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.setTransform(view.scale, 0, 0, view.scale, view.x, view.y);
    const camX = 0;
    const camY = 0;
    context.save();
    context.translate(-camX, -camY);

    drawWorld(world ?? { buildings: state?.buildings || [], traffic: state?.traffic || [], state });

    context.restore();

    if (screen === SCREEN_TITLE) {
      drawPanel('NEO CITY DRIVE', ['Open World Crime Driving, Police Chases & 6 Missions', 'Use WASD or Arrow Keys to Drive. Space to Start.', `Best Score: ${best}`], 'Press Space or Click to Start');
    } else if (screen === SCREEN_PLAY) {
      drawHud(state);
    } else if (screen === SCREEN_PAUSED) {
      drawPanel('GAME PAUSED', ['Press P to Resume'], 'Paused');
    } else if (screen === SCREEN_OVER) {
      drawPanel('GAME OVER', [`Final Score: ${state.score}`, `Best Score: ${best}`], 'Press Space to Play Again');
    }
  }

  resize();
  window.addEventListener('resize', resize);
  return { draw };
}
