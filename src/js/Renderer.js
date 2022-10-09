import * as PIXI from "pixi.js";

export class Renderer {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.app = new PIXI.Application({
      view: canvas,
      width: width,
      height: height,
      backgroundColor: 0x000000,
      antialias: true,
      resolution: 1,
    });
  }
}
