let CAMERA = {
    x: 400,
    y: 0,
    z: 0,
    rotY: 0,

    _speed: 3,
    _rotSpeed: 0.03,
    move: function(direction) {
        if (direction === "FORWARD") {
            this.x += Math.sin(this.rotY) * this._speed;
            this.z += Math.cos(this.rotY) * this._speed;
        }
        else if (direction === "BACKWARD") {
            this.x -= Math.sin(this.rotY) * this._speed;
            this.z -= Math.cos(this.rotY) * this._speed;
        }
    },
    rotate: function(direction) {
        this.rotY += direction * this._rotSpeed;
    }
};

// store all trees in the world that can be interacted with
let TREES = []

function Tree(x, y, z) {
    return {
        x: x,
        y: y,
        z: z,
        clicks: 0,
        maxClicks: 3
    }
}

function setup() {
    createCanvas(1200, 800);

    strokeWeight(2)
    randomSeed(56);
    stroke(255)

    TREES.push(new Tree(350 - 600, 0, 1000))
    TREES.push(new Tree(350, 0, 2000))
    TREES.push(new Tree(350 + 600, 0, 1000))
}

function draw() {
    background(20);
    // draw sky
    push();
    noStroke();
    fill(200)
    rect(0, 0, width, height / 2);
    pop();

    updateCamPos();

    TREES.forEach(t => {
        if (t.clicks < t.maxClicks)
            drawTree(t.x, t.y, t.z);
    })

    drawAxe();
}

function drawTree(x, y, z) {
    let height = 600
    let offset = -80

	drawPrism(createVector(x, y + offset, z), 
              createVector(100, height / 3, 100));
              
	drawPrism(createVector(x - 100, y + offset - 400, z), 
              createVector(300, height / 3, 100));
	drawPrism(createVector(x, y - 400 + offset, z - 100), 
              createVector(100, height / 3, 300));

    drawPrism(createVector(x - 200, y - 200 + offset, z - 200), 
              createVector(500, height / 3, 500));
}

// 2D not true 3D
function drawAxe() {
    push()
    if (mouseIsPressed)
        translate(0, 100)

    line(width - 100, height, width - 100, height - 290)
    line(width - 150, height, width - 150, height - 320)
    line(width - 50, height, width - 50, height - 290)

    line(width - 100, height - 290, width - 50, height - 290)
    line(width - 100, height - 290, width - 150, height - 320)
    line(width - 100, height - 320, width - 150, height - 320)
    line(width - 100, height - 320, width - 50, height - 290)
    
    line(width - 250, height - 290, width - 150, height - 220)
    line(width - 250, height - 290, width - 250, height - 420)
    line(width - 250, height - 420, width - 200, height - 420)
    line(width - 250, height - 420, width - 150, height - 320)
    line(width - 200, height - 420, width - 100, height - 320)

    pop()
}


function toScreenSpace(pos) {
    let centerOfScreenX = width / 2
    let centerOfScreenY = height / 2

    let xDif = pos.x - CAMERA.x
    let yDif = pos.y - CAMERA.y
    let zDif = pos.z - CAMERA.z

    let translatedX = xDif * Math.cos(-CAMERA.rotY) + zDif * Math.sin(-CAMERA.rotY);
    let translatedZ = zDif * Math.cos(-CAMERA.rotY) - xDif * Math.sin(-CAMERA.rotY);

    // behind CAMERA, so don't draw
    if (translatedZ < 0) {
        return -1;
    }

    let screenDistance = 400; // FOV

    let screenX = (translatedX / translatedZ) * screenDistance + centerOfScreenX;
    let screenY = (yDif / translatedZ) * screenDistance + centerOfScreenY;

    return {x: screenX, y: screenY}
}

function draw3DLine(pos_0, pos_1) {
    let screen_0 = toScreenSpace(pos_0)
    let screen_1 = toScreenSpace(pos_1)
    if (screen_0 == -1 || screen_1 == -1)
        return;

    line(screen_0.x, screen_0.y, screen_1.x, screen_1.y);
}

function drawPrism(position, scale) {
    // Draw the bottom face of the prism
    drawPlain(position, createVector(scale.x, 0, scale.z));

    // Draw the top face of the prism
    drawPlain(createVector(position.x, position.y + scale.y, position.z), createVector(scale.x, 0, scale.z));

    // Draw the four vertical edges of the prism
    // using drawPlain again would double draw horizontal edges
    draw3DLine(position, createVector(position.x, position.y + scale.y, position.z));
    draw3DLine(createVector(position.x + scale.x, position.y, position.z), createVector(position.x + scale.x, position.y + scale.y, position.z));
    draw3DLine(createVector(position.x + scale.x, position.y, position.z + scale.z), createVector(position.x + scale.x, position.y + scale.y, position.z + scale.z));
    draw3DLine(createVector(position.x, position.y, position.z + scale.z), createVector(position.x, position.y + scale.y, position.z + scale.z));
}


function drawPlain(position, scale) {
    let bottomLeft = createVector(position.x, position.y, position.z);
    let bottomRight = createVector(position.x + scale.x, position.y, position.z);
    let topLeft = createVector(position.x, position.y, position.z + scale.z);
    let topRight = createVector(position.x + scale.x, position.y, position.z + scale.z);

    // Draw lines connecting the four corners to form the floor
    draw3DLine(bottomLeft, bottomRight);
    draw3DLine(bottomRight, topRight);
    draw3DLine(topRight, topLeft);
    draw3DLine(topLeft, bottomLeft);
}



function updateCamPos() {        
    if (keyIsDown(87)) {
        CAMERA.move("FORWARD");
    } 
    else if (keyIsDown(83)) {
        CAMERA.move("BACKWARD");
    } 
    else if (keyIsDown(65)) {
        CAMERA.rotate(-1);
    } 
    else if (keyIsDown(68)) {
        CAMERA.rotate(1);
    }
    else if (keyIsDown(32)) {
        CAMERA.rotate(1);
    }
}

function mousePressed() {
    // Trees within reach are destroyed when clicking with the mouse
    const reach = 400;
    for (let t of TREES) {
        if (dist(CAMERA.x, CAMERA.z, t.x, t.z) < reach && t.clicks < t.maxClicks) {
            t.clicks++;
            break;
        }
    }
}