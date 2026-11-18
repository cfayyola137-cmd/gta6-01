// Open-world city grid generator, buildings, roads, parks, and water.
import { WORLD, FIELD } from './config.js';
import { Random } from './random.js';

export class World {
  constructor(seed = 1) {
    this.random = new Random(seed);
    this.blocks = [];
    this.buildings = [];
    this.trees = [];
    this.waterBodies = [];
    this.generate();
  }

  generate() {
    const { blockSize, roadWidth, sidewalkWidth, gridCols, gridRows } = WORLD;
    const totalBlockSpace = blockSize + roadWidth;

    // Water border / river on the right/bottom
    this.waterBodies.push({
      x: FIELD.width - 300,
      y: 0,
      width: 300,
      height: FIELD.height,
    });

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const bx = roadWidth + c * totalBlockSpace;
        const by = roadWidth + r * totalBlockSpace;
        const bWidth = blockSize;
        const bHeight = blockSize;

        if (bx + bWidth > FIELD.width - 300) continue; // Keep clear of water

        const block = { x: bx, y: by, width: bWidth, height: bHeight, row: r, col: c };
        this.blocks.push(block);

        // District type
        const isPark = (r === 2 && c === 2) || (r === 7 && c === 6);
        const district = r < 4 ? 'Downtown' : r < 7 ? 'Suburbs' : 'Industrial';

        if (isPark) {
          // Generate park with trees
          for (let t = 0; t < 6; t++) {
            this.trees.push({
              x: bx + 30 + this.random.range(0, bWidth - 60),
              y: by + 30 + this.random.range(0, bHeight - 60),
              radius: this.random.range(14, 24),
            });
          }
        } else {
          // Generate buildings
          const subWidth = bWidth - sidewalkWidth * 2;
          const subHeight = bHeight - sidewalkWidth * 2;
          this.buildings.push({
            x: bx + sidewalkWidth,
            y: by + sidewalkWidth,
            width: subWidth,
            height: subHeight,
            district,
            floors: district === 'Downtown' ? this.random.int(3, 8) : this.random.int(1, 3),
            colorIndex: this.random.int(0, 3),
            hasRoofAccess: this.random.next() > 0.5,
          });
        }
      }
    }
  }

  isRoad(x, y) {
    const { roadWidth, blockSize } = WORLD;
    const total = roadWidth + blockSize;
    const rx = x % total;
    const ry = y % total;
    return rx < roadWidth || ry < roadWidth;
  }

  isWater(x, y) {
    for (const w of this.waterBodies) {
      if (x >= w.x && x <= w.x + w.width && y >= w.y && y <= w.y + w.height) {
        return true;
      }
    }
    return false;
  }
}
