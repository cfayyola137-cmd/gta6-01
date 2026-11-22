// Vice Coast: world generation
/**
 * Open-world city simulation.
 * Manages game state, traffic, police, combat, missions, and player physics.
 */
import { FIELD, WORLD, MISSIONS } from './config.js';
import { Random } from './random.js';

export const EVENT_NONE = 0;
export const EVENT_HIT = 1;
export const EVENT_OVER = 2;
export const KIND_BLOCK = 1;
export const KIND_CAR = 2;

export class World {
  constructor(random = new Random(1)) {
    this.random = random;
    this.blocks = [];
    this.buildings = [];
    this.traffic = [];
    this.police = [];
    this.bullets = [];
    this.pedestrians = [];
    this.state = {
      score: 0,
      lives: 3,
      level: 1,
      cash: 500,
      wantedStars: 0,
      health: 100,
      armor: 100,
      activeMission: null,
      missionProgress: 0,
      missionTime: 0,
      player: {
        x: 400,
        y: 400,
        width: 36,
        height: 64,
        angle: 0,
        speed: 0,
        invulnerable: 0,
        inCar: true,
      },
      items: [],
    };
    this.generateCity();
  }

  reset() {
    this.random = new Random(12345);
    this.state.score = 0;
    this.state.lives = 3;
    this.state.level = 1;
    this.state.cash = 500;
    this.state.wantedStars = 0;
    this.state.health = 100;
    this.state.armor = 100;
    this.state.activeMission = null;
    this.state.missionProgress = 0;
    this.state.missionTime = 0;
    this.state.player = {
      x: 500,
      y: 500,
      width: 36,
      height: 64,
      angle: 0,
      speed: 0,
      invulnerable: 0,
      inCar: true,
    };
    this.traffic = [];
    this.police = [];
    this.bullets = [];
    this.state.items = [];

    // Spawn initial traffic cars
    for (let i = 0; i < 15; i++) {
      this.traffic.push({
        x: this.random.range(200, FIELD.width - 200),
        y: this.random.range(200, FIELD.height - 200),
        width: 38,
        height: 68,
        speed: this.random.range(120, 240),
        angle: this.random.choice([0, Math.PI / 2, Math.PI, Math.PI * 1.5]),
        active: true,
        kind: KIND_CAR,
      });
    }
  }

  generateCity() {
    const { blockSize, roadWidth, sidewalkWidth, gridCols, gridRows } = WORLD;
    const totalBlockSpace = blockSize + roadWidth;

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const bx = roadWidth + col * totalBlockSpace;
        const by = roadWidth + row * totalBlockSpace;
        this.blocks.push({ x: bx, y: by, width: blockSize, height: blockSize });

        this.buildings.push({
          x: bx + sidewalkWidth,
          y: by + sidewalkWidth,
          width: blockSize - sidewalkWidth * 2,
          height: blockSize - sidewalkWidth * 2,
          floors: this.random.int(2, 6),
        });
      }
    }
  }

  step(dt, steer = 0, isAuto = false) {
    let events = EVENT_NONE;
    const player = this.state.player;

    if (player.invulnerable > 0) {
      player.invulnerable = Math.max(0, player.invulnerable - dt);
    }

    // Movement / Autopilot physics
    if (isAuto) {
      player.speed = 220;
      player.angle += steer * dt * 2.5;
      player.x += Math.sin(player.angle) * player.speed * dt;
      player.y -= Math.cos(player.angle) * player.speed * dt;
    } else {
      player.speed = 240;
      player.angle += steer * dt * 3.0;
      player.x += Math.sin(player.angle) * player.speed * dt;
      player.y -= Math.cos(player.angle) * player.speed * dt;
    }

    // Clamp inside field
    player.x = Math.max(50, Math.min(FIELD.width - 50, player.x));
    player.y = Math.max(50, Math.min(FIELD.height - 50, player.y));

    // Update traffic cars
    for (const car of this.traffic) {
      car.y += car.speed * dt;
      if (car.y > FIELD.height) car.y = 0;

      // Check collision with player
      if (
        player.x < car.x + car.width &&
        player.x + player.width > car.x &&
        player.y < car.y + car.height &&
        player.y + player.height > car.y
      ) {
        if (player.invulnerable === 0) {
          this.state.lives -= 1;
          player.invulnerable = 1.5;
          events |= EVENT_HIT;
          if (this.state.lives <= 0) {
            events |= EVENT_OVER;
          }
        }
      }
    }

    // Police Wanted Level progression simulation
    if (this.state.wantedStars < 5 && this.random.next() < 0.005) {
      this.state.wantedStars = Math.min(5, this.state.wantedStars + 1);
    }

    // Score increment
    this.state.score += Math.round(dt * 10);

    return events;
  }
}

export function createWorld(random) {
  return new World(random);
}
