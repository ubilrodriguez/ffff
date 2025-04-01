import { XYZ } from "../Types";

export class Vector {
  x: number;
  y: number;
  z: number;

  constructor(a?: number[] | Record<"x" | "y" | "z", number> | number | Vector, b?: number, c?: number) {
    if (typeof a === "number") {
      this.x = a;
      this.y = b ?? 0;
      this.z = c ?? 0;
    } else if (Array.isArray(a)) {
      this.x = a[0] ?? 0;
      this.y = a[1] ?? 0;
      this.z = a[2] ?? 0;
    } else if (a && typeof a === "object") {
      if ("x" in a && "y" in a && "z" in a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
      } else {
        this.x = 0;
        this.y = 0;
        this.z = 0;
      }
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }
  }

  // Función auxiliar para garantizar que el valor sea un Vector.
  private static ensureVector(v: Vector | Record<"x" | "y" | "z", number>): Vector {
    return v instanceof Vector ? v : new Vector(v);
  }

  // Métodos de instancia
  negative(): Vector {
    return new Vector(-this.x, -this.y, -this.z);
  }

  add(v: Vector | number): Vector {
    if (v instanceof Vector) {
      return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    } else {
      return new Vector(this.x + v, this.y + v, this.z + v);
    }
  }

  subtract(v: Vector | number): Vector {
    if (v instanceof Vector) {
      return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    } else {
      return new Vector(this.x - v, this.y - v, this.z - v);
    }
  }

  multiply(v: Vector | number): Vector {
    if (v instanceof Vector) {
      return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
    } else {
      return new Vector(this.x * v, this.y * v, this.z * v);
    }
  }

  divide(v: Vector | number): Vector {
    if (v instanceof Vector) {
      return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
    } else {
      return new Vector(this.x / v, this.y / v, this.z / v);
    }
  }

  equals(v: Vector): boolean {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }

  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v: Vector): Vector {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  length(): number {
    return Math.sqrt(this.dot(this));
  }

  distance(v: Vector, d: 2 | 3 = 3): number {
    if (d === 2) {
      return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    } else {
      return Math.sqrt(
        Math.pow(this.x - v.x, 2) +
        Math.pow(this.y - v.y, 2) +
        Math.pow(this.z - v.z, 2)
      );
    }
  }

  lerp(v: Vector, fraction: number): Vector {
    return this.add(v.subtract(this).multiply(fraction));
  }

  unit(): Vector {
    return this.divide(this.length());
  }

  min(): number {
    return Math.min(this.x, this.y, this.z);
  }

  max(): number {
    return Math.max(this.x, this.y, this.z);
  }

  toAngles(): { theta: number; phi: number } {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length())
    };
  }

  angleTo(a: Vector): number {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  }

  toArray(n: number): number[] {
    const arr = [this.x, this.y, this.z];
    return n ? arr.slice(0, n) : arr;
  }

  clone(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  init(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  // Métodos estáticos
  static negative(a: Vector, b?: Vector): Vector {
    if (!b) b = new Vector(0, 0, 0);
    b.x = -a.x;
    b.y = -a.y;
    b.z = -a.z;
    return b;
  }

  static add(a: Vector, v: Vector | number, c?: Vector): Vector {
    if (!c) c = new Vector(0, 0, 0);
    if (v instanceof Vector) {
      c.x = a.x + v.x;
      c.y = a.y + v.y;
      c.z = a.z + v.z;
    } else {
      c.x = a.x + v;
      c.y = a.y + v;
      c.z = a.z + v;
    }
    return c;
  }

  static subtract(a: Vector, v: Vector | number, c?: Vector): Vector {
    if (!c) c = new Vector(0, 0, 0);
    if (v instanceof Vector) {
      c.x = a.x - v.x;
      c.y = a.y - v.y;
      c.z = a.z - v.z;
    } else {
      c.x = a.x - v;
      c.y = a.y - v;
      c.z = a.z - v;
    }
    return c;
  }

  static multiply(a: Vector, v: Vector | number, c?: Vector): Vector {
    if (!c) c = new Vector(0, 0, 0);
    if (v instanceof Vector) {
      c.x = a.x * v.x;
      c.y = a.y * v.y;
      c.z = a.z * v.z;
    } else {
      c.x = a.x * v;
      c.y = a.y * v;
      c.z = a.z * v;
    }
    return c;
  }

  static divide(a: Vector, v: Vector | number, c?: Vector): Vector {
    if (!c) c = new Vector(0, 0, 0);
    if (v instanceof Vector) {
      c.x = a.x / v.x;
      c.y = a.y / v.y;
      c.z = a.z / v.z;
    } else {
      c.x = a.x / v;
      c.y = a.y / v;
      c.z = a.z / v;
    }
    return c;
  }

  static cross(a: Vector, b: Vector, c?: Vector): Vector {
    if (!c) c = new Vector(0, 0, 0);
    c.x = a.y * b.z - a.z * b.y;
    c.y = a.z * b.x - a.x * b.z;
    c.z = a.x * b.y - a.y * b.x;
    return c;
  }

  static unit(a: Vector, b: Vector): Vector {
    let length = a.length();
    b.x = a.x / length;
    b.y = a.y / length;
    b.z = a.z / length;
    return b;
  }

  static fromAngles(theta: number, phi: number): Vector {
    return new Vector(
      Math.cos(theta) * Math.cos(phi),
      Math.sin(phi),
      Math.sin(theta) * Math.cos(phi)
    );
  }

  static randomDirection(): Vector {
    return Vector.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
  }

  static min(a: Vector, b: Vector): Vector {
    return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
  }

  static max(a: Vector, b: Vector): Vector {
    return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
  }

  static lerp<T extends number | Vector>(a: T, b: T, fraction: number): T {
    if (a instanceof Vector && b instanceof Vector) {
      return (b.subtract(a).multiply(fraction).add(a)) as T;
    } else if (typeof a === "number" && typeof b === "number") {
      return (((b - a) * fraction + a)) as T;
    }
    throw new Error("Invalid arguments for lerp");
  }

  static fromArray(a: number[] | XYZ): Vector {
    if (Array.isArray(a)) {
      return new Vector(a[0], a[1], a[2]);
    }
    return new Vector(a.x, a.y, a.z);
  }

  static angleBetween(a: Vector, b: Vector): number {
    return a.angleTo(b);
  }

  static angleBetweenVertices(a: Vector, b: Vector, c: Vector): number {
    let ab = a.subtract(b);
    let bc = c.subtract(b);
    // Implementación pendiente; se puede calcular el ángulo con la fórmula del coseno.
    return 0;
  }

  static distance(a: Vector, b: Vector, d: number): number {
    if (d === 2)
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    else
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
  }

  static toDegrees(a: number): number {
    return a * (180 / Math.PI);
  }

  static normalizeAngle(radians: number): number {
    const TWO_PI = Math.PI * 2;
    let angle = radians % TWO_PI;
    angle = angle > Math.PI ? angle - TWO_PI : angle < -Math.PI ? TWO_PI + angle : angle;
    return angle / Math.PI;
  }

  static normalizeRadians(radians: number): number {
    if (radians >= Math.PI / 2) {
      radians -= 2 * Math.PI;
    }
    if (radians <= -Math.PI / 2) {
      radians += 2 * Math.PI;
      radians = Math.PI - radians;
    }
    return radians / Math.PI;
  }

  static find2DAngle(cx: number, cy: number, ex: number, ey: number): number {
    const dy = ey - cy;
    const dx = ex - cx;
    return Math.atan2(dy, dx);
  }

  static findRotation(a: Vector, b: Vector, normalize: boolean = true): Vector {
    if (normalize) {
      return new Vector(
        Vector.normalizeRadians(Vector.find2DAngle(a.z, a.x, b.z, b.x)),
        Vector.normalizeRadians(Vector.find2DAngle(a.z, a.y, b.z, b.y)),
        Vector.normalizeRadians(Vector.find2DAngle(a.x, a.y, b.x, b.y))
      );
    } else {
      return new Vector(
        Vector.find2DAngle(a.z, a.x, b.z, b.x),
        Vector.find2DAngle(a.z, a.y, b.z, b.y),
        Vector.find2DAngle(a.x, a.y, b.x, b.y)
      );
    }
  }

  static rollPitchYaw(a: Vector, b: Vector, c?: Vector): Vector {
    if (!c) {
      return new Vector(
        Vector.normalizeAngle(Vector.find2DAngle(a.z, a.y, b.z, b.y)),
        Vector.normalizeAngle(Vector.find2DAngle(a.z, a.x, b.z, b.x)),
        Vector.normalizeAngle(Vector.find2DAngle(a.x, a.y, b.x, b.y))
      );
    }
    const qb = a.subtract(b);
    const qc = a.subtract(c);
    const n = qb.cross(qc);
    const unitZ = n.unit();
    const unitX = qb.unit();
    const unitY = unitZ.cross(unitX);
    const beta = Math.asin(unitZ.x) || 0;
    const alpha = Math.atan2(-unitZ.y, unitZ.z) || 0;
    const gamma = Math.atan2(-unitY.x, unitX.x) || 0;
    return new Vector(
      Vector.normalizeAngle(alpha),
      Vector.normalizeAngle(beta),
      Vector.normalizeAngle(gamma)
    );
  }

  static angleBetween3DCoords(
    a: Vector | Record<"x" | "y" | "z", number>,
    b: Vector | Record<"x" | "y" | "z", number>,
    c: Vector | Record<"x" | "y" | "z", number>
  ): number {
    const va = Vector.ensureVector(a);
    const vb = Vector.ensureVector(b);
    const vc = Vector.ensureVector(c);

    const v1 = va.subtract(vb);
    const v2 = vc.subtract(vb);
    const v1norm = v1.unit();
    const v2norm = v2.unit();
    const dotProducts = v1norm.dot(v2norm);
    const angle = Math.acos(dotProducts);
    return Vector.normalizeRadians(angle);
  }
}

export default Vector;
