import Matter from "matter-js";
import { Vector } from "../math/Vector";

export class ShapeFactory {
  static createRectangle(x, y, width, height, options) {
    const rectangle = Matter.Bodies.rectangle(x, y, width, height, options);
    rectangle.width = width;
    rectangle.height = height;
    rectangle.shape = "rectangle";
    return rectangle;
  }

  static createCircle(x, y, radius, options) {
    const circle = Matter.Bodies.circle(x, y, radius, options);
    circle.radius = radius;
    circle.shape = "circle";
    return circle;
  }

  static createBird(x, y) {
    const width = 16 * 4;
    const height = 16 * 3;
    const bird = Matter.Bodies.rectangle(x, y, width, height, {
      shape: "bird",
      width: width,
      height: height,
      inertia: Infinity,
      alive: true,
      collisionFilter: {
        mask: 0x0001,
        category: 0x0002,
      },
    });
    return bird;
  }

  static createBlood(splatterForceOrigin, x, y, amount) {
    const blood = [];
    for (let i = 0; i < amount; i++) {
      const splatterDist = 30;
      const width = 1;
      const height = 1;
      const bloodParticle = Matter.Bodies.rectangle(
        x + Math.random() * splatterDist - splatterDist / 2,
        y + Math.random() * splatterDist - splatterDist / 2,
        width,
        height,
        {
          shape: "blood",
          width: width,
          height: height,
          frictionAir: 0,
          color: 0xff0000,
          collisionFilter: {
            mask: 0x0001,
            category: 0x0002,
          },
        }
      );
      // bloodParticle.force = {
      //   x: (Math.random() - 0.5) * 0.2,
      //   y: (Math.random() - 0.5) * 0.2,
      // };
      // Matter.Body.applyForce(
      //   bloodParticle,
      //   { x: x, y: y },
      //   {
      //     x: (Math.random() - 0.5) * 0.2,
      //     y: (Math.random() - 0.5) * 0.2,
      //   }
      // );
      let force = Vector.fromObject(bloodParticle.position)
        .subtract(Vector.fromObject(splatterForceOrigin))
        .normalize()
        .scale(2);

      console.log(force);
      Matter.Body.setVelocity(bloodParticle, {
        x: force.x + (Math.random() - 0.5) * 2,
        y: force.y + (Math.random() - 0.5) * 2,
      });
      blood.push(bloodParticle);
    }
    return blood;
  }
}
