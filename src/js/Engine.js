import Matter from "matter-js";
import { Renderer } from "./Renderer";

export class Engine {
  constructor() {
    this.engine = Matter.Engine.create();
    this.renderer = new Renderer(
      document.getElementById("gameCanvas"),
      800,
      600
    );

    Matter.Engine.run(this.engine);
  }
}
