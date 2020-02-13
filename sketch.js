var grid;
var notPaused = true;
var Play = true;

function setup() {
  createCanvas(600, 600);
  grid = new Grid(10);
  grid.randomize();
}

function draw() {
  background(250);

  grid.draw();
  if (Play) {
  if(notPaused) {

  grid.updateNeighborCounts();
  grid.updatePopulation();
} else {
}
} else {
}
}

class Grid {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.numberOfColumns = width / this.cellSize;
    this.numberOfRows = height / this.cellSize;

    var x = this.numberOfColumns; // how big the first array should be
    var y = this.numberOfRows; // how big each array inside of the first array should be
    this.cells = new Array(x);
    for (var i = 0; i < this.numberOfColumns; i++) {
      this.cells[i] = new Array(this.numberOfRows);
    }



    for (var c = 0; c < this.numberOfColumns; c++) {
      for (var r = 0; r < this.numberOfRows; r++) {
        this.cells[c][r] = new Cell(c, r, this.cellSize);
      }
    }



    print(this.cells); // prints [[null, null],[null, null]] in the console
    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
  }

  draw() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].draw();
        fill('green');
        //noStroke();
         circle(column * this.cellSize - 20, row * this.cellSize + 10, this.cellSize - 10, this.cellSize + 5);
      }
    }
  }

  randomize() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var rando = floor(random(2));
        this.cells[column][row].setIsAlive(rando);
      }
    }
  }
  updatePopulation() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].liveOrDie();
      }
    }
  }

  getNeighbors(currentCell) {
    var neighbors = [];
    for (var xOffset = -1; xOffset <= 1; xOffset++) {
      for (var yOffset = -1; yOffset <= 1; yOffset++) {
        var neighborColumn = currentCell.column + xOffset;
        var neighborRow = currentCell.row + yOffset;
        if (this.isValidPosition(neighborColumn, neighborRow)) {
          if ((currentCell.column == neighborColumn) && (currentCell.row == neighborRow)) {}  else {
            var cell = this.cells[neighborColumn][neighborRow];
            neighbors.push(cell);
          }
          // do something with neighborColumn and neighborRow
        }
      }



    }
    return neighbors;
  }
  isValidPosition(column, row) {
    return column >= 0 && row >= 0 && column < this.numberOfColumns && row < this.numberOfRows;
    // add logic that checks if the column and row exist in the grid
    // return true if they are valid and false if they are not
  }
  updateNeighborCounts () {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var currentCell = this.cells[column][row];
        var neighbors = this.getNeighbors(currentCell);
        var count = 0;
        for (var i = 0; i < neighbors.length ;i++) {
          if (neighbors[i].isAlive) {
            count++;
          }
        }
        currentCell.liveNeighborCount= count;
      }
    }
  // for each cell in the grid
    // reset it's neighbor count to 0
    // get the cell's neighbors
    // increase liveNeighborCount by 1 for each neighbor that is alive
}
}
function Sitepause() {
  notPaused = !notPaused;

}
function startplay() {
 Play = !Play;
}

class Cell {
  constructor(column, row, cellSize) {
    this.column = column;
    this.row = row;
    this.cellSize = cellSize;
    this.isAlive = true;
    this.liveNeighborCount =0;
  }

  draw() {
    if (this.isAlive === true) {
      fill('red');

    } else {
      //noStroke();
      fill('blue');

    }
    noStroke();
    rect(this.column * this.cellSize + 1, this.row * this.cellSize + 1, this.cellSize - 1, this.cellSize - 1);
  }
  setIsAlive(value) {
    if (value) {
      this.isAlive = true;
    } else {
      this.isAlive = false;
    }
  }
  liveOrDie() {


    if (this.isAlive && this.liveNeighborCount < 2) {
      this.isAlive = false;

    } else if (this.isAlive && this.liveNeighborCount == 3) {
      this.isAlive = true;

    } else if (this.isAlive && this.liveNeighborCount == 3) {
      this.isAlive = true;

    } else if (this.isAlive && this.liveNeighborCount > 3) {
      this.isAlive = false;

    } else if (this.isAlive === false && this.liveNeighborCount == 3) {
      this.isAlive = true;

    }

  }
}

function mousePressed() {
grid.randomize();

}
