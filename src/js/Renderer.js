import * as PIXI from "pixi.js";
import { Mouse } from "./Mouse";

export class Renderer {
  constructor(canvas, matterEngine, width, height) {
    this.mouse = new Mouse();
    this.matterEngine = matterEngine;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.app = new PIXI.Application({
      view: canvas,
      width: width,
      height: height,
      backgroundColor: 0xffffff,
      antialias: true,
      resolution: 1,
    });

    const text = new PIXI.Text(`Mouse: ${this.mouse.x}, ${this.mouse.y}`, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0x000000,
      align: "center",
    });
    text.x = 10;
    text.y = 10;
    this.app.stage.addChild(text);
    this.text = text;
  }

  update() {
    this.mouse.setPosition(
      this.app.renderer.plugins.interaction.mouse.global.x,
      this.app.renderer.plugins.interaction.mouse.global.y
    );

    this.text.text = `Mouse: ${this.mouse.x}, ${this.mouse.y}`;

    for (let body of this.matterEngine.world.bodies) {
      var sprite = this.app.stage.children.find((x) => x.id == body.id);
      if (!sprite) {
        if (!body.shape) break;
        switch (body.shape) {
          case "rectangle":
            sprite = new PIXI.Graphics();
            sprite.id = body.id;
            sprite.color = body.color;
            sprite.beginFill(body.color);
            sprite.drawRect(0, 0, body.width, body.height);
            sprite.endFill();
            sprite.position = body.position;
            sprite.pivot = { x: body.width / 2, y: body.height / 2 };
            this.app.stage.addChild(sprite);
            break;
          case "circle":
            sprite = new PIXI.Graphics();
            sprite.id = body.id;
            sprite.color = body.color;
            sprite.beginFill(body.color);
            sprite.drawCircle(0, 0, body.radius);
            sprite.endFill();
            sprite.position = body.position;
            sprite.pivot = { x: 0, y: 0 };
            this.app.stage.addChild(sprite);
            break;
        }
      } else {
        sprite.x = body.position.x;
        sprite.y = body.position.y;
        sprite.rotation = body.angle;
      }
    }

    this.app.renderer.render(this.app.stage);
  }
}
