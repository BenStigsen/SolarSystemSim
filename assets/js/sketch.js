const WIDTH   = window.innerWidth - 50;
const HEIGHT  = window.innerHeight - 50;
const CENTER  = new Point(WIDTH / 2, HEIGHT / 2);
const SCALE   = 1_496_000;

// Function to handle setup
function setup()
{ 
  // Center canvas
  createCanvas(WIDTH, HEIGHT)
    .position((windowWidth - WIDTH) / 2, (windowHeight - HEIGHT) / 2);

  // Set semi-minor axis <b> for each planet
  for (let i = 0; i < planets.length; i++)
  {
    let planet = planets[i];
    planet.b = getSemiMinorAxis(planets[i]);
    planet.focus = getFocusPoint(planets[i]);
    planet.angle = 0.0;
    planet.x = planet.a;
    planet.y = 0;
  }

  console.log(earth.focus);
}

// Function to handle logic
function update(dt)
{
  for (let i = 0; i < planets.length; i++)
  {
    let planet = planets[i];
    let angle = planet.angle;
    let a = planet.a;
    let e = planet.e;
    let focus = planet.focus;

    angle += 0.001 * dt;

    let r = (a * (1 - (e * e))) / (1 + e * Math.cos(angle));
    let x = r * cos(angle) + focus;
    let y = r * sin(angle);

    let area = getTriangleArea(-focus, 0, planet.x, planet.y, x, y);

    planet.x = x;
    planet.y = y;
    planet.angle = angle;
  }
  // Update position

}

// Function to handle drawing
function draw()
{
  // Handle logic
  update(deltaTime);

  // Clear canvas and reset colors
  clear();
  background(220);
  fill("#FFFFFF");

  // Draw the planets
  for (let i = 0; i < planets.length; i++)
  {
    let planet = planets[i];
    fill(planet.color);
    circle(CENTER.x + planet.x, CENTER.y + planet.y, planet.r);
    noFill();
    ellipse(CENTER.x, CENTER.y, planet.a * 2, planet.b * 2)
  }

  // Sun
  fill(sun.color);
  circle(CENTER.x - (sun.r / 2), CENTER.y, sun.r);
}
