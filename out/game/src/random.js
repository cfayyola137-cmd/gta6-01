// Seeded Pseudo-Random Number Generator (Mulberry32) - Rewritten
export class Random {
  constructor(seed = 1337) {
    this.seed = (seed >>> 0) || 1;
  }

  next() {
    let t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  range(min, max) {
    return min + this.next() * (max - min);
  }

  int(min, max) {
    return Math.floor(this.range(min, max + 1));
  }

  choice(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[this.int(0, arr.length - 1)];
  }
}

export function createRandom(seed = 1) {
  return new Random(seed);
}
