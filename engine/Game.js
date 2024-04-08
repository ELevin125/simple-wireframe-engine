class Game extends Renderer {
    constructor(camera) {
        super(camera);
        // Store all trees in the world that can be interacted with
        this._trees = [];
        // How close the camera needs to be to tree to be able to chop it
        this._reach = 400;
        this._camera = camera;
    }

    _drawTree(x, y, z) {
        let height = 600;
        let offset = -80;
    
        this.drawPrism(createVector(x, y + offset, z), 
                       createVector(100, height / 3, 100));
                  
        this.drawPrism(createVector(x - 100, y + offset - 400, z), 
                       createVector(300, height / 3, 100));
        this.drawPrism(createVector(x, y - 400 + offset, z - 100), 
                       createVector(100, height / 3, 300));
    
        this.drawPrism(createVector(x - 200, y - 200 + offset, z - 200), 
                       createVector(500, height / 3, 500));
    }
    
    // 2D not true 3D
    _drawAxe() {
        push();
        // move axe down to show that the click was registered
        if (mouseIsPressed)
            translate(0, 100);
    
        line(width - 100, height, width - 100, height - 290);
        line(width - 150, height, width - 150, height - 320);
        line(width - 50, height, width - 50, height - 290);
    
        line(width - 100, height - 290, width - 50, height - 290);
        line(width - 100, height - 290, width - 150, height - 320);
        line(width - 100, height - 320, width - 150, height - 320);
        line(width - 100, height - 320, width - 50, height - 290);
        
        line(width - 250, height - 290, width - 150, height - 220);
        line(width - 250, height - 290, width - 250, height - 420);
        line(width - 250, height - 420, width - 200, height - 420);
        line(width - 250, height - 420, width - 150, height - 320);
        line(width - 200, height - 420, width - 100, height - 320);
    
        pop();
    }

    update() {
        this._updateCamPos();
        this._draw();
    }

    _draw() {
        this._trees.forEach(t => {
            if (t.isStanding())
                this._drawTree(t.x, t.y, t.z);
        })
    
        this._drawAxe();
    }

    _updateCamPos() {        
        if (keyIsDown(87)) {
            this._camera.move("FORWARD");
        } 
        else if (keyIsDown(83)) {
            this._camera.move("BACKWARD");
        } 
        else if (keyIsDown(65)) {
            this._camera.rotate(-1);
        } 
        else if (keyIsDown(68)) {
            this._camera.rotate(1);
        }
        else if (keyIsDown(32)) {
            this._camera.rotate(1);
        }
    }

    attemptChop() {
        // Trees within reach are destroyed when clicking with the mouse
        for (let t of this._trees) {
            if (dist(this._camera.x, this._camera.z, t.x, t.z) < this._reach && t.isStanding()) {
                t.chop();
                break;
            }
        }
    }

    addTree(x, y, z) {
        this._trees.push(new Tree(x, y, z));
    }
}