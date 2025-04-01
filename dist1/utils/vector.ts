import { XYZ } from "../Types";

/** Clase para operaciones matemáticas con vectores. */
export default class Vector {
  x: number;
  y: number;
  z: number;

  constructor(
    a?: number[] | Record<"x" | "y" | "z", number> | number | Vector,
    b?: number,
    c?: number
  ) {
    if (Array.isArray(a)) {
      // Si se pasa un arreglo, se usan sus elementos
      this.x = a[0] ?? 0;
      this.y = a[1] ?? 0;
      this.z = a[2] ?? 0;
    } else if (
      typeof a === "object" &&
      a !== null &&
      "x" in a &&
      "y" in a &&
      "z" in a
    ) {
      // Si se pasa un objeto (incluyendo otro Vector), se extraen sus propiedades
      this.x = a.x ?? 0;
      this.y = a.y ?? 0;
      this.z = a.z ?? 0;
    } else {
      // Caso en el que se pasan números
      this.x = typeof a === "number" ? a : 0;
      this.y = typeof b === "number" ? b : 0;
      this.z = typeof c === "number" ? c : 0;
    }
  }

  // Métodos de instancia

  /** Retorna el negativo de este vector. */
  negative(): Vector {
    return new Vector(-this.x, -this.y, -this.z);
  }

  /** Suma un vector o número a este vector y retorna un nuevo vector. */
  add(v: Vector | number): Vector {
    if (v instanceof Vector) {
      return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    } else {
      return new Vector(this.x + v, this.y + v, this.z + v);
    }
  }

  /** Resta un vector o número a este vector y retorna un nuevo vector. */
  subtract(v: Vector | number): Vector {
    if (v instanceof Vector) {
      return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    } else {
      return new Vector(this.x - v, this.y - v, this.z - v);
    }
  }

  /** Multiplica este vector por un vector o número y retorna un nuevo vector. */
  multiply(v: Vector | number): Vector {
    if (v instanceof Vector) {
      return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
    } else {
      return new Vector(this.x * v, this.y * v, this.z * v);
    }
  }

  /** Divide este vector por un vector o número y retorna un nuevo vector. */
  divide(v: Vector | number): Vector {
    if (v instanceof Vector) {
      return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
    } else {
      return new Vector(this.x / v, this.y / v, this.z / v);
    }
  }

  /** Comprueba si el vector recibido es igual a este vector. */
  equals(v: Vector): boolean {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }

  /** Retorna el producto punto entre este vector y otro vector. */
  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /** Retorna el producto vectorial entre este vector y otro vector. */
  cross(v: Vector): Vector {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  /** Retorna la longitud (módulo) del vector. */
  length(): number {
    return Math.sqrt(this.dot(this));
  }

  /**
   * Retorna la distancia entre este vector y otro.
   * @param v Vector destino.
   * @param d Dimensión (2 o 3). Por defecto es 3.
   */
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

  /**
   * Interpola linealmente entre este vector y otro.
   * @param v Vector destino.
   * @param fraction Fracción de interpolación.
   */
  lerp(v: Vector, fraction: number): Vector {
    return v.subtract(this).multiply(fraction).add(this);
  }

  /** Retorna el vector unitario (normalizado) de este vector. */
  unit(): Vector {
    return this.divide(this.length());
  }

  /** Retorna el valor mínimo entre las componentes del vector. */
  min(): number {
    return Math.min(this.x, this.y, this.z);
  }

  /** Retorna el valor máximo entre las componentes del vector. */
  max(): number {
    return Math.max(this.x, this.y, this.z);
  }

  /** Convierte el vector a ángulos (theta y phi). */
  toAngles(): { theta: number; phi: number } {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length()),
    };
  }

  /** Retorna el ángulo entre este vector y otro vector. */
  angleTo(a: Vector): number {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  }

  /**
   * Retorna la representación del vector en un arreglo.
   * @param n Cantidad de elementos a retornar (por defecto 3).
   */
  toArray(n: number = 3): number[] {
    return [this.x, this.y, this.z].slice(0, n);
  }

  /** Clona el vector y retorna un nuevo objeto Vector. */
  clone(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  /**
   * Inicializa este vector con valores explícitos.
   * @param x Valor en X.
   * @param y Valor en Y.
   * @param z Valor en Z.
   */
  init(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  // Métodos estáticos

  static negative(a: Vector, b?: Vector): Vector {
    if (!b) b = new Vector();
    b.x = -a.x;
    b.y = -a.y;
    b.z = -a.z;
    return b;
  }

  static add(a: Vector, b: Vector | number, c?: Vector): Vector {
    if (!c) c = new Vector();
    if (b instanceof Vector) {
      c.x = a.x + b.x;
      c.y = a.y + b.y;
      c.z = a.z + b.z;
    } else {
      c.x = a.x + b;
      c.y = a.y + b;
      c.z = a.z + b;
    }
    return c;
  }

  static subtract(a: Vector, b: Vector | number, c?: Vector): Vector {
    if (!c) c = new Vector();
    if (b instanceof Vector) {
      c.x = a.x - b.x;
      c.y = a.y - b.y;
      c.z = a.z - b.z;
    } else {
      c.x = a.x - b;
      c.y = a.y - b;
      c.z = a.z - b;
    }
    return c;
  }

  static multiply(a: Vector, b: Vector | number, c?: Vector): Vector {
    if (!c) c = new Vector();
    if (b instanceof Vector) {
      c.x = a.x * b.x;
      c.y = a.y * b.y;
      c.z = a.z * b.z;
    } else {
      c.x = a.x * b;
      c.y = a.y * b;
      c.z = a.z * b;
    }
    return c;
  }

  static divide(a: Vector, b: Vector | number, c?: Vector): Vector {
    if (!c) c = new Vector();
    if (b instanceof Vector) {
      c.x = a.x / b.x;
      c.y = a.y / b.y;
      c.z = a.z / b.z;
    } else {
      c.x = a.x / b;
      c.y = a.y / b;
      c.z = a.z / b;
    }
    return c;
  }

  static cross(a: Vector, b: Vector, c?: Vector): Vector {
    if (!c) c = new Vector();
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
    if (typeof a === "number" && typeof b === "number") {
      return ((b - a) * fraction + a) as T;
    } else if (a instanceof Vector && b instanceof Vector) {
      return b.subtract(a).multiply(fraction).add(a) as T;
    }
    throw new Error("Argumentos inválidos para lerp");
  }

  static fromArray(a: number[] | { x: number; y: number; z: number }): Vector {
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
    return ab.angleTo(bc);
  }

  static distance(a: Vector, b: Vector, d: 2 | 3 = 3): number {
    if (d === 2) {
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    } else {
      return Math.sqrt(
        Math.pow(a.x - b.x, 2) +
          Math.pow(a.y - b.y, 2) +
          Math.pow(a.z - b.z, 2)
      );
    }
  }

  static toDegrees(a: number): number {
    return a * (180 / Math.PI);
  }

  static normalizeAngle(radians: number): number {
    const TWO_PI = Math.PI * 2;
    let angle = radians % TWO_PI;
    angle =
      angle > Math.PI ? angle - TWO_PI : angle < -Math.PI ? TWO_PI + angle : angle;
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
    const qc = c.subtract(a);
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
    a: number[] | { x: number; y: number; z: number },
    b: number[] | { x: number; y: number; z: number },
    c: number[] | { x: number; y: number; z: number }
  ): number {
    const vecA = Array.isArray(a) ? new Vector(a) : new Vector(a);
    const vecB = Array.isArray(b) ? new Vector(b) : new Vector(b);
    const vecC = Array.isArray(c) ? new Vector(c) : new Vector(c);
    const v1 = vecA.subtract(vecB);
    const v2 = vecC.subtract(vecB);
    const dotProducts = v1.unit().dot(v2.unit());
    const angle = Math.acos(dotProducts);
    return Vector.normalizeRadians(angle);
  }
}
