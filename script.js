//initial reference  -1
const container = document.querySelector(".container");
const playerTurn = document.getElementById("playerturn");
const startScreen = document.querySelector(".startscreen");
const startButton = document.getElementById("start");
const message = document.getElementById("message");
//grid -initial state matrix -2
let initialMatrix = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
let currentP;

// random number between range -3
const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;
// loop through array and check for same value - 13
const verifyArray = (arrayElement) => {
  let bool = false;
  let elementCount = 0;
  arrayElement.forEach((element, index) => {
    if (element == currentP) {
      elementCount += 1;
      if (elementCount == 4) {
        bool = true;
      }
    } else {
      elementCount = 0;
    }
  });
  return bool;
};


// Check for game over (lest step) -14
const gameOverCheck = () => {
  let truthCounnt = 0;
  for (let innerArray of initialMatrix) {
    if (innerArray.every((val) => val != 0)) {
      truthCounnt += 1;
    } else {
      return false;
    }
  }
  if (truthCounnt == 6) {
    message.innerText = "Game Over";
    startScreen.classList.remove("hide");
  }
};
  
//Check rows -8
const checkAdjacentRowValues = (row) => {
  return verifyArray(initialMatrix[row]);
};
  //check column -9 
  const checkAdjacentColumnValues = (column) => {
    let colWinCount = 0,
      colWinBool = false;
    initialMatrix.forEach((element, index) => {
      if (element[column] == currentP) {
        colWinCount += 1;
        if (colWinCount == 4) {
          colWinBool = true;
        }
      } else {
        colWinCount = 0;
      }
    });
    //no match
    return colWinBool;
  };
  
  // get right diagonal values  -11
  const getRightDiagonal = (row, column, rowLength, columnLength) => {
    let rowCount = row;
    let columnCount = column;
    let rightDiagonal = [];
    while (rowCount > 0) {
      if (columnCount >= columnLength - 1) {
        break;
      }
      rowCount -= 1;
      columnCount += 1;
      rightDiagonal.unshift(initialMatrix[rowCount][columnCount]);
    }
    rowCount = row;
    columnCount = column;
    while (rowCount < rowLength) {
      if (columnCount < 0) {
        break;
      }
      rightDiagonal.push(initialMatrix[rowCount][columnCount]);
      rowCount += 1;
      columnCount -= 1;
    }
    return rightDiagonal;
  };
  
// get left diagonal values -12
const getLeftDiagonal = (row, column, rowLength, columnLength) => {
  let rowCount = row;
  let columnCount = column;
  let leftDiagonal = [];
  while (rowCount > 0) {
    if (columnCount <= 0) {
      break;
    }
    rowCount -= 1;
    columnCount -= 1;
    leftDiagonal.unshift(initialMatrix[rowCount][columnCount]);
  }
  rowCount = row;
  columnCount = column;
  while (rowCount < rowLength) {
    if (columnCount >= columnLength) {
      break;
    }
    leftDiagonal.push(initialMatrix[rowCount][columnCount]);
    rowCount += 1;
    columnCount += 1;
  }
  return leftDiagonal;
};
// check diagonal - 10
const checkAdjacentDiagonalValues = (row, column) => {
  let diagWinBool = false;
  let tempChecks = {
    leftTop: [],
    rightTop: [],
  };
  let columnLength = initialMatrix[row].length;
  let rowLength = initialMatrix.length;

  //Store left and right diagonal array
  tempChecks.leftTop = [
    ...getLeftDiagonal(row, column, rowLength, columnLength),
  ];

  tempChecks.rightTop = [
    ...getRightDiagonal(row, column, rowLength, columnLength),
  ];
  //check both arrays for similarities
  diagWinBool = verifyArray(tempChecks.rightTop);
  if (!diagWinBool) {
    diagWinBool = verifyArray(tempChecks.leftTop);
  }
  return diagWinBool;
};
// win check logic - 7
const winCheck = (row, column) => {
  //if any of the functions return true we return true
  return checkAdjacentRowValues(row)
    ? true
    : checkAdjacentColumnValues(column)
    ? true
    : checkAdjacentDiagonalValues(row, column)
    ? true
    : false;
};

// set circles t0 exact point -6
const setPiece = (startCount, colValue) => {
  let rows = document.querySelectorAll(".grid-row");
  //Initially it will place the circles in the last row else if no place availabke we will decrement the count until we find empty slot
  if (initialMatrix[startCount][colValue] != 0) {
    startCount -= 1;
    setPiece(startCount, colValue);
  } else {
    //place circle
    let currentRow = rows[startCount].querySelectorAll(".grid-box");
    currentRow[colValue].classList.add("filled", `player${currentP}`);
    //Update Matrix
    initialMatrix[startCount][colValue] = currentP;
    //Check for wins
    if (winCheck(startCount, colValue)) {
      message.innerHTML = `Player<span> ${currentP}</span> wins`;
      startScreen.classList.remove("hide");
      return false;
    }
  }
  //Check if all are full
  gameOverCheck();
};

//when user clicks on circle hole -5
const fillBox = (e) => {
  //get column value
  let colValue = parseInt(e.target.getAttribute("data-value"));
  //5 because we have 6 rows (0-5)
  setPiece(5, colValue);
  currentP = currentP == 1 ? 2 : 1;

  playerTurn.innerHTML = `Player <span>${currentP}'s</span> turn`;
};
///create matrix -4
const matrixCreator = () => {
  for (let innerArray in initialMatrix) {
    let outerDiv = document.createElement("div");
    outerDiv.classList.add("grid-row");
    outerDiv.setAttribute("data-value", innerArray);
    for (let j in initialMatrix[innerArray]) {
      //Set all matrix values to 0
      initialMatrix[innerArray][j] = [0];
      let innerDiv = document.createElement("div");
      innerDiv.classList.add("grid-box");
      innerDiv.setAttribute("data-value", j);
      innerDiv.addEventListener("click", (e) => {
        fillBox(e);
      });
      outerDiv.appendChild(innerDiv);
    }
    container.appendChild(outerDiv);
  }
};
//Initilaise game
window.onload = startGame = async () => {
  //Between 1 and 2
  currentP = generateRandomNumber(1, 3);
  container.innerHTML = "";
  await matrixCreator();
  playerTurn.innerHTML = `Player <span>${currentP}'s</span> turn`;
};


//start game
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  startGame();
});
