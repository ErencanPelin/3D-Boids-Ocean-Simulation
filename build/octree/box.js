class Box {
    constructor(x, y, z, width, height, depth) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    contains(point) {
        return (
            point.x >= this.x &&
            point.x <= this.x + this.width &&
            point.y >= this.y &&
            point.y <= this.y + this.height &&
            point.z >= this.z &&
            point.z <= this.z + this.depth
        );
    }

    intersects(other) {
        return !(
            other.x > this.x + this.width ||
            other.x + other.width < this.x ||
            other.y > this.y + this.height ||
            other.y + other.height < this.y ||
            other.z > this.z + this.depth ||
            other.z + other.depth < this.z
        );
    }
}

export { Box }