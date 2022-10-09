import Matter from "matter-js";
import { Rectangle } from "pixi.js";
import { Renderer } from "./Renderer.js";
import { ShapeFactory } from "./shapes/ShapeFactory";

export class Engine {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.engine = Matter.Engine.create();
    this.renderer = new Renderer(this.canvas, this.engine, 800, 600);

    this.canvas.addEventListener("click", (e) => {
      const circle = ShapeFactory.createCircle(
        this.renderer.mouse.x,
        this.renderer.mouse.y,
        20
      );
      Matter.World.add(this.engine.world, [circle]);
    });

    Matter.Engine.run(this.engine);
  }

  init() {
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

    this.update();
  }

  update() {
    for (let body of this.engine.world.bodies) {
      if (body.position.y > this.renderer.height) {
        Matter.World.remove(this.engine.world, [body]);
      }
    }

    Matter.Engine.update(this.engine);
    this.renderer.update();

    setTimeout(() => this.update(), 1000 / 60);
  }
}
