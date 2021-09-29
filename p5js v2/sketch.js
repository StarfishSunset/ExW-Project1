// 2D Noise
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/noise/0.5-2d-noise.html
// https://youtu.be/ikwNrFvnL3g
// https://editor.p5js.org/codingtrain/sketches/2_hBcOBrF

// This example has been updated to use es6 syntax. To learn more about es6 visit: https://thecodingtrain.com/Tutorials/16-javascript-es6

let inc = 0.01;   //map the inc to temp sensor

  
let port;
let connectBtn;
let sendBtn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(10, 10);
  connectBtn.mousePressed(connect);

}

function draw() {

  if (port) {  // the port might not have been opened here
    let input = port.readUntil('\n');
    if (input.length > 0) {
      // textmovers.push(new TextMover(input.trim(), true));
    }
  }

  // for (let i=0; i < textmovers.length; i++) {
  //   textmovers[i].move();
  //   textmovers[i].display();
  // }



  let yoff = 0;
  loadPixels();
  for (let y = 0; y < height; y++) {
    let xoff = 0;
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      // let r = random(255);

      let r = noise(xoff, yoff) * 255;
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;

      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
  // noLoop();
}


function connect() {
  port = new WebSerial('Arduino', 57600);
  connectBtn.hide();
  sendBtn.show();
}

// function send() {
//   let output = 'Hello from the computer';
//   port.write(output);
//   textmovers.push(new TextMover(output, false));
// }