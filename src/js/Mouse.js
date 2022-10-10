export class Mouse {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.isDown = false;

    window.addEventListener("mousedown", (e) => {
      this.isDown = true;
    });
    window.addEventListener("mouseup", (e) => {
      this.isDown = false;
    });
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
