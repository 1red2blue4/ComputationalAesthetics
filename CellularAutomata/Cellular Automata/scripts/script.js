"use strict";

let canvas = {};
let ctx = {};


const init = () => {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	
	const gridWidth = canvas.width;
	const gridHeight = canvas.height;
	
	let grid = [];
	let tempGrid = [];
  
    let timer = 0;
  
    let firstRun = true;
  
    let startPercentage = 0.03;
  
    let cellSize = 2;
  
    let red = [];
    let green = [];
    let blue = [];
    let colorMap = [];
    let tempColorMap = [];
	
	for (let y = 0; y < gridHeight; y++)
	{
		grid[y] = [];
        tempGrid[y] = [];
        colorMap[y] = [];
        tempColorMap[y] = [];
        //red[y] = [];
        //green[y] = [];
        //blue[y] = [];
		for (let x = 0; x < gridWidth; x++)
		{
			grid[y][x] = Math.round(Math.random() - 0.5 + startPercentage); 
            tempGrid[y][x] = Math.round(Math.random());
            //red[y][x] = 255;
            //green[y][x] = 160;
            //blue[y][x] = 70;
            colorMap[y][x] = {red: 255, green: 160, blue: 70};
            tempColorMap[y][x] = {red: colorMap[y][x].red, green: colorMap[y][x].green, blue: colorMap[y][x].blue};
		}
	}
	
	let runAutomata = () => {
        //- Any live cell with fewer than two live neighbours dies, as if caused by under-population.
        //- Any live cell with two or three live neighbours lives on to the next generation.
        //- Any live cell with more than three live neighbours dies, as if by over-population.
        //- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      
      
        //calculation loop
		for (let y = 0; y < gridHeight; y++)
		{
			for (let x = 0; x < gridWidth; x++)
			{
              //by default, set this cell's neighbor value to dead
              let top = 0;
              let right = 0;
              let bot = 0;
              let left = 0;
              let topRight = 0;
              let botRight = 0;
              let botLeft = 0;
              let topLeft = 0;
              
              //if not on the top wall...
              if (y !== 0)
              {
                top = grid[y - 1][x];
              }
              //if not on the right wall...
              if (x !== gridWidth - 1)
              {
                right = grid[y][x + 1];
              }
              //if not on the bottom wall...
              if (y !== gridHeight - 1)
              {
                bot = grid[y + 1][x];
              }
              //if not on the left wall...
              if (x !== 0)
              {
                left = grid[y][x - 1];
              }
              //if not in the upper right corner...
              if (y !== 0 && x !== gridWidth - 1)
              {
                topRight = grid[y - 1][x + 1];
              }
              //if not in the bottom right corner...
              if (y !== gridHeight - 1 && x !== gridWidth - 1)
              {
                botRight = grid[y + 1][x + 1];
              }
              //if not in the bottom left corner...
              if (y !== gridHeight - 1 && x !== 0)
              {
                botLeft = grid[y + 1][x - 1];
              }
              //if not in the upper left corner...
              if (y !== 0 && x !== 0)
              {
                topLeft = grid[y - 1][x - 1];
              }
              
              let sum = top + right + bot + left + topRight + botRight + botLeft + topLeft;
              
              runColorMap(sum, x, y);
              
              //use algorithm
              //dying
              if (sum < 2)
              {
                tempGrid[y][x] = 0;
              }
              //living on
              else if ((sum === 2 || sum === 3) && grid[y][x] === 1)
              {
                tempGrid[y][x] = 1;
              }
              //over-population
              else if (sum > 3)
              {
                tempGrid[y][x] = 0;
              }
              //reproducing
              else if (sum === 3 && grid[y][x] === 0)
              {
                tempGrid[y][x] = 1;
              }
              
            }
        }
      
        
      
        
        //swap loop
        let swap = grid;
        grid = tempGrid;
        tempGrid = swap;
        
	};
  
    let runColorMap = (numNeighborsAlive, x, y) => {
      
      //recollect directions
      let top = {red: 125, green: 125, blue: 125};
      let right = {red: 125, green: 125, blue: 125};
      let bot = {red: 125, green: 125, blue: 125};
      let left = {red: 125, green: 125, blue: 125};
      let topRight = {red: 125, green: 125, blue: 125};
      let botRight = {red: 125, green: 125, blue: 125};
      let botLeft = {red: 125, green: 125, blue: 125};
      let topLeft = {red: 125, green: 125, blue: 125};
      let usedDirections = {};
      
      //if not on the top wall...
      if (y !== 0)
      {
        top = colorMap[y - 1][x];
        usedDirections.top = top;
      }
      //if not on the right wall...
      if (x !== gridWidth - 1)
      {
        right = colorMap[y][x + 1];
        usedDirections.right = right;
      }
      //if not on the bottom wall...
      if (y !== gridHeight - 1)
      {
        bot = colorMap[y + 1][x];
        usedDirections.bot = bot;
      }
      //if not on the left wall...
      if (x !== 0)
      {
        left = colorMap[y][x - 1];
        usedDirections.left = left;
      }
      //if not in the upper right corner...
      if (y !== 0 && x !== gridWidth - 1)
      {
        topRight = colorMap[y - 1][x + 1];
        usedDirections.topRight = topRight;
      }
      //if not in the bottom right corner...
      if (y !== gridHeight - 1 && x !== gridWidth - 1)
      {
        botRight = colorMap[y + 1][x + 1];
        usedDirections.botRight = botRight;
      }
      //if not in the bottom left corner...
      if (y !== gridHeight - 1 && x !== 0)
      {
        botLeft = colorMap[y + 1][x - 1];
        usedDirections.botLeft = botLeft;
      }
      //if not in the upper left corner...
      if (y !== 0 && x !== 0)
      {
        topLeft = colorMap[y - 1][x - 1];
        usedDirections.topLeft = topLeft;
      }
      
      let sumRed = 0;
      let sumGreen = 0;
      let sumBlue = 0;
      
      if (usedDirections.top)
      {
        sumRed += usedDirections.top.red;
        sumGreen += usedDirections.top.green;
        sumBlue += usedDirections.top.blue;
      }
      if (usedDirections.right)
      {
        sumRed += usedDirections.right.red;
        sumGreen += usedDirections.right.green;
        sumBlue += usedDirections.right.blue;
      }
      if (usedDirections.bot)
      {
        sumRed += usedDirections.bot.red;
        sumGreen += usedDirections.bot.green;
        sumBlue += usedDirections.bot.blue;
      }
      if (usedDirections.left)
      {
        sumRed += usedDirections.left.red;
        sumGreen += usedDirections.left.green;
        sumBlue += usedDirections.left.blue;
      }
      if (usedDirections.topRight)
      {
        sumRed += usedDirections.topRight.red;
        sumGreen += usedDirections.topRight.green;
        sumBlue += usedDirections.topRight.blue;
      }
      if (usedDirections.botRight)
      {
        sumRed += usedDirections.botRight.red;
        sumGreen += usedDirections.botRight.green;
        sumBlue += usedDirections.botRight.blue;
      }
      if (usedDirections.botLeft)
      {
        sumRed += usedDirections.botLeft.red;
        sumGreen += usedDirections.botLeft.green;
        sumBlue += usedDirections.botLeft.blue;
      }
      if (usedDirections.topLeft)
      {
        sumRed += usedDirections.topLeft.red;
        sumGreen += usedDirections.topLeft.green;
        sumBlue += usedDirections.topLeft.blue;
      }
      
      let avgRed = Math.round(sumRed/numNeighborsAlive);
      let avgGreen = Math.round(sumGreen/numNeighborsAlive);
      let avgBlue = Math.round(sumBlue/numNeighborsAlive);
      
      let changedRed = colorMap[y][x].red + Math.round(Math.random()*4 - 2.0);
      
      //peer pressure
      //if the cells around are a particular color, get closer to that color
      if (avgRed > colorMap[y][x].red)
      {
        //changedRed++;
      }
      else if(avgRed < colorMap[y][x].red)
      {
        //changedRed--;
      }
      if (changedRed > 255)
      {
        changedRed = 255;
      }
      if (changedRed < 0)
      {
        changedRed = 0;
      }
      
      let changedGreen = colorMap[y][x].green + Math.round(Math.random()*3 - 1.5);
      
      if (avgGreen > colorMap[y][x].green)
      {
        //changedGreen++;
      }
      else if(avgGreen < colorMap[y][x].green)
      {
        //changedGreen--;
      }
      if (changedGreen > 255)
      {
        changedGreen = 255;
      }
      if (changedGreen < 0)
      {
        changedGreen = 0;
      }
      
      let changedBlue = colorMap[y][x].blue + Math.round(Math.random()*3 - 1.5);
      if (avgBlue > colorMap[y][x].blue)
      {
        //changedBlue++;
      }
      else if(avgBlue < colorMap[y][x].blue)
      {
        //changedBlue--;
      }
      if (changedBlue > 255)
      {
        changedBlue = 255;
      }
      if (changedBlue < 0)
      {
        changedBlue = 0;
      }
      
      tempColorMap[y][x] = {red: changedRed, green: changedGreen, blue: changedBlue};
      
      colorMap[y][x].red = tempColorMap[y][x].red;
      colorMap[y][x].green = tempColorMap[y][x].green;
      colorMap[y][x].blue = tempColorMap[y][x].blue;
    };
  
    let checkPlague = () => {
      if (timer % 8 === 0)
      {
        for (let y = 0; y < gridHeight; y++)
        {
          for (let x = 0; x < gridWidth; x++)
          {
            //kill some cells
            if (grid[y][x] === 1 && Math.random() > 0.85)
            {
              grid[y][x] = 0;
            }
          }
        }
      }
    };
	
	let draw = () => {
		for (let y = 0; y < gridHeight; y++)
		{
			for (let x = 0; x < gridWidth; x++)
			{
				if (grid[y][x] === 1)
				{
					ctx.save();
					ctx.fillStyle = `rgba(${colorMap[y][x].red}, ${colorMap[y][x].green}, ${colorMap[y][x].blue}, 0.8)`;
					ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
					ctx.restore();
				}
				else
				{
					ctx.save();
					ctx.fillStyle = "rgba(50, 120, 195, 0.8)";
					ctx.fillRect(x*cellSize, y*cellSize, cellSize, cellSize);
					ctx.restore();
				}
			}
		}
		
		//console.log("drawing");
		
		runAutomata();
      
        checkPlague();
      
        timer++;
		
		window.requestAnimationFrame(draw);
	};
	
	draw();
	
	//ctx.fillRect(0, 0, gridWidth, gridHeight);
};

window.onload = init;