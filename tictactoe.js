const playerX = 'x'
const playerO = 'circle'
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const restart = document.getElementById('restart');
const cellElements = document.querySelectorAll('[data-cell]'); // selecting all of the different cells
const winningMessageElement = document.getElementById('winningMessage') //
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const playerDisplay = document.querySelector('.display-player');
let currentPlayer = 'X';
let circleTurn;


startGame() 

restart.addEventListener('click', startGame);

function startGame () {
    circleTurn = false
    cellElements.forEach(cell => {      // looping through the cells         
        cell.classList.remove(playerX);
        cell.classList.remove(playerO);
        cell.removeEventListener('click', whenClicked); // syntax: element.addEventListener(event, function, useCapture); the third parameter is a boolean value
        cell.addEventListener('click', whenClicked, { once: true });   // every time we click on a cell we want to render an X or an O, {once:true} ensures it only renders once
    });
    winningMessageElement.classList.remove('show')
}

function whenClicked(event) {
    const cell = event.target
    const currentPlayer = circleTurn ? playerO : playerX // current class = if it's circle return circle in not x
    mark(cell, currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurns()
    }
}

function mark(cell, currentPlayer) {
    cell.classList.add(currentPlayer);  // add the the mark according to who's turn it is
}

function checkWin(currentPlayer) {
    return winningCombinations.some(combination => {    // return true if any of the winning combinations are met
        return combination.every(index => {     // checking if all the index have the same mark (ex: X, X, X)
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(playerX) || cell.classList.contains(playerO);
    })
}

function swapTurns() {
    circleTurn = !circleTurn        // swapping between X and O turns
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);

}

