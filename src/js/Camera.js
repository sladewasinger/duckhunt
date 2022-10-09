import * as PIXI from "pixi.js";

export class Camera {
  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.container = new PIXI.Container();
    this.container.width = width;
    this.container.height = height;
    this.container.position = { x: 0, y: 0 };

    // const mask = new PIXI.Graphics();
    // mask.beginFill(0x000000);
    // mask.drawRect(0, 0, width, height);
    // mask.endFill();
    // this.container.mask = mask;
    // this.mask = mask;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.container.position = { x: x, y: y };
    //this.mask.position = { x: x, y: y };
  }
}
