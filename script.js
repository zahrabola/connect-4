//initial reference  -1
const container = document.querySelector(".container");
const startscreen = document.querySelector(".Start-screen")
const playerturn = document.getElementById("Player-turn");
const startbtn = document.getElementById("start");
const message = document.getElementById("message");

//grid -initial state matrix -2
let initialMatrix  = [

    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];
let currentP;

// random number between range -3
const generateRandomnum = (min, max) => 
Math.floor(Math.random() * (max - min)) + min;


//Check rows -8
const checkadjacentRowValues = (row) => {
    return verifyArray(initialMatrix[row]);
  };
  //check column -9 
  const checkadjacentColumnValues = (column) => {
    let colWinCount = 0,
    colWinBoolean = false;
    initialMatrix.forEach((element, index) => {
        if (element[column] == currentP){
            colWinCount += 1;
            if (colWinCount == 4){
                colWinBoolean = true
            }
        } else {
            colWinBoolean = true
        }
    });
    //no match
    return colWinBoolean;
  }

  // get right diagonal values  -11
const getRightDiagonal = (row, column, rowLength, columnLength) => {
  let rowCount = row;
  let columnCount = column;
  let rightDiagonal = [];
  while (rowCount > 0 ){
    if (columnCount >= columnLength -1){
        break;
    }
    rowCount -= 1;
    columnCount += 1;
    rightDiagonal.unshift(initialMatrix[rowCount][columnCount]);
  }
  rowCount = row;
  columnCount = column;
  while (rowCount < rowLength){
    if (columnCount < 0){
        break
    }
    rightDiagonal.push(initialMatrix[rowCount][columnCount]);
    rowCount += 1;
    columnCount += 1
  }
return rightDiagonal
};
// get left diagonal values -12
 const 
// check diagonal - 10
const checkadjacentDiagonalValues = ( row, column) => {
    let diagonalWinBoolean = false;
    let tempChecks = {
        leftTop: [],
        rightTop: [],
    };
    let columnLength = initialMatrix[row].length;
    let rowLength = initialMatrix.length;

    // store left and right diagonal array
    tempChecks.leftTop = [
        ...getLeftDiagonal(row, column, rowLength, columnLength)
    ];
    tempChecks.rightTop = [
        ...getRightDiagonal(row, column, rowLength, columnLength)
    ];
      //check both arrays for similarities
      diagonalWinBoolean = verifyArray(tempChecks. rightTop);
      if (!diagonalWinBoolean) {
        diagonalWinBoolean = verifyArray(tempChecks.leftTop);

      }
return diagonalWinBoolean
}

// win check logic - 7
const winCheck = (row, column) => {
 //if any of the functions return true we return true
 return checkadjacentRowValues (row)
 ? true
 : checkadjacentColumnValues (column)
 ? true 
 : checkadjacentDiagonalValues (row, column)
 ? true : false;
}

// set circles t0 exact point -6
const setPiece = (startCount, colValue) => {
    let rows = document.querySelectorAll(".grid-row");
  //Initially it will place the circles in the last
  // row else if no place availabke we will decrement the count until we find empty slot  
if(initialMatrix[startCount][colValue] != 0 ){
    startCount -=1;
    setPiece(startCount, colValue);
} else {
    //place circle
    let currentRow = rows[startCount].querySelectorAll(".grid-box")
    currentRow[colValue].classList.add("filled", `player${currentP}`);
    //update matrix 
    initialMatrix[startCount][colValue] = currentP
    //Check for wins
    if(winCheck(startCount, colValue)){
        message.innerHTML = `Player<span> ${currentP}</span> wins`;
        startscreen.classList.remove("hide");
        return false
    }
}
// check if all are full
gameOverCheck();
}

//when user clicks on circle hole -5
const fillBox = (e) => {
    ///get column value
    let colValue = parseInt(e.target.getAttribute("data-value"));
    //5 because we have 6 row (0-5)
    setPiece(5, colValue);
    currentP = currentP == 1 ? 2 : 1;
    playerturn.innerHTML =`Player <span>${currentP}'s</span> turn`;
}

///create matrix -4
const matrixCreator = () => {
    for (let innerArray in initialMatrix){
        let outerDiv = document. createElement("div");
        outerDiv.classList.add("grid-row");
        outerDiv.setAttribute("data-value", innerArray);
        for (let j in initialMatrix[innerArray]){
            //set all matrix values to 0
        initialMatrix[innerArray][j] = [0];
        let innerDiv = document.createElement("div");
        innerDiv. classList.add("grid-box");
        innerDiv.setAttribute("data-value", j);
        innerDiv.addEventListener("click", (e) => {
            fillBox(e)
        })
        outerDiv.appendChild(innerDiv)
        }
        container.appendChild(outerDiv);
    }
};
//Initilaise game
window.onload =startGame = async () => {
    //between 1 and 2 
    currentP = generateRandomnum(1, 3);
    container.innerHTML= "";
    await matrixCreator();
    playerturn.innerHTML =`Player <span>${currentP} turn</span>.`
}