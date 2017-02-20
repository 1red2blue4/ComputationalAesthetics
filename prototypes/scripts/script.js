//"use strict";

let canvas = {};
let ctx = {};

const init = () => {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 1000;

  let shape = function(myX, myY){
    this.x = myX;
    this.y = myY;
    this.status = function(){
      console.log("X: " + this.x);
      console.log("Y: " + this.y);
    };
  };


  let rectangle = function(myX, myY, width, height){
    this.parent = new shape(myX, myY);
    
    this.width = width;
    this.height = height;
    this.draw = function(){
      ctx.save();
      ctx.fillStyle = "rgb(255, 0, 0)";
      ctx.fillRect(this.parent.x, this.parent.y, this.width, this.height);
      ctx.restore();
    };
  };

  let circle = function(myX, myY, radius){
    this.parent = new shape(myX, myY);
    
    this.radius = radius;
    this.draw = function(){
      ctx.save();
      ctx.fillStyle = "rgb(0, 255, 0)";
      ctx.beginPath();
      ctx.arc(this.parent.x, this.parent.y, this.radius, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };
  };
  
  let square = function(myX, myY, sideLength){
    
    this.parent = new rectangle(myX, myY, sideLength, sideLength);

    this.parent.draw = function(){
      ctx.save();
      ctx.fillStyle = "rgb(0, 0, 255)";
      ctx.fillRect(this.parent.x, this.parent.y, this.width, this.height);
      ctx.restore();
    };
  };

  let myShape = new shape(12, 34);
  myShape.status();
  let myRect = new rectangle(150, 60, 100, 75);
  let myCirc = new circle(100, 200, 50);
  let mySquare = new square(250, 200, 85);

  myRect.draw();
  myCirc.draw();
  mySquare.parent.draw();
  
};

window.onload = init;