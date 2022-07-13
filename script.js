
const gridContainer = document.querySelector(".grid-container")
const scoreVal = document.querySelector(".gui__score")
const startBtn = document.querySelector(".gui__start-btn")

// Method for creating the basic grid system
function makeRows(rows, cols) {
    gridContainer.style.setProperty('--grid-rows', rows);
    gridContainer.style.setProperty('--grid-cols', cols);
    for (let i = 0; i < (rows * cols); i++) {
    let cell = document.createElement("div");
    cell.innerText = (i + 1);
    // gridContainer.appendChild(cell).className = "grid-piece";
    gridContainer.appendChild(cell).id = i;
    };
};
makeRows(20, 20);

const gridPieces = document.querySelectorAll('.grid-container div')

// Declaring all the main variables
const width = 20;
let score = 0;

// grid piece loc of the snake
let currentSnake = [ 210, 209, 208];
let snakeDirection = 1;
let currentIndex = 0;

// runs method with a time interval
let timeBetween = 0;
let interval = 0;


// Resets all the variables to the original
const runGame = () => {
    currentSnake.forEach(index => gridPieces[index].classList.remove('grid-piece--snake'));
    clearInterval(interval)
    score = 0;
    snakeDirection = 1;
    scoreVal.innerHTML = `Score: ${score}`;
    // Time between frames in ms
    timeBetween = 200;
    currentSnake = [ 210, 209, 208];
    currentIndex = 0;
    currentSnake.forEach(index => gridPieces[index].classList.add('grid-piece--snake'))
    interval = setInterval(ifCollides, timeBetween);
}

const ifCollides = () => {
    if ((currentSnake[0] + width >= (width*width) && snakeDirection === width) ||
    (currentSnake[0] % width === (width - 1) && snakeDirection === 1) ||
    (currentSnake[0] % width === 0 && snakeDirection === - 1) ||
    (currentSnake[0] - width < 0 && snakeDirection === - width) ||
    gridPieces[currentSnake[0] + snakeDirection].classList.contains('grid-piece--snake')
    ) {
        alert("GAME OVER")
        return clearInterval(interval);
    }

    const lastItem = currentSnake.pop() 
    //last item of the array is removed so the snake goes forward
    gridPieces[lastItem].classList.remove('grid-piece--snake')
    currentSnake.unshift(currentSnake[0] + snakeDirection) 
    gridPieces[currentSnake[0]].classList.add('grid-piece--snake')
    }
    
//snake control with key strokes
const snakeControl = (event) => {
    if(event.keyCode === 39) snakeDirection = 1;
    else if (event.keyCode === 38) snakeDirection = - width;
    else if (event.keyCode === 37) snakeDirection = - 1;
    else if (event.keyCode === 40) snakeDirection = + width;
}

document.addEventListener('keydown', snakeControl)
startBtn.addEventListener('click', runGame)
