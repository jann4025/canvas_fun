"use strict";
window.addEventListener("DOMContentLoaded", init );

let ctx;
const width = 500;
const height = 500;

const rectangles = [];

function init() {
    ctx = document.querySelector("#canvas").getContext("2d");

    registerMouseMovement();

    prepareCanvas();

    // start animation-loop
    animate();
}

function registerMouseMovement() {
    document.querySelector("#canvas").addEventListener("mousemove", mouseMoved);
}

function prepareCanvas() {
    ctx.canvas.height = height;
    ctx.canvas.width = width;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,width,height)
}

function mouseMoved( event ) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    console.log("mouse moved");

    createRectangleAt(mouseX, mouseY);
}

function createRectangleAt(x,y) {
    // Create a rectangle object at this x,y position
    const rect = Object.create(Rectangle);
    rect.create(x,y);
    
    // add it to the list of all rectangles
    rectangles.push( rect );

    // if more than 20 rectangles exist - remove the first one!
    // Don't do this anymore - let the rectangles remove themselves
 /*   if( rectangles.length > 20 ) {
        rectangles.shift();
    }
    */
}

let last;

function animate() {
    requestAnimationFrame(animate);

    let now = Date.now() / 1000;
    let delta = now - (last || now);
    last = now;

    rectangles.forEach( rect => rect.animate( delta ) );

    // TODO: Maybe only redraw everything, if it has changed?
    drawEverything();
}


function drawEverything() {
    // clear the canvas
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,width,height);

    // draw all the rectangles
    rectangles.forEach( rect => rect.draw() );
}


const Rectangle = {
   x: 10,
   y: 10,
   w: 10,
   h: 10,
   a: 1,
   fadeSpeed: 1,
   
   create( x,y, w=10,h=10) {
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
   },

   // animate this rectangle - fade towards opacity 0, when reached, remove
   animate( delta ) {
     // modify a with fadeSpeed
     this.a -= this.fadeSpeed * delta;

     if( this.a < 0 ) {
         this.a = 0;
         this.remove();
     }
   },

   draw() {
    ctx.strokeStyle = `rgba(0,255,0,${this.a})`;
    ctx.strokeRect(this.x,this.y,this.w,this.h);
   },

   // remove this rectangle from the rectangles array
   remove() {
       const idx = rectangles.indexOf( this );
       rectangles.splice(idx,1);
   }


}
