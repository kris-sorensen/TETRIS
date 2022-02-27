/// Setup

// Size of browser viewport.

//detect screen size changes so you can resize collumns and rows automatically.
window.addEventListener("resize", (event) => {
  // setColsAndRows()
  windowWidth = document.body.clientWidth;
  WindowHeight = document.body.clientHeight;
  //BLOCK_SIZE =
  // determine blocksize and dive by width to resize board.
});
let windowWidth = document.body.clientWidth;
let windowHeight = document.body.clientHeight;

let COLS = 30;
let ROWS = 20; // will be set by setColsandRows()
let BLOCK_SIZE = 30; // will be set by setColsandRows()

const canvas = document.querySelector("canvas");
canvas.width = windowWidth;
const ctx = canvas.getContext("2d");

// Calculate size of canvas from constants.
ctx.canvas.width = windowWidth - 4;
ctx.canvas.height = windowHeight - 4;
console.log("ctx.canvas.height:", ctx.canvas.height);

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

//create board
class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.getEmptyBoard();
  }

  getEmptyBoard() {
    const board = Array.from(
      { length: ROWS },
      () => Array(COLS).fill(0) //fill board with 0s
    );

    // board.
  }
}
// follow board logic on website to create board.
// use html and css floatng div to create

const game = new Board(ctx);

console.log(game);

/// CREATE MATRICI of 0's
/// Create Object for each tetrimino in each spin direction
/// create an array with elements being each tetrimino obj

/// GAME LOOP (triggered every x amount of seconds)

/// pick Random tetrimino from tetriminoArr
/// find all possible spots on the board that the piece can go, and ouput an array of possib le spots.          based on length of lowest point and make sure it has room in higher points
///
/// choose a ramdom spot. update Matricie show where the piece will be when it is resting but give it a -1 value while still falling. -2 when resting. when new piece rests it will do a row complete check

/// place pieces and drop. place at zero index with a async function that will drop it every x milliseconds. until it reaches the resting point
/// row clear check. only row clear based on - 1 values (might still have an issue with floating pieces?)

// create floating div for play button logo. and other buttons. need to use z index for positioning.
