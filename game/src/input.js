/**
 * Input handling for Neo City Drive.
 * Manages keyboard and mouse interactions, capturing state and actions.
 */
export const ACTION_CONFIRM = 1;
export const ACTION_PAUSE = 2;
export const ACTION_MISSION = 4;
export const ACTION_ENTER = 8;
export const ACTION_FIRE = 16;

export class Input {
  constructor(canvas) {
    this.keys = new Map();
    this.mouse = { x: 0, y: 0, worldX: 0, worldY: 0, down: false, clicked: false };
    this.canvas = canvas;
    this.actions = 0;

    window.addEventListener('keydown', (e) => {
      this.keys.set(e.code, true);
      if (['Space', 'KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === 'Space' || e.code === 'Enter') this.actions |= ACTION_CONFIRM;
      if (e.code === 'KeyP') this.actions |= ACTION_PAUSE;
      if (e.code === 'KeyM') this.actions |= ACTION_MISSION;
      if (e.code === 'KeyF') this.actions |= ACTION_ENTER;
    });

    window.addEventListener('keyup', (e) => {
      this.keys.set(e.code, false);
    });

    canvas.addEventListener('mousemove', (e) => {
      const canvasRect = canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - canvasRect.left;
      this.mouse.y = e.clientY - canvasRect.top;
    });

    canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.mouse.down = true;
        this.mouse.clicked = true;
        this.actions |= ACTION_FIRE;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouse.down = false;
    });

    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  isDown(code) {
    return !!this.keys.get(code);
  }

  takeActions() {
    const val = this.actions;
    this.actions = 0;
    return val;
  }

  consumeClick() {
    const val = this.mouse.clicked;
    this.mouse.clicked = false;
    return val;
  }

  direction() {
    let dir = 0;
    if (this.isDown('ArrowLeft') || this.isDown('KeyA')) dir = -1;
    else if (this.isDown('ArrowRight') || this.isDown('KeyD')) dir = 1;
    return dir;
  }

  updateWorldMouse(camera) {
    this.mouse.worldX = this.mouse.x + camera.x;
    this.mouse.worldY = this.mouse.y + camera.y;
  }
}

export function createInput(canvas) {
  return new Input(canvas);
}
