const winningCombinations = [
    [0, 1, 2],  // there are 9 spots but index starts with 0
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


const playerX = 'rona';
const playerO = 'earth';
const restart = document.getElementById('restart'); 
const cells = document.querySelectorAll('[data-cell]'); // selecting all cell elements
const winner = document.querySelector('.alert'); 
const announcingWinner = document.querySelector('[data-announcing-winner]');
const displayPlayer = document.querySelector('.display-player');
let currentPlayer = 'rona';
let earthTurn;


startGame()

restart.addEventListener('click', startGame);

function startGame () {
    earthTurn = false
    cells.forEach(cell => {      // looping through the cells         
        cell.classList.remove(playerX);
        cell.classList.remove(playerO);
        cell.removeEventListener('click', whenClicked); // syntax: element.addEventListener(event, function, useCapture); the third parameter is a boolean value
        cell.addEventListener('click', whenClicked, { once: true });   // every time we click on a cell we want to render an X or an O, {once:true} ensures it only renders once
    });
    winner.classList.remove('show');
}

function whenClicked(event) {
    const cell = event.target
    const currentPlayer = earthTurn ? playerO : playerX // current class = if it's circle return circle in not x
    mark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()){
        endGame(true);
    } else {
        swapTurns();
    }
}

function mark(cell, currentPlayer) {
    cell.classList.add(currentPlayer);  // add the the mark according to who's turn it is
}

function checkWin(currentPlayer) {
    return winningCombinations.some(combination => {    // return true if any of the winning combinations are met
        return combination.every(index => {     // checking if all the index in the winning combination have the same mark (ex: X, X, X)
            return cells[index].classList.contains(currentPlayer);   // if true return the current player as the winner
        })
    })
}

function endGame(draw) {
    if (draw) {
        winner.innerText = 'nobody wins, better luck in 2023!'
        // if it is a draw make the text announce ...
    } else {
        winner.innerText = `${earthTurn ? "you're in the clear earth" : "cough, cough rona"} wins!`
    }
    winner.classList.add('show');
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(playerX) || cell.classList.contains(playerO);
    })
}

function swapTurns() {
    earthTurn = !earthTurn        // swapping between X and O turns
    displayPlayer.classList.remove(`player${currentPlayer}`);   // after they take their turn swaps
    currentPlayer = currentPlayer === 'rona' ? 'earth' : 'rona'; // to next player
    displayPlayer.innerText = currentPlayer;    // changes the 
    displayPlayer.classList.add(`player${currentPlayer}`);
}



// console.log(playerX);
// console.log(playerO);
// console.log(restart);
// console.log(cells);
console.log(winner.classList);
// console.log(winner);
// console.log(displayPlayer);
// console.log(earthTurn);
// console.log(checkWin(playerO));