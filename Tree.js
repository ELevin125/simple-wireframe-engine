class Tree {
    constructor (x, y, z, maxClicks = 3) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.maxClicks = maxClicks;
        this._clicks = 0;
    }

    isStanding() {
        return this._clicks < this.maxClicks  ;
    }

    chop() {
        this._clicks++;
    }
}