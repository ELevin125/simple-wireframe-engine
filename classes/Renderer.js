class Renderer {
    constructor(camera) {
        this.camera = camera;
    }

    _toScreenSpace(pos) {
        let centerOfScreenX = width / 2
        let centerOfScreenY = height / 2
    
        let xDif = pos.x - this.camera.x
        let yDif = pos.y - this.camera.y
        let zDif = pos.z - this.camera.z
    
        let translatedX = xDif * Math.cos(-this.camera.rotY) + zDif * Math.sin(-this.camera.rotY);
        let translatedZ = zDif * Math.cos(-this.camera.rotY) - xDif * Math.sin(-this.camera.rotY);
    
        // behind camera, so don't draw
        if (translatedZ < 0) {
            return -1;
        } 
    
        let screenDistance = 400; // FOV
    
        let screenX = (translatedX / translatedZ) * screenDistance + centerOfScreenX;
        let screenY = (yDif / translatedZ) * screenDistance + centerOfScreenY;
    
        return {x: screenX, y: screenY}
    }
    
    draw3DLine(pos_0, pos_1) {
        let screen_0 = this._toScreenSpace(pos_0)
        let screen_1 = this._toScreenSpace(pos_1)
        if (screen_0 == -1 || screen_1 == -1)
            return;
    
        line(screen_0.x, screen_0.y, screen_1.x, screen_1.y);
    }
    
    drawPrism(position, scale) {
        // Draw the bottom face of the prism
        this.drawPlain(position, 
                       createVector(scale.x, 0, scale.z));
    
        // Draw the top face of the prism
        this.drawPlain(createVector(position.x, position.y + scale.y, position.z), 
                       createVector(scale.x, 0, scale.z));
    
        // Draw the four vertical edges of the prism
        // Using this.drawPlain again would double draw horizontal edges
        this.draw3DLine(position, 
                        createVector(position.x, position.y + scale.y, position.z));
        this.draw3DLine(createVector(position.x + scale.x, position.y, position.z), 
                        createVector(position.x + scale.x, position.y + scale.y, position.z));
        this.draw3DLine(createVector(position.x + scale.x, position.y, position.z + scale.z), 
                        createVector(position.x + scale.x, position.y + scale.y, position.z + scale.z));
        this.draw3DLine(createVector(position.x, position.y, position.z + scale.z), 
                        createVector(position.x, position.y + scale.y, position.z + scale.z));
    }
    
    
    drawPlain(position, scale) {
        let bottomLeft = createVector(position.x, position.y, position.z);
        let bottomRight = createVector(position.x + scale.x, position.y, position.z);
        let topLeft = createVector(position.x, position.y, position.z + scale.z);
        let topRight = createVector(position.x + scale.x, position.y, position.z + scale.z);
    
        // Draw lines connecting the four corners to form the floor
        this.draw3DLine(bottomLeft, bottomRight);
        this.draw3DLine(bottomRight, topRight);
        this.draw3DLine(topRight, topLeft);
        this.draw3DLine(topLeft, bottomLeft);
    }
}