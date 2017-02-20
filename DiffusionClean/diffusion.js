console.log('THIS HAS BEEN BROWSERIFIED!');

module.exports = {
  canvas: document.querySelector("canvas"),
  ctx: canvas.getContext("2d"),

  gridWidth: canvas.width,
  gridHeight: canvas.height,
  
  grid: [],
  next: [],
  
  init: function(){
    console.log("In Init");
    for(let i = 0; i < 200; i++)
    {
      grid[i] = [];
      next[i] =[];
      for (let j = 0; j < 200; j++)
      {
        grid[i][j] = {a: 0, b: 0};
        next[i][j] = {a: 0, b: 0};
      }
    }
  },

  calculate: function(){
    for(let i = 0; i < 200; i++)
    {
      for (let j = 0; j < 200; j++)
      {
        let cell = grid[i][j];

        let a = cell.a;
        let b = cell.b;
        let da = 1;
        let db = 0.5;
        let f = 0.055;
        let nextA = a + (
          da * laplace(i, j) -
          a * b * b +
          f * (1 - a)
        )
      }
    }
  },

  laplace: function(x, y){
    //current is -1
    //adjacents are 0.2
    //diagonals are 0.05
  }
};