import * as PIXI from "pixi.js";
import { Mouse } from "./Mouse";
import { Camera } from "./Camera";
import spritesheet_bird_json from "@/spritesheets/bird/bird.json" assert { type: "json" };

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
      antialias: false,
      resolution: 1,
    });
    this.camera = new Camera(width, height);
    this.app.stage.addChild(this.camera.container);

    const text = new PIXI.Text(`Mouse: ${this.mouse.x}, ${this.mouse.y}`, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0x000000,
      align: "center",
    });
    text.x = 10;
    text.y = 10;
    this.camera.container.addChild(text);
    this.text = text;
  }

  async loadSpriteSheets() {
    this.bird_spritesheet = new PIXI.Spritesheet(
      PIXI.BaseTexture.from(spritesheet_bird_json.meta.image, {
        scaleMode: PIXI.SCALE_MODES.NEAREST,
      }),
      spritesheet_bird_json
    );
    await this.bird_spritesheet.parse();
  }

  async init() {
    await this.loadSpriteSheets();
  }

  update() {
    this.mouse.setPosition(
      this.app.renderer.plugins.interaction.mouse.global.x,
      this.app.renderer.plugins.interaction.mouse.global.y
    );

    const numBodies = this.matterEngine.world.bodies.length;
    const numRednererBodies = this.camera.container.children.length;
    this.text.text = `Mouse: ${this.mouse.x}, ${this.mouse.y} - Bodies: ${numBodies} | ${numRednererBodies}`;

    const bodyMap = {};
    for (let body of this.matterEngine.world.bodies) {
      let graphics = this.camera.container.children.find(
        (x) => x.id == body.id
      );
      if (!graphics) {
        if (!body.shape) break;
        let graphics = undefined;

        switch (body.shape) {
          case "rectangle":
            graphics = new PIXI.Graphics();
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
            graphics = new PIXI.Graphics();
            graphics.id = body.id;
            graphics.color = body.color;
            graphics.beginFill(body.color);
            graphics.drawCircle(0, 0, body.radius);
            graphics.endFill();
            graphics.position = body.position;
            graphics.rotation = body.angle;
            graphics.pivot = { x: 0, y: 0 };
            break;
          case "bird":
            graphics = this.createBirdRenderable(
              body.x,
              body.y,
              body.width,
              body.height,
              "fly"
            );
            graphics.id = body.id;
            break;
        }

        graphics.fromMatterJs = true;
        this.camera.container.addChild(graphics);
        bodyMap[body.id] = true;
      } else {
        if (body.shape == "bird") {
          graphics = this.handleBirdRender(body, graphics);
        }
        graphics.x = body.position.x;
        graphics.y = body.position.y;
        graphics.rotation = body.angle;
        bodyMap[body.id] = true;
      }
    }

    for (let child of this.camera.container.children) {
      if (child.fromMatterJs && !bodyMap[child.id]) {
        this.camera.container.removeChild(child);
      }
    }

    this.app.renderer.render(this.app.stage);
  }

  handleBirdRender(body, graphics) {
    if (!body.alive && graphics.animation != "dead") {
      graphics.destroy();
      this.camera.container.removeChild(graphics);
      graphics = this.createBirdRenderable(
        body.x,
        body.y,
        body.width,
        body.height,
        "dead"
      );
      graphics.id = body.id;
      graphics.fromMatterJs = true;
      this.camera.container.addChild(graphics);
    }
    return graphics;
  }

  createBirdRenderable(x, y, width, height, animation) {
    const container = new PIXI.Container();
    container.width = width;
    container.height = height;
    container.position = { x: x, y: y };
    container.animation = animation;

    // const box = new PIXI.Graphics();
    // box.beginFill(0x000000);
    // box.drawRect(0, 0, width, height);
    // box.endFill();
    // box.position = { x: 0, y: 0 };
    // box.pivot = { x: width / 2, y: height / 2 };
    // box.alpha = 0.2;
    // container.addChild(box);

    const anim = new PIXI.AnimatedSprite(
      this.bird_spritesheet.animations[animation]
    );
    anim.position = { x: 0, y: 0 };
    anim.pivot = { x: 8, y: 10 };
    anim.scale = { x: 4, y: 4 };
    anim.antialias = false;
    anim.animationSpeed = 0.2;
    anim.loop = true;
    anim.play();
    container.addChild(anim);

    return container;
  }
}
