export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  scale(scalar) {
    const v1 = new Vector(this.x, this.y);
    v1.x *= scalar;
    v1.y *= scalar;
    return v1;
  }

  subtract(v2) {
    const v1 = new Vector(this.x, this.y);
    v1.x -= v2.x;
    v1.y -= v2.y;
    return v1;
  }

  normalize() {
    const length = Vector.length(this);
    return new Vector(this.x / length, this.y / length);
  }

  add(v2) {
    const v1 = new Vector(this.x, this.y);
    v1.x += v2.x;
    v1.y += v2.y;
    return v1;
  }

  static subtract(v1, v2) {
    return v1.subtract(v2);
  }

  static add(v1, v2) {
    const v3 = new Vector(v1.x, v1.y);
    v3.x += v2.x;
    v3.y += v2.y;
    return v3;
  }

  static between(v1, v2) {
    return new Vector(v2.x - v1.x, v2.y - v1.y);
  }

  static fromAngle(angle) {
    return new Vector(Math.cos(angle), Math.sin(angle));
  }

  static fromPoints(p1, p2) {
    return new Vector(p2.x - p1.x, p2.y - p1.y);
  }

  static fromObject(obj) {
    return new Vector(obj.x, obj.y);
  }

  static normalize(vector) {
    const length = Vector.length(vector);
    return new Vector(vector.x / length, vector.y / length);
  }

  static length(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  }

  static magnitude(vector) {
    return length(vector);
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  static cross(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
  }
}
