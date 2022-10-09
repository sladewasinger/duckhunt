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
}
