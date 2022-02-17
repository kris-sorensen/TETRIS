/* TETRIS */

/*

TODO:

.Next
 
 [ ] 10 times multiplier for perfect clears
 [ ] Add Attack method
 do pieces on matrix2 start at row 2?


PLAN:
1. Get rid of Matrixs and instead write a function to create Matricies
2. Combine whatever functions possible that are 1st player or second player into single functions. 
    - can either have parameters and arguements sent to function or could have a global variable that gets updated constantly from 1 -> 2 -> undefined. and updated back to undefined at end of function.

3. add ability to update score before 2nd player looses if 2nd player has higher score than 1st player who already lost
4. Add Attack
5. Add Controls popup
6. Add Starting Screen
7. Add Sounds/animations and polish design


*/

//////////////////////////////* SETUP *////////////////////////////////

//* BOARD

const COLS = 10;
const ROWS = 17;

let MATRIX = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-9, -9, -9, -9, -9, -9, -9, -9, -9, -9],
];

let MATRIX2 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-9, -9, -9, -9, -9, -9, -9, -9, -9, -9],
];

//* TETRIMINOS

const L = [
  [0, 0, 0, 1],
  [0, 1, 1, 1],
];

const J = [
  [2, 0, 0, 0],
  [2, 2, 2, 0],
];

const S = [
  [0, 0, 3, 3],
  [0, 3, 3, 0],
];

const Z = [
  [4, 4, 0, 0],
  [0, 4, 4, 0],
];

const O = [
  [0, 5, 5, 0],
  [0, 5, 5, 0],
];

const T = [
  [0, 6, 6, 6],
  [0, 0, 6, 0],
];

const I = [
  [7, 7, 7, 7],
  [0, 0, 0, 0],
];

const TETRIMINOS = [L, J, S, Z, O, T, I];

//////////////////////////* PLAY/PAUSE/RESTART *////////////////////////////

let pauseAll = true;

const play = document.getElementById("play");

const playFunc = () => {
  if (pauseAll && !gameEnded && !gameEnded2) {
    document.getElementById("play").style.display = "none";
    document.getElementById("restart").style.display = "flex";
    pauseAll = false;
    animatePage();
    placeOnMatrix();
    placeOnMatrix2();
    levelTimer = setInterval(levelFunc, 1000);
    dropLoop = setInterval(dropInterval, rate[rateIndex]);
    dropLoop2 = setInterval(dropInterval2, rate[rateIndex]);
    timeStart = performance.now();
  }
};

play.addEventListener("click", playFunc);

const pauseFunc = () => {
  if (pauseAll) {
    pauseAll = false;
    animatePage();
    document.getElementById("pause-btn").style.color = "var(--color-piece0)";
  } else if (!pauseAll) {
    pauseAll = true;
    cancelAnimationFrame(animateInterval);
    document.getElementById("pause-btn").style.color = "var(--color-piece4)";
  }
};

const pause = document.getElementById("pause-btn");
pause.addEventListener("click", pauseFunc);

const restartFunc = () => {
  document.getElementById("restart").style.display = "none";
  document.getElementById("play").style.display = "flex";
  restart();
};

const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", restartFunc);

const restart = () => {
  pauseAll = true;
  paused = false;

  clearInterval(dropLoop2);
  clearInterval(dropLoop);
  clearInterval(levelTimer);

  level = 1;
  timer = 60;
  points1 = 0;
  points2 = 0;

  document.getElementById("points1").innerHTML = points1;
  document.getElementById("points2").innerHTML = points2;
  document.getElementById("level").innerHTML = level;
  document.getElementById("time").innerHTML = timer;

  MATRIX = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-9, -9, -9, -9, -9, -9, -9, -9, -9, -9],
  ];

  gameEnded = false;
  rateIndex = 0;
  activeTetrimino = [];

  MATRIX2 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [-9, -9, -9, -9, -9, -9, -9, -9, -9, -9],
  ];

  gameEnded2 = false;
  activeTetrimino2 = [];

  cancelAnimationFrame(animateInterval);
  animateInterval = null;
  updateColor();
  updateColor2();
};

//////////////////////////////* GAME LOOPS/TIMERS ///////////////////////////////

let timer = 60;
let level = 1;
const rate = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100];
let rateIndex = 0;
let levelTimer;

let dropLoop;
let dropLoop2;

let animateInterval;

let timeStart = null;
let timeLapsed = null;
let drop1st = false; // allows for drop keydown event to be triggered twice as often as spin and right and left

const animatePage = () => {
  if (!pauseAll) {
    if (timeStart === null) timeStart = performance.now();
    timeLapsed = performance.now();

    if (timeLapsed - timeStart > 59) {
      if (!drop1st) {
        executeDrop();
        drop1st = true;
      }
    }

    if (timeLapsed - timeStart > 120) {
      executeMoves();
      timeStart = performance.now();
      drop1st = false;
    }

    if (!gameEnded2) updateColor2();
    if (!gameEnded) updateColor();
    animateInterval = requestAnimationFrame(animatePage);
  }
};

const levelFunc = () => {
  if (!pauseAll) {
    document.getElementById("time").innerHTML = timer;
    timer--;
    if (timer === 0) {
      rateIndex++;
      document.getElementById("time").innerHTML = "New Level";
      timer = 60;
      level++;
      document.getElementById("level").innerHTML = level;
      changeLevel();
    }
  }
};

const dropInterval = () => {
  if (moves[40].pressed === false && !pauseAll && !paused) {
    stopTest();
    lowerTetrimino();
  }
};

let dropInterval2 = () => {
  if (moves[83].pressed === false && !pauseAll && !paused2) {
    stopTest2();
    lowerTetrimino2();
  }
};

const changeLevel = () => {
  if (level < 9) {
    if (!currentAttackGoing) {
      clearInterval(dropLoop2);
      dropLoop2 = setInterval(dropInterval2, rate[rateIndex]);

      if (!currentAttackGoing2) clearInterval(dropLoop);
      dropLoop = setInterval(dropInterval, rate[rateIndex]);
    }
  }
};

//////////////////////////////* PLACING AND LOWERING TETRIMINOS ////////////////////////////////

let activeColor = null;
let tetrimino = null;

let activeColor2 = null;
let tetrimino2 = null;

let activeTetrimino = [];
let activeTetrimino2 = [];

let stopped = false;
let stopped2 = false;

let gameEnded = false;
let gameEnded2 = false;

let paused = false;
let paused2 = false;

const placeOnMatrix = () => {
  paused = true;
  currentSpin = 0;

  tetrimino = TETRIMINOS[Math.floor(Math.random() * 7)];
  let activeColorFiltered = tetrimino[0].filter((color) => color > 0);
  activeColor = activeColorFiltered[0];

  activeTetrimino = [];

  for (let i = 3; i < 6; i++) {
    if (MATRIX[0][i] < 0 || MATRIX[1][i] < 0) {
      gameEnded = true;
    }
  }
  if (!gameEnded) {
    for (let i = 3; i < 7; i++) {
      if (tetrimino[0][i - 3] > 0) {
        MATRIX[0][i] = activeColor;
        activeTetrimino.push([0, i]);
      }
    }
    for (let i = 3; i < 7; i++) {
      if (tetrimino[1][i - 3] > 0) {
        MATRIX[1][i] = activeColor;
        activeTetrimino.push([1, i]);
      }
    }
  }
  endGame();
  paused = false;
};

const placeOnMatrix2 = () => {
  paused2 = true;
  currentSpin2 = 0;

  // Picking Random Tetrimino
  tetrimino2 = TETRIMINOS[Math.floor(Math.random() * 7)];

  // assigning color to tetrimino
  let activeColorFiltered = tetrimino2[0].filter((color) => color > 0);
  activeColor2 = activeColorFiltered[0];

  activeTetrimino2 = [];
  // Check to see if game has ended
  for (let i = 3; i < 6; i++) {
    // changed from 7 to 6
    if (MATRIX2[0][i] < 0 || MATRIX2[1][i] < 0) {
      gameEnded2 = true;
    }
  }

  //placing tetrimino on matrice
  if (!gameEnded2) {
    for (let i = 3; i < 7; i++) {
      if (tetrimino2[0][i - 3] > 0) {
        MATRIX2[0][i] = activeColor2;
        activeTetrimino2.push([0, i]);
      }
    }
    for (let i = 3; i < 7; i++) {
      if (tetrimino2[1][i - 3] > 0) {
        MATRIX2[1][i] = activeColor2;
        activeTetrimino2.push([1, i]);
      }
    }
  }
  endGame2();
  paused2 = false;
};

const lowerTetrimino = () => {
  if (!stopped) {
    for (let i = activeTetrimino.length - 1; i >= 0; i--) {
      activeTetrimino[i][0] = activeTetrimino[i][0] + 1;
    }
    updateMatrix();
  }
};

const updateMatrix = () => {
  clearPrevious();
  for (let i = activeTetrimino.length - 1; i >= 0; i--) {
    let x = activeTetrimino[i][0];
    let y = activeTetrimino[i][1];
    MATRIX[x][y] = activeColor;
  }
};

const lowerTetrimino2 = () => {
  if (!stopped2) {
    for (let i = activeTetrimino2.length - 1; i >= 0; i--) {
      activeTetrimino2[i][0] = activeTetrimino2[i][0] + 1;
    }
    updateMatrix2();
  }
};

const updateMatrix2 = () => {
  clearPrevious2();
  for (let i = activeTetrimino2.length - 1; i >= 0; i--) {
    let x = activeTetrimino2[i][0];
    let y = activeTetrimino2[i][1];
    MATRIX2[x][y] = activeColor2;
  }
};

const stopTest = () => {
  for (let i = 0; i < activeTetrimino.length; i++) {
    let newX = activeTetrimino[i][0] + 1;
    let y = activeTetrimino[i][1];
    if (MATRIX[newX][y] < 0) {
      stopped = true;
    }
  }
  if (stopped) {
    for (let i = 0; i < activeTetrimino.length; i++) {
      let x = activeTetrimino[i][0];
      let y = activeTetrimino[i][1];
      MATRIX[x][y] = -activeColor;
    }

    isStopped();
    return true;
  } else {
    return false;
  }
};

const isStopped = () => {
  rowCompletedTest();
  placeOnMatrix();
  stopped = false;
};

const stopTest2 = () => {
  for (let i = 0; i < activeTetrimino2.length; i++) {
    let newX = activeTetrimino2[i][0] + 1;
    let y = activeTetrimino2[i][1];
    if (MATRIX2[newX][y] < 0) {
      stopped2 = true;
    }
  }
  if (stopped2) {
    for (let i = 0; i < activeTetrimino2.length; i++) {
      let x = activeTetrimino2[i][0];
      let y = activeTetrimino2[i][1];
      MATRIX2[x][y] = -activeColor2;
    }
    isStopped2();
    return true;
  } else {
    return false;
  }
};

const isStopped2 = () => {
  if (stopped2) {
    rowCompletedTest2();
    placeOnMatrix2();
    stopped2 = false;
  }
};

const endGame = () => {
  if (gameEnded2 && gameEnded) {
    pauseAll = true;
    winUpdater();
  }
};

const endGame2 = () => {
  if (gameEnded2 && gameEnded) {
    pauseAll = true;
    winUpdater();
  }
};

//////////////////////////////////* COLOR MANIPULATION //////////////////////////////////

const clearPrevious = () => {
  for (let i = 0; i < MATRIX.length - 1; i++) {
    for (let j = 0; j < MATRIX[i].length; j++) {
      if (MATRIX[i][j] > 0) {
        MATRIX[i][j] = 0;
      }
    }
  }
};

const clearPrevious2 = () => {
  for (let i = 0; i < MATRIX2.length - 1; i++) {
    for (let j = 0; j < MATRIX2[i].length; j++) {
      if (MATRIX2[i][j] > 0) {
        MATRIX2[i][j] = 0;
      }
    }
  }
};

const updateColor = () => {
  paused = true;
  const noColorChange = `var(--color-piece${0})`;

  for (let i = 0; i < MATRIX.length - 1; i++) {
    for (let j = 0; j < MATRIX[i].length; j++) {
      if (Math.abs(MATRIX[i][j]) > 0) {
        let color = Math.abs(MATRIX[i][j]);
        let id = "_" + i + j;
        let idToChange = document.getElementById(id);
        idToChange.style.backgroundColor = `var(--color-piece${color})`;
      } else if (MATRIX[i][j] === 0) {
        let id2 = "_" + i + j;
        let idToChange2 = document.getElementById(id2);
        idToChange2.style.backgroundColor = noColorChange;
      }
    }
  }
  paused = false;
};

const updateColor2 = () => {
  paused2 = true;
  const noColorChange = `var(--color-piece${0})`;
  for (let i = 0; i < MATRIX2.length - 1; i++) {
    for (let j = 0; j < MATRIX2[i].length; j++) {
      if (Math.abs(MATRIX2[i][j]) > 0) {
        let color = Math.abs(MATRIX2[i][j]);
        let id = "__" + i + j;
        let idToChange = document.getElementById(id);
        idToChange.style.backgroundColor = `var(--color-piece${color})`;
      } else if (MATRIX2[i][j] === 0) {
        let id2 = "__" + i + j;
        let idToChange2 = document.getElementById(id2);
        idToChange2.style.backgroundColor = noColorChange;
      }
    }
  }
  paused2 = false;
};

const rowCompletedTest = () => {
  paused = true;
  let rowsCleared = 0;
  for (let i = 0; i < ROWS - 1; i++) {
    if (MATRIX[i].every((value) => value < 0)) {
      MATRIX.splice(i, 1);
      MATRIX.unshift(Array(COLS).fill(0));
      rowsCleared++;
    }
  }
  if (rowsCleared > 0) {
    points(rowsCleared);
  }
  paused = false;
};

const rowCompletedTest2 = () => {
  paused2 = true;
  let rowsCleared = 0;
  for (let i = 0; i < ROWS - 1; i++) {
    if (MATRIX2[i].every((value) => value < 0)) {
      MATRIX2.splice(i, 1);
      MATRIX2.unshift(Array(COLS).fill(0));
      rowsCleared++;
    }
  }
  if (rowsCleared > 0) {
    points2p(rowsCleared);
  }
  paused2 = false;
};

//////////////////////////////////* ATACK MOVES //////////////////////////////////////

let attacks = [];
let attacks2 = [];

let canAttack = true;
let canAttack2 = true;
let currentAttackGoing = false;
let currentAttackGoing2 = false;

const attack = () => {
  if (attacks[0] === undefined || pauseAll) return;
  //edge for levelUp. levelUp will not redeclare

  let savedAttackState = canAttack;
  if (canAttack) canAttack = false;
  if (savedAttackState) {
    if (attacks[0] === 2) {
      // manipulate css and html
      clearInterval(dropLoop2);
      dropLoop2 = setIntervaldropLoop2 = setInterval(
        dropInterval2,
        rate[rateIndex] / 4
      );
      setTimeout(resetAttack2, 10000);
    } else if (attacks[0] === 1) {
      moves[65].func = right2;
      moves[68].func = left2;
      setTimeout(resetAttack1, 10000);
    }
    attacks.shift();
    renderAttacks();
  }
};

const resetAttack1 = () => {
  moves[65].func = left2;
  moves[68].func = right2;
  canAttack = true;
};

const resetAttack2 = () => {
  clearInterval(dropLoop2);
  dropLoop2 = setInterval(dropInterval2, rate[rateIndex]);
  canAttack = true;
};

const attack2 = () => {
  if (attacks2[0] === undefined || pauseAll) return;
  //edge for levelUp. levelUp will not redeclare

  let savedAttackState = canAttack2;
  if (canAttack2) canAttack2 = false;
  if (savedAttackState) {
    if (attacks2[0] === 2) {
      // manipulate css and html
      clearInterval(dropLoop);
      dropLoop = setInterval(dropInterval, rate[rateIndex] / 4);
      setTimeout(reset2Attack2, 10000);
    } else if (attacks2[0] === 1) {
      moves[37].func = right;
      moves[39].func = left;
      setTimeout(reset2Attack1, 10000);
    }
    attacks2.shift();
    renderAttacks();
  }
};

const reset2Attack1 = () => {
  moves[37].func = left;
  moves[39].func = right;
  canAttack2 = true;
};

const reset2Attack2 = () => {
  clearInterval(dropLoop);
  dropLoop = setInterval(dropInterval, rate[rateIndex]);
  canAttack2 = true;
};

const renderAttacks = () => {
  // display amount of attack moves visually on screen
  const displayAttacks = document.getElementById("attacks1");
  while (displayAttacks.firstChild) {
    displayAttacks.removeChild(displayAttacks.firstChild);
  }
  for (let i = 0; i < attacks.length; i++) {
    if (attacks[i] === 2) {
      const image = document.createElement("img");
      image.src = "./icons/cherryBomb2.png";
      displayAttacks.appendChild(image);
    } else if (attacks[i] === 1) {
      const image2 = document.createElement("img");
      image2.src = "./icons/weakBomb2.png";
      displayAttacks.appendChild(image2);
    }
  }

  const displayAttacks2 = document.getElementById("attacks2");

  while (displayAttacks2.firstChild) {
    displayAttacks2.removeChild(displayAttacks2.firstChild);
  }
  for (let i = 0; i < attacks2.length; i++) {
    if (attacks2[i] === 2) {
      const image = document.createElement("img");
      image.src = "./icons/cherryBomb2.png";
      displayAttacks2.appendChild(image);
    } else if (attacks2[i] === 1) {
      const image2 = document.createElement("img");
      image2.src = "./icons/weakBomb2.png";
      displayAttacks2.appendChild(image2);
    }
  }
};

//////////////////////////////* SCORING ////////////////////////////////

let player1Wins = 0;
let player2Wins = 0;

let points1 = 0;
let points2 = 0;

const pointsFor1Line = 100;
const pointsPerLineSoftDrop = 1;

const levelMultiplier = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5];
const lineMultiplier = [1, 1, 4, 9, 20];

let perfectClearBonus = 1;

const points = (rowsCleared) => {
  const perfectClearTest = MATRIX[15].filter((el) => el < 0 || el > 0);
  if (perfectClearTest.length === 0) perfectClearBonus = 10;

  let levelX = level;
  if (levelX > 9) levelX = 9;

  points1 =
    points1 +
    pointsFor1Line *
      lineMultiplier[rowsCleared] *
      levelMultiplier[levelX] *
      perfectClearBonus;
  document.getElementById("points1").innerHTML = points1;

  if (rowsCleared === 3) {
    attacks.push(1);
    renderAttacks();
  }
  if (rowsCleared === 4) {
    attacks.push(2);
    renderAttacks();
  }

  perfectClearBonus = 1;
};

const points2p = (rowsCleared) => {
  const perfectClearTest = MATRIX2[15].filter((el) => el < 0 || el > 0);
  if (perfectClearTest.length === 0) perfectClearBonus = 10;

  let levelX = level;
  if (levelX > 9) levelX = 9;
  points2 =
    points2 +
    pointsFor1Line *
      lineMultiplier[rowsCleared] *
      levelMultiplier[levelX] *
      perfectClearBonus;
  document.getElementById("points2").innerHTML = points2;

  // add small attack if 3 rows cleared together
  if (rowsCleared === 3) {
    attacks2.push(1);
    renderAttacks();

    // attack2.style.color = "var(--color-piece2)";
  }
  //add big attack if 4 rows cleared together
  if (rowsCleared === 4) {
    attacks2.push(2);
    renderAttacks();
    // attacks2.style.color = "var(--color-piece3)";
  }

  perfectClearBonus = 1;
};

const winUpdater = () => {
  if (points1 > points2) {
    player1Wins++;
    document.getElementById("player1-wins").innerHTML = player1Wins;
  } else if (points1 < points2) {
    player2Wins++;
    document.getElementById("player2-wins").innerHTML = player2Wins;
  }
};

/*
Scoring:

Rules: (Original Sega scoring System)

Level Multiplier:

Lv 1-2 = 1X
Lv 3-4 = 2x
Lv 5-6 = 3x
Lv 7-8 = 4X
Lv 9 = 5X

Clearing Rows:

pointsFor1Line = 100

1 Row Cleared = 1X
2 Rows Cleared = 4X 
3 Rows Cleared = 9x 
4 Rows Cleared = 20x

Perfect Clears add a 10X Bonus

(*) Level Multiplier

Soft Drop:

1 point per squre * level Multiplier

(*) 

*/

////////////////////////////////////* MOVEMENT ///////////////////////////////////////

////////* LEFT/RIGHT

const right = () => {
  paused = true;

  let isSafe = true;
  for (let i = 0; i < activeTetrimino.length; i++) {
    let x = activeTetrimino[i][0];
    let y = activeTetrimino[i][1];
    if (MATRIX[x][y + 1] < 0 || MATRIX[x][y + 1] === undefined) {
      isSafe = false;
    }
  }
  if (isSafe) {
    for (let i = 0; i < activeTetrimino.length; i++) {
      activeTetrimino[i][1] = activeTetrimino[i][1] + 1;
    }
    updateMatrix();
    stopTest();
  }
  paused = false;
};

const right2 = () => {
  let isSafe = true;
  for (let i = 0; i < activeTetrimino2.length; i++) {
    let x = activeTetrimino2[i][0];
    let y = activeTetrimino2[i][1];
    if (MATRIX2[x][y + 1] < 0 || MATRIX2[x][y + 1] === undefined) {
      isSafe = false;
    }
  }
  if (isSafe) {
    for (let i = 0; i < activeTetrimino2.length; i++) {
      activeTetrimino2[i][1] = activeTetrimino2[i][1] + 1;
    }
    updateMatrix2();
    stopTest2();
  }
};

const left = () => {
  paused = true;

  let isSafe = true;
  for (let i = 0; i < activeTetrimino.length; i++) {
    let x = activeTetrimino[i][0];
    let y = activeTetrimino[i][1];
    if (MATRIX[x][y - 1] < 0 || MATRIX[x][y - 1] === undefined) {
      isSafe = false;
    }
  }
  if (isSafe) {
    for (let i = 0; i < activeTetrimino.length; i++) {
      activeTetrimino[i][1] = activeTetrimino[i][1] - 1;
    }
    updateMatrix();
    stopTest();
  }
  paused = false;
};

const left2 = () => {
  paused2 = true;

  let isSafe = true;
  for (let i = 0; i < activeTetrimino2.length; i++) {
    let x = activeTetrimino2[i][0];
    let y = activeTetrimino2[i][1];
    if (MATRIX2[x][y - 1] < 0 || MATRIX2[x][y - 1] === undefined) {
      isSafe = false;
    }
  }
  if (isSafe) {
    for (let i = 0; i < activeTetrimino2.length; i++) {
      activeTetrimino2[i][1] = activeTetrimino2[i][1] - 1;
    }
    updateMatrix2();
    stopTest2();
  }
  paused2 = false;
};

//////////* QUICK DROP

const dropPoints = 1;

const drop = () => {
  if (!pauseAll) {
    paused = true;
    const isStopped = stopTest();

    if (!isStopped && !gameEnded) {
      lowerTetrimino();
      const levelX = level;
      if (levelX > 9) levelX = 9;
      points1 = points1 + dropPoints * levelMultiplier[levelX];
      document.getElementById("points1").innerHTML = points1;
    }
    paused = false;
  }
};

const drop2 = () => {
  if (!pauseAll) {
    paused2 = true;
    const isStopped = stopTest2();
    if (!isStopped && !gameEnded2) {
      lowerTetrimino2();
      const levelX = level;
      if (levelX > 9) levelX = 9;
      points2 = points2 + dropPoints * levelMultiplier[levelX];
      document.getElementById("points2").innerHTML = points2;
    }
    paused2 = false;
  }
};

//////////* SPIN

const LSPIN = [
  [
    [-1, -2],
    [-1, 0],
    [0, -1],
    [0, -1],
  ],
  [
    [0, 0],
    [-1, 1],
    [-2, 2],
    [-1, -1],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 0],
    [1, 2],
  ],
  [
    [1, 1],
    [2, -2],
    [1, -1],
    [0, 0],
  ],
];

const JSPIN = [
  [
    [-1, 0],
    [-2, 1],
    [-1, -1],
    [0, -2],
  ],
  [
    [0, 0],
    [0, 0],
    [-1, 2],
    [-1, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, -1],
    [1, 0],
  ],
  [
    [1, -2],
    [1, -2],
    [0, 0],
    [0, 0],
  ],
];

const SSPIN = [
  [
    [-1, -1],
    [0, -2],
    [-1, 1],
    [0, 0],
  ],
  [
    [1, 1],
    [0, 2],
    [1, -1],
    [0, 0],
  ],
];

const ZSPIN = [
  [
    [-1, 1],
    [0, -1],
    [-1, 0],
    [0, -2],
  ],
  [
    [1, -1],
    [0, 1],
    [1, 0],
    [0, 2],
  ],
];

const OSPIN = [
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
];

const TSPIN = [
  [
    [-1, 1],
    [0, -1],
    [0, -1],
    [0, 0],
  ],
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [-1, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 1],
    [1, -1],
  ],
  [
    [1, -1],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
];

const ISPIN = [
  [
    [-1, 1],
    [0, 0],
    [1, -1],
    [2, -2],
  ],
  [
    [1, -1],
    [0, 0],
    [-1, 1],
    [-2, 2],
  ],
  [
    [-1, 2],
    [0, 1],
    [1, 0],
    [2, -1],
  ],
  [
    [1, -2],
    [0, -1],
    [-1, 0],
    [-2, 1],
  ],
];

const SPINARR = [LSPIN, JSPIN, SSPIN, ZSPIN, OSPIN, TSPIN, ISPIN];

let currentSpin = 0;
let currentSpin2 = 0;

const spin = () => {
  paused = true;
  if (!gameEnded) {
    let sumArr = [];
    let spinArr = SPINARR[activeColor - 1][currentSpin];

    for (let i = 0; i < spinArr.length; i++) {
      let x = activeTetrimino[i][0];
      let y = activeTetrimino[i][1];
      let sx = spinArr[i][0];
      let sy = spinArr[i][1];
      sumArr.push([x + sx, y + sy]);
    }
    let rejected = spinValidator(sumArr);

    if (rejected) {
      paused = false;
      return false;
    } else {
      activeTetrimino = sumArr;
      updateMatrix();
      if (currentSpin === SPINARR[activeColor - 1].length - 1) {
        currentSpin = 0;
      } else {
        currentSpin++;
      }
    }
  }
  paused = false;
};

const spinValidator = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let x = arr[i][0];
    let y = arr[i][1];
    if (x < 0 || y < 0 || MATRIX[x][y] < 0 || MATRIX[x][y] === undefined) {
      return true;
    }
  }
  return false;
};

const spin2 = () => {
  paused2 = true;
  if (!gameEnded2) {
    let sumArr = [];
    let spinArr = SPINARR[activeColor2 - 1][currentSpin2];

    for (let i = 0; i < spinArr.length; i++) {
      let x = activeTetrimino2[i][0];
      let y = activeTetrimino2[i][1];
      let sx = spinArr[i][0];
      let sy = spinArr[i][1];
      sumArr.push([x + sx, y + sy]);
    }

    let rejected = spinValidator2(sumArr);

    if (rejected) {
      paused2 = false;
      return false;
    } else {
      activeTetrimino2 = sumArr;
      updateMatrix2();
      if (currentSpin2 === SPINARR[activeColor2 - 1].length - 1) {
        currentSpin2 = 0;
      } else {
        currentSpin2++;
      }
    }
  }
  paused2 = false;
};

const spinValidator2 = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let x = arr[i][0];
    let y = arr[i][1];
    if (x < 0 || y < 0 || MATRIX2[x][y] < 0 || MATRIX2[x][y] === undefined) {
      return true;
    }
  }
  return false;
};

//////////* Keypresses

const moves = {
  37: { pressed: false, func: left, firstPress: false },
  39: { pressed: false, func: right, firstPress: false },
  40: { pressed: false, func: drop, firstPress: false },
  65: { pressed: false, func: left2, firstPress: false },
  68: { pressed: false, func: right2, firstPress: false },
  83: { pressed: false, func: drop2, firstPress: false },
};

document.addEventListener("keydown", (e) => {
  if (moves[e.keyCode]) {
    moves[e.keyCode].pressed = true;
    if (moves[e.keyCode].firstPress === false) {
      moves[e.keyCode].func();
      timeStart = performance.now();
      moves[e.keyCode].firstPress = true;
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (moves[e.keyCode]) {
    moves[e.keyCode].pressed = false;
  }
  if (moves[e.keyCode]) {
    moves[e.keyCode].firstPress = false;
  }
  switch (e.keyCode) {
    case 38:
      spin();
      break;
    case 87:
      spin2();
      break;
    case 32:
      pauseFunc();
      break;
    case 80:
      playFunc();
      break;
    case 79:
      restartFunc();
      break;
    case 13:
      attack();
      break;
    case 81:
      attack2();
      break;
  }
});

const executeFirstMove = () => {
  Object.keys(moves).forEach((key) => {
    moves[key].firstPress && moves[key].func();
  });
};

const executeMoves = () => {
  Object.keys(moves).forEach((key) => {
    moves[key].pressed && moves[key].func();
  });
};

const executeDrop = () => {
  if (moves[40].pressed === true) moves[40].func();
  if (moves[83].pressed === true) moves[83].func();
};

// const moveInterval = setInterval(executeMoves, 120);

/* 


Plan for ATTACK FEATURE

How to Earn: 4line clears for weak attack, 4 lines cleared together for strong attack. 

earn bomb?

*/
