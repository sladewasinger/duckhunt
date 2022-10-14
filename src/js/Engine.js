import Matter from "matter-js";
import { Rectangle } from "pixi.js";
import { Renderer } from "./Renderer.js";
import { ShapeFactory } from "./shapes/ShapeFactory";

export class Engine {
  constructor() {
    this.paused = false;
    this.canvas = document.getElementById("gameCanvas");
    this.engine = Matter.Engine.create();
    this.renderer = new Renderer(this.canvas, this.engine, 800, 600);

    window.addEventListener("blur", () => {
      this.paused = true;
    });
    window.addEventListener("focus", () => {
      this.paused = false;
    });
    this.canvas.addEventListener("click", (e) => {
      // const circle = ShapeFactory.createCircle(
      //   this.renderer.mouse.x,
      //   this.renderer.mouse.y,
      //   20
      // );
      // Matter.World.add(this.engine.world, [circle]);
    });
  }

  async init() {
    await this.renderer.init();

    this.createGround();
    this.birds = [];

    for (let i = 0; i < 20; i++) {
      let x = -Math.random() * this.renderer.width;
      let targetPosX = Math.random() * 100 - 50 + this.renderer.width;
      if (Math.random() < 0.5) {
        x = Math.random() * this.renderer.width * 0.8 + this.renderer.width;
        targetPosX -= this.renderer.width;
      }
      let y = Math.random() * this.renderer.height * 0.8;
      const bird = ShapeFactory.createBird(x, y);
      bird.targetPos = {
        x: targetPosX,
        y: Math.random() * 300,
      };
      Matter.World.add(this.engine.world, [bird]);
      this.birds.push(bird);
    }

    this.lastUpdatedTime = Date.now();
    this.update();
  }

  createGround() {
    this.ground = ShapeFactory.createRectangle(
      this.renderer.width / 2,
      this.renderer.height - 25,
      this.renderer.width,
      50,
      {
        id: "ground",
        isStatic: true,
        color: 0x444444,
      }
    );

    Matter.World.add(this.engine.world, [this.ground]);
  }

  update() {
    if (this.paused) {
      this.lastUpdatedTime = Date.now();
      requestAnimationFrame(() => this.update());
      return;
    }

    // Cleanup bodies that fall to their death:
    for (let body of this.engine.world.bodies) {
      if (body.position.y > this.renderer.height * 4) {
        Matter.World.remove(this.engine.world, [body]);
      }
    }

    // move bird to targetPos
    for (let bird of this.birds.filter((x) => x.alive)) {
      const targetPos = {
        x: bird.targetPos.x,
        y: bird.targetPos.y,
      };
      const distance = Matter.Vector.magnitude(
        Matter.Vector.sub(targetPos, bird.position)
      );
      const force = Matter.Vector.mult(
        Matter.Vector.normalise(Matter.Vector.sub(targetPos, bird.position)),
        3
      );
      Matter.Body.setVelocity(bird, force);

      if (distance < 100) {
        bird.targetPos = {
          x: Math.random() * this.renderer.width,
          y: Math.random() * this.renderer.height * 0.65,
        };
      }
    }

    const elapsed = Date.now() - this.lastUpdatedTime;
    this.lastUpdatedTime = Date.now();
    Matter.Engine.update(this.engine, elapsed);
    this.renderer.update();

    window.requestAnimationFrame(() => this.update());
  }
}
