import Matter from "matter-js";

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
}
