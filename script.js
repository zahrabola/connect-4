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

//when user clicks on circle hole -5
const fillBox = (e) => {
    ///get column value
    let colValue = parseInt(e.target.getAttributre("data-value"));
    //5 because we have 6 row (0-5)
    setPiece(5, colValue);
    currentP = currentP == 1 ? 2 : 1;
    playerturn.innerHTML =`Player <span>${currentPlayer}'s</span> turn`;
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
    playerturn.innerHTML =`Player <span>${currentP} turn</span.`
}