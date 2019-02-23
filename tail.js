"use strict";
window.addEventListener("DOMContentLoaded", init );

const globals = {};

function init() {
    const ctx = document.querySelector("#canvas").getContext("2d");
    globals.ctx = ctx;

    registerMouseMovement();
}

function registerMouseMovement() {
    document.querySelector("#canvas").addEventListener("mousemove", mouseMoved);
}

function mouseMoved( event ) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    console.log("mouse moved");

    drawRectangle(mouseX, mouseY);

}

function drawRectangle(x,y) {
    globals.ctx.strokeStyle = "lawngreen";
    globals.ctx.strokeRect(x,y,10,10);

    globals.ctx.stroke()
}
