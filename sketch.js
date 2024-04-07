let GAME;

function setup() {
    createCanvas(1200, 800);
    strokeWeight(2);
    stroke(255);

    GAME = new Game(new Camera(400, 0, 0));

    GAME.addTree(350 - 600, 0, 1000);
    GAME.addTree(350, 0, 2000);
    GAME.addTree(350 + 600, 0, 1000);
}

function draw() {
    background(20);
    // draw sky
    push();
    noStroke();
    fill(200);
    rect(0, 0, width, height / 2);
    pop();

    GAME.update();
}

function mousePressed() {
    GAME.attemptChop();
}