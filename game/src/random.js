// Vice Coast: deterministic RNG
/**
 * Seeded Pseudo-Random Number Generator (Mulberry32).
 * Provides reproducible random numbers for game logic and procedural generation.
 */
export class Random {
  constructor(seed = 1337) {
    this.seed = (seed >>> 0) || 1;
  }

  next() {
    let hash = (this.seed += 0x6d2b79f5);
    hash = Math.imul(hash ^ (hash >>> 15), hash | 1);
    hash ^= hash + Math.imul(hash ^ (hash >>> 7), hash | 61);
    return ((hash ^ (hash >>> 14)) >>> 0) / 4294967296;
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
