import { Box } from './box.js';

class Octree {
  constructor(bounds, capacity) {
    this.bounds = bounds;
    this.capacity = capacity;
    this.points = [];
    this.children = null;
  }

  subdivide() {
    const x = this.bounds.x;
    const y = this.bounds.y;
    const z = this.bounds.z;
    const w = this.bounds.width / 2;
    const h = this.bounds.height / 2;
    const d = this.bounds.depth / 2;

    this.children = [
      new Octree(new Box(x, y, z, w, h, d), this.capacity),
      new Octree(new Box(x + w, y, z, w, h, d), this.capacity),
      new Octree(new Box(x, y + h, z, w, h, d), this.capacity),
      new Octree(new Box(x + w, y + h, z, w, h, d), this.capacity),
      new Octree(new Box(x, y, z + d, w, h, d), this.capacity),
      new Octree(new Box(x + w, y, z + d, w, h, d), this.capacity),
      new Octree(new Box(x, y + h, z + d, w, h, d), this.capacity),
      new Octree(new Box(x + w, y + h, z + d, w, h, d), this.capacity),
    ];
  }

  insert(point) {
    if (!this.bounds.contains(point.position)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.children) {
      this.subdivide();
    }

    for (const child of this.children) {
      if (child.insert(point)) {
        return true;
      }
    }

    return false;
  }

  query(range, found = []) {
    if (!this.bounds.intersects(range)) {
      return found;
    }

    for (const point of this.points) {
      if (range.contains(point.position)) {
        found.push(point);
      }
    }
    
    if (this.children) {
      for (const child of this.children) {
        child.query(range, found);
      }
    }
    
    return found;
  }
}
export { Octree }