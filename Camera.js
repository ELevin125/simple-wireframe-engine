class Camera {
    constructor(x, y, z, speed = 3, rotSpeed = 0.03) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotY = 0;

        this._speed = speed;
        this._rotSpeed = rotSpeed;
    }

    // Move forward or backwards relative to current rotation
    move(direction) {
        if (direction === "FORWARD") {
            this.x += Math.sin(this.rotY) * this._speed;
            this.z += Math.cos(this.rotY) * this._speed;
        } else if (direction === "BACKWARD") {
            this.x -= Math.sin(this.rotY) * this._speed;
            this.z -= Math.cos(this.rotY) * this._speed;
        }
    }

    rotate(direction) {
        this.rotY += direction * this._rotSpeed;
    }
}