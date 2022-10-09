export class Mouse {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.isDown = false;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
