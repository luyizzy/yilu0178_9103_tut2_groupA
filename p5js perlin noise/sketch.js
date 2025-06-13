let circles = [];               // Define all the circles
let circleIndex = 0;            // The index of the currently born circle

let startTime;                  // Define the start time

let colorRed;                   // Red
let colorGreen;                 // Green
let colorYellow;                // Yellow
let colorDarkLine;              // Dark line color
let colorLightLine;             // Light line color

// ***** 常量值 *****
const DESIGN_WIDTH = 1140;                  // Canva width
const DESIGN_HEIGHT = 1700;                 // Canva height
const BORN_FREQUENCY = 10;                  // The frequency of birth (every few frames)
const LINEWEIGHT = 3;                       // The thickness of line segments
const BOLD_LINE_WEIGHT = 5;                 // The thickness value of the thickened line segment
const REFRESH_INTERVAL = 15;                // The time interval for refreshing the canvas (seconds)


function setup()
{
    createCanvas(DESIGN_WIDTH, DESIGN_HEIGHT, P2D);
    colorMode(RGB);
    windowResized();
    initColor();
    initCircles();
    createBackgroundTexture();
    startTime = millis() / 1000;
}

function draw()
{
    // Display background
    image(textureImage, 0, 0, width, height);
    
    // Draw the colored squares below
    drawColoredGrid();

    // Update the effects of all circles
    updateCircles();

    // Detect whether the time point for refreshing has been reached
    // detectRefresh();

    // Check whether all the circles have disappeared
    detectAllCircleDead();
}

// When the window size is changed, the canvas ADAPTS to the window size
function windowResized()
{
    let w, h;
    // Window adaptation
    // When the window width is greater than the height, the height is fully covered
    // Conversely, the width is fully covered
    if (windowWidth > windowHeight * (DESIGN_WIDTH / DESIGN_HEIGHT))
    {
        h = windowHeight;
        w = h * (DESIGN_WIDTH / DESIGN_HEIGHT);
    }
    else
    {
        w = windowWidth;
        h = w / (DESIGN_WIDTH / DESIGN_HEIGHT);
    }
    resizeCanvas(w, h);
}

// Initialize the color values used for drawing
function initColor()
{
    colorRed = color(246, 82, 80);
    colorGreen = color(93, 172, 122);
    colorYellow = color(219, 187, 104);
    colorDarkLine = color(13, 18, 30);
    colorLightLine = color(215,182,103);
}

// Initialize the apples (we using circles to draw the apple)
//The coding from wk11 tutorial part 4
//https://canvas.sydney.edu.au/courses/64347/pages/week-11-tutorial-2?module_item_id=2585765
function initCircles()
{
    circles = [];
    circleIndex = 0;
    circles.push(new SplitCircle(0.349, 0.766, 0.100, 90, 0.5));
    circles.push(new SplitCircle(0.426, 0.768, 0.056, -90, 0.6));
    circles.push(new SplitCircle(0.484, 0.742, 0.090, 0, 0.3));
    circles.push(new SplitCircle(0.564, 0.763, 0.075, 90, 0.4));
    circles.push(new SplitCircle(0.658, 0.772, 0.110, -90, 0.5));
    circles.push(new SplitCircle(0.525, 0.701, 0.062, 180, 0.34));
    circles.push(new SplitCircle(0.509, 0.658, 0.075, 180, 0.5));
    circles.push(new SplitCircle(0.504, 0.576, 0.174, 0, 0.45));
    circles.push(new SplitCircle(0.538, 0.483, 0.121, 180, 0.45));
    circles.push(new SplitCircle(0.566, 0.415, 0.090, 90, 0.55));
    circles.push(new SplitCircle(0.637, 0.408, 0.060, 90, 0.5));
    circles.push(new SplitCircle(0.705, 0.405, 0.083, -90, 0.55));
    circles.push(new SplitCircle(0.496, 0.405, 0.059, -90, 0.55));
    circles.push(new SplitCircle(0.434, 0.409, 0.070, 90, 0.56));
    circles.push(new SplitCircle(0.360, 0.403, 0.077, -90, 0.5));
    circles.push(new SplitCircle(0.285, 0.357, 0.145, 180, 0.46));
    circles.push(new SplitCircle(0.264, 0.280, 0.095, 0, 0.43));
    circles.push(new SplitCircle(0.282, 0.232, 0.056, 185, 0.5));
    circles.push(new SplitCircle(0.732, 0.355, 0.086, 5, 0.4));
    circles.push(new SplitCircle(0.750, 0.302, 0.072, 180, 0.55));
    circles.push(new SplitCircle(0.756, 0.239, 0.123, 0, 0.5));
    circles.push(new SplitCircle(0.750, 0.182, 0.057, 180, 0.6));
    circles.push(new SplitCircle(0.802, 0.171, 0.044, 100, 0.6));
    circles.push(new SplitCircle(0.861, 0.179, 0.087, 280, 0.5));
    circles.push(new SplitCircle(0.926, 0.196, 0.059, 110, 0.55));
    circles.push(new SplitCircle(0.961, 0.166, 0.049, 180, 0.45));
    circles.push(new SplitCircle(0.252, 0.190, 0.074, 270, 0.5));
    circles.push(new SplitCircle(0.185, 0.168, 0.080, 180, 0.5));
    circles.push(new SplitCircle(0.165, 0.108, 0.110, -10, 0.45));
    circles.push(new SplitCircle(0.185, 0.037, 0.106, 180, 0.45));
    circles.push(new SplitCircle(0.525, 0.371, 0.057, 0, 0.5));
    circles.push(new SplitCircle(0.530, 0.323, 0.088, 180, 0.5));
    circles.push(new SplitCircle(0.473, 0.291, 0.064, 270, 0.5));
    circles.push(new SplitCircle(0.414, 0.292, 0.044, 90, 0.55));
    circles.push(new SplitCircle(0.448, 0.259, 0.044, 180, 0.4));
    circles.push(new SplitCircle(0.592, 0.292, 0.059, 90, 0.5));
    circles.push(new SplitCircle(0.624, 0.266, 0.047, 180, 0.55));
}

// Adding the background and texture
function createBackgroundTexture()
{
    textureImage = createGraphics(DESIGN_WIDTH, DESIGN_WIDTH);

    // Define the background color
    textureImage.background(37, 53, 93);

    // THe buttom (green ground) of the tree
    textureImage.stroke(colorDarkLine);
    textureImage.strokeWeight(BOLD_LINE_WEIGHT);
    textureImage.fill(57, 125, 82);
    let middleLen = textureImage.width * 0.75;
    let leftLen = (textureImage.width - middleLen) / 2;
    let rightLen = leftLen;

    let y = textureImage.height * 0.82;
    let rectH = textureImage.width * 0.1;
    //Make sure the sketching always in the middle
    //The coding reference from p5js centre() and rectMode() tutorial
    //https://www.youtube.com/watch?v=F7iRdN50jf8
    textureImage.rectMode(CENTER);
    textureImage.rect(textureImage.width / 2, y, middleLen, rectH);
    textureImage.rect(leftLen / 2, y, leftLen, rectH);
    textureImage.rect(textureImage.width - rightLen / 2, y, rightLen, rectH);
    
    // Define the texture of sketching, we used random lines coding to created
    let numLines = 50000;
    textureImage.strokeWeight(0.5);
    textureImage.stroke(180, 190, 220, 30);
    //The coding reference from Wk 11 tutorial part 1
    //https://canvas.sydney.edu.au/courses/64347/pages/week-11-tutorial-2?module_item_id=2585765
    for (let i = 0; i < numLines; i++)
    {
        let x1 = textureImage.random(textureImage.width);
        let y1 = textureImage.random(textureImage.height);
        let angle = textureImage.random(TWO_PI);
        let len = textureImage.random(10, 30);
        let x2 = x1 + cos(angle) * len;
        let y2 = y1 + sin(angle) * len;
        textureImage.line(x1, y1, x2, y2);
    }
}

// Drawing the colored buttom
function drawColoredGrid()
{
    let gridW = width * 0.10;
    let gridH = height * 0.10;
    let cornerY = height * 0.76;

    //Using p5js rectMode(corner)to sperate the buttom into different square
    rectMode(CORNER);
    strokeWeight(LINEWEIGHT);
    stroke(colorLightLine);
    fill(colorYellow);
    rect(width/2 - gridW*3, cornerY, gridW, gridH);
    fill(colorRed);
    rect(width/2 - gridW*2, cornerY, gridW, gridH);
    fill(colorGreen);
    rect(width/2 - gridW*1, cornerY, gridW, gridH);
    fill(colorYellow);
    rect(width/2 + gridW*0, cornerY, gridW, gridH);
    fill(colorGreen);
    rect(width/2 + gridW*1, cornerY, gridW, gridH);
    fill(colorYellow);
    rect(width/2 + gridW*2, cornerY, gridW, gridH);
    
    // Using angleMode(RADIANS) to darwing the are beyond the buttom 
    angleMode(RADIANS);
    stroke(colorLightLine);
    fill(colorGreen);
    arc(width/2 - gridW*3 + gridW/2, cornerY + gridH, gridW*0.95, gridW*1.1, -PI, 0, OPEN);
    fill(colorYellow);
    arc(width/2 - gridW*2 + gridW/2, cornerY + gridH, gridW*0.95, gridW*0.6, -PI, 0, OPEN);
    fill(colorRed);
    arc(width/2 - gridW*1 + gridW/2, cornerY + gridH, gridW*0.95, gridW*1.2, -PI, 0, OPEN);
    fill(colorRed);
    arc(width/2 + gridW*0 + gridW/2, cornerY + gridH, gridW*0.95, gridW*1.12, -PI, 0, OPEN);
    fill(colorYellow);
    arc(width/2 + gridW*1 + gridW/2, cornerY + gridH, gridW*0.95, gridW*0.3, -PI, 0, OPEN);
    fill(colorGreen);
    arc(width/2 + gridW*2 + gridW/2, cornerY + gridH, gridW*0.95, gridW*0.7, -PI, 0, OPEN);

    stroke(colorDarkLine);
    noFill();
    rect(width/2 - gridW*3, cornerY, gridW * 6, gridH);
}

// Upadte
function updateCircles()
{
    if (frameCount % BORN_FREQUENCY === 0 && circleIndex < circles.length)
    { 
        circleIndex++;
    }
    for (let i = 0; i < circleIndex; i++)
    {
        let circle = circles[i];
        circle.update();
        circle.display();
    }

    if (circleIndex >= circles.length)
    {
        for (let i = 0; i < circleIndex; i++)
        {
            circles[i].activatedRotation = true;
        }
    }
}

// Split the cirles, drawing the color of apple
function drawSplitCircle(cx, cy, size, rotation, redRatio)
{
    angleMode(DEGREES);
    push();
    translate(cx, cy);
    rotate(rotation);
    stroke(colorDarkLine);
    fill(colorGreen);
    circle(0, 0, size);
    fill(colorRed);
    arc(0, 0, size, size, 180 * redRatio, -180 * redRatio, OPEN);
    pop();
}

// Detect whether it's time to refresh the canvas
function detectRefresh()
{
    let currentTime = millis() / 1000;
    if (currentTime - startTime > REFRESH_INTERVAL)
    {
        initCircles();
        startTime = currentTime;
    }
}

// Detect whether the circles disappeared on canvas
function detectAllCircleDead()
{
    let isAllDead = true;
    for (let c of circles)
    {
        if (!c.isLifeDead())
        {
            isAllDead = false;
            break;
        }
    }

    if (isAllDead)
    {
        initCircles();
    }
}