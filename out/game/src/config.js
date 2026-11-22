// Vice Coast: balance and layout tuning
/**
 * Configuration and tuning constants for Neo City Drive.
 * Defines game physics, world dimensions, missions, and color palette.
 */
export const LIVES = 3;
export const FIELD = { width: 3200, height: 3200 };
export const SCREEN = { width: 1280, height: 720 };
export const STEP = 1 / 60;
export const BEST_KEY = 'neocity_best_score';

export const WORLD = {
  blockSize: 280,
  roadWidth: 90,
  sidewalkWidth: 20,
  gridCols: 10,
  gridRows: 10,
};

export const PLAYER_PHYSICS = {
  accel: 540,
  maxSpeed: 500,
  reverseSpeed: 220,
  friction: 0.968,
  steerSpeed: 3.4,
  bodyWidth: 42,
  bodyHeight: 74,
};

export const WEAPONS = {
  pistol: { name: 'Pistol', damage: 25, fireRate: 0.3, ammo: 100, speed: 1300, range: 650 },
  smg: { name: 'SMG', damage: 15, fireRate: 0.1, ammo: 300, speed: 1500, range: 750 },
  shotgun: { name: 'Shotgun', damage: 85, fireRate: 0.6, ammo: 50, speed: 1100, range: 500 },
};

export const MISSIONS = [
  { id: 1, title: 'Taxi Rush', desc: 'Deliver VIP passenger across downtown before time expires.', reward: 1500, timeLimit: 60 },
  { id: 2, title: 'Grand Theft Auto', desc: 'Hijack the red sports car and park it safely in the safehouse garage.', reward: 3000, timeLimit: 90 },
  { id: 3, title: 'Getaway Heat', desc: 'Shake off police pursuit and lose all wanted stars within 60 seconds.', reward: 2500, timeLimit: 60 },
  { id: 4, title: 'Neon Speedway', desc: 'Navigate all 10 checkpoint rings across the city street circuit.', reward: 2000, timeLimit: 75 },
  { id: 5, title: 'Rampage', desc: 'Cause chaos by destroying 8 vehicles within the time limit.', reward: 3500, timeLimit: 50 },
  { id: 6, title: 'VIP Escort', desc: 'Escort the syndicate boss to the extraction zone while dodging rivals.', reward: 5000, timeLimit: 90 },
];

export function getMissionById(id) {
  return MISSIONS.find(m => m.id === id);
}

export const PALETTE = {
  sky: '#090d16',
  road: '#1e293b',
  roadLine: '#38bdf8',
  sidewalk: '#475569',
  buildingBase: '#0f172a',
  buildingTop: '#1e1b4b',
  windowLit: '#fde047',
  windowDark: '#334155',
  playerCar: '#dc2626',
  policeCar: '#2563eb',
  trafficCar: '#eab308',
  pedestrian: '#f8fafc',
  hudBg: 'rgba(15, 23, 42, 0.9)',
  hudText: '#f8fafc',
  accent: '#38bdf8',
  neonPink: '#ec4899',
  neonCyan: '#06b6d4',
};

export const FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif';
