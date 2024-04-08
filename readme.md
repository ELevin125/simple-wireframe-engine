# Simple Wireframe Engine
![image](https://github.com/ELevin125/simple-wireframe-engine/assets/123626350/c3769d51-695f-4cfb-a478-27c20fa08128)

This project is a simple wireframe engine with a lumberjack demo. The code utilizes a simple wireframe engine to render the environment and trees in a 3D space. It employs basic geometric shapes to represent objects such as trees and the axe. The camera movement and rotation are implemented to simulate a first-person perspective.

## Controls

- **W**: Move forward
- **A**: Rotate camera left
- **S**: Move backward
- **D**: Rotate camera right
- **Mouse Button**: Chop down trees (trees take 3 hits to be chopped down)

## Code Structure

- `setup()`: Standard for P5.js. Initializes the canvas and creates tree objects.
- `draw()`: Standard for P5.js. Draws the environment and updates game elements.
- `mousePressed()`: Handles tree chopping when the mouse button is pressed.

- `Game` Class: Manages game logic, including tree interactions and camera movement.
- `Camera` Class: Controls camera position and rotation.
- `Renderer` Class: Provides rendering functions for drawing geometric shapes.
- `Tree` Class: Represents tree objects and their properties.

## Acknowledgments
This project was written in JS using [P5.js](https://p5js.org/), a JavaScript library for creative coding and visualization.
