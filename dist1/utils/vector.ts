import { XYZ } from "../Types";
/** Vector Math class. */
export default class Vector {
  x: number;
  y: number;
  z: number;

  constructor(a?: number | number[] | Vector | Record<"x" | "y" | "z", number>, b?: number, c?: number) {
    if (Array.isArray(a)) {
      this.x = a[0] ?? 0;
      this.y = a[1] ?? 0;
      this.z = a[2] ?? 0;
      return;
    }
    
    if (a !== null && a !== undefined && typeof a === "object") {
      this.x = a.x ?? 0;
      this.y = a.y ?? 0;
      this.z = a.z ?? 0;
      return;
    }
    
    this.x = a ?? 0;
    this.y = b ?? 0;
    this.z = c ?? 0;
  }

  /**
   * Returns the negative of this vector.
   */
  negative(): Vector {
    return new Vector(-this.x, -this.y, -this.z);
  }

  /**
   * Add a vector or number to this vector.
   * @param {Vector | number} v: Vector or number to add
   * @returns {Vector} New vector
   */
  add(v: Vector | number): Vector {
    if (v instanceof Vector)
      return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    else
      return new Vector(this.x + v, this.y + v, this.z + v);
  }

  /**
   * Substracts a vector or number from this vector.
   * @param {Vector | number} v: Vector or number to subtract
   * @returns {Vector} New vector
   */
  subtract(v: Vector | number): Vector {
    if (v instanceof Vector)
      return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    else
      return new Vector(this.x - v, this.y - v, this.z - v);
  }

  /**
   * Multiplies a vector or a number to a vector.
   * @param {Vector | number} v: Vector or number to multiply
   * @returns {Vector} New vector
   */
  multiply(v: Vector | number): Vector {
    if (v instanceof Vector)
      return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
    else
      return new Vector(this.x * v, this.y * v, this.z * v);
  }

  /**
   * Divide this vector by a vector or a number.
   * @param {Vector | number} v: Vector or number to divide
   * @returns {Vector} New vector
   */
  divide(v: Vector | number): Vector {
    if (v instanceof Vector)
      return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
    else
      return new Vector(this.x / v, this.y / v, this.z / v);
  }

  /**
   * Check if the given vector is equal to this vector.
   * @param {Vector} v: Vector to compare
   * @returns {boolean} True if equal
   */
  equals(v: Vector): boolean {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  }

  /**
   * Returns the dot product of this vector and another vector.
   * @param {Vector} v: Vector to dot
   * @returns {number} Dot product
   */
  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /**
   * Cross product of two vectors.
   * @param {Vector} v: Vector to cross
   * @returns {Vector} New vector
   */
  cross(v: Vector): Vector {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  /**
   * Get the length of the Vector
   * @returns {number} Length
   */
  length(): number {
    return Math.sqrt(this.dot(this));
  }

  /**
   * Find the distance between this and another vector.
   * @param {Vector} v: Vector to find distance to
   * @param {2 | 3} d: 2D or 3D distance
   * @returns {number} Distance
   */
  distance(v: Vector, d: 2 | 3 = 3): number {
    //2D distance
    if (d === 2)
      return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    //3D distance
    else
      return Math.sqrt(
        Math.pow(this.x - v.x, 2) + 
        Math.pow(this.y - v.y, 2) + 
        Math.pow(this.z - v.z, 2)
      );
  }

  /**
   * Lerp between this vector and another vector.
   * @param {Vector} v: Vector to lerp to
   * @param {number} fraction: Fraction to lerp
   * @returns {Vector} New vector
   */
  lerp(v: Vector, fraction: number): Vector {
    return v.subtract(this).multiply(fraction).add(this);
  }

  /**
   * Returns the unit vector of this vector.
   * @returns {Vector} Unit vector
   */
  unit(): Vector {
    return this.divide(this.length());
  }

  min(): number {
    return Math.min(Math.min(this.x, this.y), this.z);
  }

  max(): number {
    return Math.max(Math.max(this.x, this.y), this.z);
  }

  /**
   * To Angles
   * @returns {{ theta: number, phi: number }}
   */
  toAngles(): { theta: number; phi: number } {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length()),
    };
  }

  angleTo(a: Vector): number {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  }

  /**
   * Array representation of the vector.
   * @param {number} n: Array length
   * @returns {number[]} Array
   * @example
   * new Vector(1, 2, 3).toArray(); // [1, 2, 3]
   */
  toArray(n: number): number[] {
    return [this.x, this.y, this.z].slice(0, n || 3);
  }

  /**
   * Clone the vector.
   * @returns {Vector} New vector
   */
  clone(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  /**
   * Init this Vector with explicit values
   * @param {number} x: X value
   * @param {number} y: Y value
   * @param {number} z: Z value
   */
  init(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  // Static methods //
  static negative(a: Vector, b: Vector = new Vector()): Vector {
    b.x = -a.x;
    b.y = -a.y;
    b.z = -a.z;
    return b;
  }

  static add(a: Vector, b: Vector | number, c: Vector = new Vector()): Vector {
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

  static subtract(a: Vector, b: Vector | number, c: Vector = new Vector()): Vector {
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

  static multiply(a: Vector, b: Vector | number, c: Vector = new Vector()): Vector {
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

  static divide(a: Vector, b: Vector | number, c: Vector = new Vector()): Vector {
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

  static cross(a: Vector, b: Vector, c: Vector = new Vector()): Vector {
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

  /**
   * Create new vector from angles
   * @param {number} theta: Theta angle
   * @param {number} phi: Phi angle
   * @returns {Vector} New vector
   */
  static fromAngles(theta: number, phi: number): Vector {
    return new Vector(
      Math.cos(theta) * Math.cos(phi),
      Math.sin(phi),
      Math.sin(theta) * Math.cos(phi)
    );
  }

  static randomDirection(): Vector {
    return Vector.fromAngles(
      Math.random() * Math.PI * 2,
      Math.asin(Math.random() * 2 - 1)
    );
  }

  static min(a: Vector, b: Vector): Vector {
    return new Vector(
      Math.min(a.x, b.x),
      Math.min(a.y, b.y),
      Math.min(a.z, b.z)
    );
  }

  static max(a: Vector, b: Vector): Vector {
    return new Vector(
      Math.max(a.x, b.x),
      Math.max(a.y, b.y),
      Math.max(a.z, b.z)
    );
  }

  /**
   * Lerp between two vectors
   * @param {Vector} a: Vector a
   * @param {Vector} b: Vector b
   * @param {number} fraction: Fraction
   */
  static lerp<T extends number | Vector>(a: T, b: T, fraction: number): T {
    if (b instanceof Vector && a instanceof Vector) {
      return b.subtract(a).multiply(fraction).add(a) as T;
    } else if (typeof a === 'number' && typeof b === 'number') {
      return ((b - a) * fraction + a) as T;
    }
    throw new Error("Invalid parameters for lerp");
  }

  /**
   * Create a new vector from an Array
   * @param {number[] | XYZ} a: Array or XYZ object
   * @returns {Vector} New vector
   */
  static fromArray(a: number[] | XYZ): Vector {
    if (Array.isArray(a)) {
      return new Vector(a[0], a[1], a[2]);
    }
    return new Vector(a.x, a.y, a.z);
  }

  /**
   * Angle between two vectors
   * @param {Vector} a: Vector a
   * @param {Vector} b: Vector b
   * @returns {number} Angle
   */
  static angleBetween(a: Vector, b: Vector): number {
    return a.angleTo(b);
  }

  /**
   * Angle between two vertices
   * @param {Vector} a: First vertex
   * @param {Vector} b: Second vertex (center point)
   * @param {Vector} c: Third vertex
   * @returns {number} Angle
   */
  static angleBetweenVertices(a: Vector, b: Vector, c: Vector): number {
    const ab = a.subtract(b);
    const bc = c.subtract(b);
    return ab.angleTo(bc);
  }

  static distance(a: Vector, b: Vector, d: 2 | 3): number {
    if (d === 2)
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    else
      return Math.sqrt(
        Math.pow(a.x - b.x, 2) + 
        Math.pow(a.y - b.y, 2) + 
        Math.pow(a.z - b.z, 2)
      );
  }

  static toDegrees(a: number): number {
    return a * (180 / Math.PI);
  }

  static normalizeAngle(radians: number): number {
    const TWO_PI = Math.PI * 2;
    let angle = radians % TWO_PI;
    angle = angle > Math.PI ? angle - TWO_PI : angle < -Math.PI ? TWO_PI + angle : angle;
    //returns normalized values to -1,1
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
    //returns normalized values to -1,1
    return radians / Math.PI;
  }

  static find2DAngle(cx: number, cy: number, ex: number, ey: number): number {
    const dy = ey - cy;
    const dx = ex - cx;
    return Math.atan2(dy, dx);
  }

  /**
   * Find 3D rotation between two vectors
   * @param {Vector | XYZ} a: First vector
   * @param {Vector | XYZ} b: Second vector
   * @param {boolean} normalize: Normalize the result
   * @returns {Vector} Rotation vector
   */
  static findRotation(a: Vector | XYZ, b: Vector | XYZ, normalize: boolean = true): Vector {
    const vecA = a instanceof Vector ? a : new Vector(a);
    const vecB = b instanceof Vector ? b : new Vector(b);
    
    if (normalize) {
      return new Vector(
        Vector.normalizeRadians(Vector.find2DAngle(vecA.z, vecA.x, vecB.z, vecB.x)),
        Vector.normalizeRadians(Vector.find2DAngle(vecA.z, vecA.y, vecB.z, vecB.y)),
        Vector.normalizeRadians(Vector.find2DAngle(vecA.x, vecA.y, vecB.x, vecB.y))
      );
    } else {
      return new Vector(
        Vector.find2DAngle(vecA.z, vecA.x, vecB.z, vecB.x),
        Vector.find2DAngle(vecA.z, vecA.y, vecB.z, vecB.y),
        Vector.find2DAngle(vecA.x, vecA.y, vecB.x, vecB.y)
      );
    }
  }

  /**
   * Find roll pitch yaw of plane formed by 3 points
   * @param {Vector | XYZ} a: First vector
   * @param {Vector | XYZ} b: Second vector
   * @param {Vector} [c]: Optional third vector
   * @returns {Vector} Roll pitch yaw vector
   */
  static rollPitchYaw(a: Vector | XYZ, b: Vector | XYZ, c?: Vector): Vector {
    const vecA = a instanceof Vector ? a : new Vector(a);
    const vecB = b instanceof Vector ? b : new Vector(b);
    
    if (!c) {
      return new Vector(
        Vector.normalizeAngle(Vector.find2DAngle(vecA.z, vecA.y, vecB.z, vecB.y)),
        Vector.normalizeAngle(Vector.find2DAngle(vecA.z, vecA.x, vecB.z, vecB.x)),
        Vector.normalizeAngle(Vector.find2DAngle(vecA.x, vecA.y, vecB.x, vecB.y))
      );
    }
    
    const qb = vecB.subtract(vecA);
    const qc = c.subtract(vecA);
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

  /**
   * Find angle between 3D Coordinates
   * @param {Vector | Record<"x" | "y" | "z", number>} a: First point
   * @param {Vector | Record<"x" | "y" | "z", number>} b: Second point (central point)
   * @param {Vector | Record<"x" | "y" | "z", number>} c: Third point
   * @returns {number} Normalized angle
   */
  static angleBetween3DCoords(
    a: Vector | Record<"x" | "y" | "z", number>,
    b: Vector | Record<"x" | "y" | "z", number>,
    c: Vector | Record<"x" | "y" | "z", number>
  ): number {
    const vecA = a instanceof Vector ? a : new Vector(a);
    const vecB = b instanceof Vector ? b : new Vector(b);
    const vecC = c instanceof Vector ? c : new Vector(c);
    
    // Calculate vector between points 1 and 2
    const v1 = vecA.subtract(vecB);
    // Calculate vector between points 2 and 3
    const v2 = vecC.subtract(vecB);
    
    // The dot product of vectors v1 & v2 is a function of the cosine of the
    // angle between them (it's scaled by the product of their magnitudes).
    const v1norm = v1.unit();
    const v2norm = v2.unit();
    
    // Calculate the dot products of vectors v1 and v2
    const dotProducts = v1norm.dot(v2norm);
    
    // Extract the angle from the dot products
    const angle = Math.acos(Math.max(-1, Math.min(1, dotProducts)));
    
    // return single angle Normalized to 1
    return Vector.normalizeRadians(angle);
  }
}