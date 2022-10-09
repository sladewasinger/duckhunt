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

    const numBodies = this.matterEngine.world.bodies.length;
    this.text.text = `Mouse: ${this.mouse.x}, ${this.mouse.y} - Bodies: ${numBodies}`;

    const bodyMap = {};
    for (let body of this.matterEngine.world.bodies) {
      let graphics = this.app.stage.children.find((x) => x.id == body.id);
      if (!graphics) {
        if (!body.shape) break;
        graphics = new PIXI.Graphics();

        switch (body.shape) {
          case "rectangle":
            graphics.id = body.id;
            graphics.color = body.color;
            graphics.beginFill(body.color);
            graphics.drawRect(0, 0, body.width, body.height);
            graphics.endFill();
            graphics.position = body.position;
            graphics.rotation = body.angle;
            graphics.pivot = { x: body.width / 2, y: body.height / 2 };
            break;
          case "circle":
            graphics.id = body.id;
            graphics.color = body.color;
            graphics.beginFill(body.color);
            graphics.drawCircle(0, 0, body.radius);
            graphics.endFill();
            graphics.position = body.position;
            graphics.rotation = body.angle;
            graphics.pivot = { x: 0, y: 0 };
            break;
        }

        graphics.fromMatterJs = true;
        this.app.stage.addChild(graphics);
        bodyMap[body.id] = true;
      } else {
        graphics.x = body.position.x;
        graphics.y = body.position.y;
        graphics.rotation = body.angle;
        bodyMap[body.id] = true;
      }
    }

    for (let child of this.app.stage.children) {
      if (child.fromMatterJs && !bodyMap[child.id]) {
        this.app.stage.removeChild(child);
      }
    }

    this.app.renderer.render(this.app.stage);
  }
}
