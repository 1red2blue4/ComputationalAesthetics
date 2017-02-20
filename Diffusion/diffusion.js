console.log('THIS HAS BEEN BROWSERIFIED!');

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

//module.exports = {
let app = {
  

  gridWidth: canvas.width,
  gridHeight: canvas.height,
  
  grid: [],
  next: [],
  
  init: function(){
    console.log("In Init");
    for(let i = 0; i < 200; i++)
    {
      app.grid[i] = [];
      app.next[i] =[];
      for (let j = 0; j < 200; j++)
      {
        app.grid[i][j] = {a: 0, b: 0};
        app.next[i][j] = {a: 0, b: 0};
      }
    }
    console.log(app.grid);
  },

  calculate: function(){
    for(let i = 0; i < 200; i++)
    {
      for (let j = 0; j < 200; j++)
      {
        let cell = app.grid[i][j];

        let a = cell.a;
        let b = cell.b;
        let da = 1;
        let db = 0.5;
        let dt = 1.0/60.0;
        let f = 0.055;
        let k = 0.062;
        let nextA = a + (
          da*laplace(i, j, a) -
          a*b*b +
          f*(1 - a)
        )*dt;
        let nextB = b + (
          db*laplace(i, j, b) +
          a*b*b -
          (k + f)*b
        )*dt;
      }
    }
  },

  laplace: function(x, y, chemical){
    let sumConstant = 0;
    //current is -1
    sumConstant += -app.grid[x][y].chemical;
    //adjacents are 0.2
    if (x < gridWidth)
    {
      sumConstant 
    }
    //diagonals are 0.05
  }
};

window.onload = app.init;