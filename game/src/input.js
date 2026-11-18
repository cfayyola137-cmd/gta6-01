// Input handling for keyboard and mouse (driving controls, shooting, menu actions).
export class Input {
  constructor(canvas) {
    this.keys = new Map();
    this.mouse = { x: 0, y: 0, worldX: 0, worldY: 0, down: false, clicked: false, rightClicked: false };
    this.canvas = canvas;

    window.addEventListener('keydown', (e) => {
      this.keys.set(e.code, true);
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys.set(e.code, false);
    });

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.mouse.down = true;
        this.mouse.clicked = true;
      } else if (e.button === 2) {
        this.mouse.rightClicked = true;
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

  consumeClick() {
    const val = this.mouse.clicked;
    this.mouse.clicked = false;
    return val;
  }

  consumeRightClick() {
    const val = this.mouse.rightClicked;
    this.mouse.rightClicked = false;
    return val;
  }

  updateWorldMouse(camera) {
    this.mouse.worldX = this.mouse.x + camera.x;
    this.mouse.worldY = this.mouse.y + camera.y;
  }
}
