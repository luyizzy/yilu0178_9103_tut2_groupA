// Splitcircle function, using the drawing apple's color
//Using constructor() method to created the splitcircle function
//https://p5js.org/reference/p5/class/
//This Coding function based on Wk11 Perlin noise tutorial
//https://canvas.sydney.edu.au/courses/64347/pages/week-11-tutorial-2?module_item_id=2585765 

class SplitCircle
{
    constructor(nx, ny, nRadius, angle, greenRatio)
    {
        this.nx = nx;                       // Normalized coordinates of the center x of the circle
        this.ny = ny;                       // Normalized coordinates of the center y of the circle
        this.nRadius = nRadius;             // Circle normalization radius
        this.angle = angle;                 // The initial rotation of the circle
        this.greenRatio = greenRatio;       // Part of green in circle
        this.rotatedSpeed = random(1, 4);   // Autorotation rate
        this.activatedRotation = false;     // The sign indicating whether to enable rotation

        this.curXpos = 0;                   // Current x-coordinate
        this.curYpos = 0;                   // Current y-coordinate

        this.life = random(100, 200);       // Life cycle (in frames)
        this.age = this.life;               // current life point
        this.lifeSpeed = random(0.5, 1);    // The speed of life's passage
        this.isDead = false;                // Has life come to an end

        this.seed = random(1000);           // Noise seed
        this.speed = random(0.1, 1);        // Movement speed
        this.noiseScale = 0.025;             // Noise scaling coefficient
    }

    // update
    update()
    {
        if (!this.activatedRotation) return;
        this.angle += this.rotatedSpeed;
        angleMode(RADIANS);
        // Calculate the position in the canvas
        let xpos = width * this.nx;
        let ypos = height * this.ny;
        
        // Update the position using Perlin Noise
        let noiseAngle = noise(xpos * this.noiseScale, ypos * this.noiseScale, this.seed) * TWO_PI * 2;
        // Calculate the velocities in the x and y directions
        // The reference coding from wk11 tutorial Part 5 object
        //https://canvas.sydney.edu.au/courses/64347/pages/week-11-tutorial-2?module_item_id=2585765 
        let velocityX = this.speed * cos(noiseAngle);
        let velocityY = this.speed * sin(noiseAngle);
        // Update poisition
        this.nx += velocityX * 0.0015;
        this.ny += velocityY * 0.0015;
        
        // reduce circles life expectancy
        this.age -= this.lifeSpeed;

        // Determine whether to end the life of circle
        if (this.age < 0)
        {
            this.isDead = true;
        }
    }

    // Display circles
    display()
    {
        if (this.isDead) return;

        // Calculate the position in the canvas
        let xpos = width * this.nx;
        let ypos = height * this.ny;
        let radius = width * this.nRadius;
        let r = map(this.age, this.life, 0, radius, 0);
        drawSplitCircle(xpos, ypos, r, this.angle, this.greenRatio);
    }

    isLifeDead()
    {
        return this.isDead;
    }
}