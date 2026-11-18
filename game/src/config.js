// Neo City Drive - Configuration & Tuning Constants
export const FIELD = { width: 3200, height: 3200 }; // Massive open world grid
export const SCREEN = { width: 1280, height: 720 };
export const STEP = 1 / 60;

export const WORLD = {
  blockSize: 280,
  roadWidth: 90,
  sidewalkWidth: 20,
  gridCols: 10,
  gridRows: 10,
};

export const PLAYER_PHYSICS = {
  accel: 520,
  maxSpeed: 480,
  reverseSpeed: 200,
  friction: 0.965,
  steerSpeed: 3.2,
  handbrakeFriction: 0.88,
  bodyWidth: 44,
  bodyHeight: 76,
};

export const WEAPONS = {
  pistol: { name: 'Pistol', damage: 25, fireRate: 0.35, ammo: 50, speed: 1200, range: 600, spread: 0.05 },
  smg: { name: 'SMG', damage: 15, fireRate: 0.1, ammo: 150, speed: 1400, range: 700, spread: 0.12 },
  shotgun: { name: 'Shotgun', damage: 80, fireRate: 0.7, ammo: 30, speed: 1000, range: 450, spread: 0.25, pellets: 5 },
};

export const MISSIONS = [
  { id: 1, title: 'Taxi Rush', desc: 'Deliver the VIP passenger across town before time runs out.', reward: 1000 },
  { id: 2, title: 'Grand Theft Auto', desc: 'Steal the target sports car from downtown and park it in the garage.', reward: 2500 },
  { id: 3, title: 'Getaway Heat', desc: 'Evade the police and lose 3 wanted stars in 60 seconds.', reward: 2000 },
  { id: 4, title: 'Neon Speedway', desc: 'Race through all 10 checkpoints across the city circuit.', reward: 1500 },
  { id: 5, title: 'Rampage', desc: 'Cause chaos and destroy 10 vehicles within the time limit.', reward: 3000 },
  { id: 6, title: 'VIP Escort', desc: 'Drive the VIP safely to the extraction zone while fending off rivals.', reward: 4000 },
];

export const PALETTE = {
  sky: '#0f172a',
  water: '#1e3a8a',
  grass: '#14532d',
  road: '#334155',
  roadLine: '#cbd5e1',
  sidewalk: '#64748b',
  buildingBase: '#475569',
  buildingDark: '#1e293b',
  windowLit: '#fef08a',
  windowDark: '#334155',
  playerCar: '#ef4444',
  policeCar: '#2563eb',
  trafficCar: '#eab308',
  pedestrian: '#f8fafc',
  hudBg: 'rgba(15, 23, 42, 0.85)',
  hudText: '#f8fafc',
  accent: '#38bdf8',
};

export const FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif';
