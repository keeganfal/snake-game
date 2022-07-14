
const gridContainer = document.querySelector(".grid-container")
const scoreVal = document.querySelector(".gui__score")
const startBtn = document.querySelector(".gui__start-btn")

// Method for creating the basic grid system
function makeRows(rows, column) {
    gridContainer.style.setProperty('--grid-rows', rows);
    gridContainer.style.setProperty('--grid-column', column);
    for (let i = -1; i < (rows * column) - 1; i++) {
    let cell = document.createElement("div");
    //cell.innerText = (i + 1);
    gridContainer.appendChild(cell).id = i;
    gridContainer.appendChild(cell).className = 'grid-piece';
    };
};
makeRows(20, 20);

const gridPieces = document.querySelectorAll('.grid-container div')

// Declaring all the main variables
const width = 20;
let score = 0;

// grid piece loc of the snake
let currentSnake = [ 210, 209];
let snakeDirection = 1;

let foodLoc = 0;

// runs method with a time interval
let timeBetween = 0;
let interval = 0;

// Resets all the variables to the original
const runGame = () => {
    currentSnake.forEach(index => gridPieces[index].classList.remove('grid-piece--snake'));
    for (let i = 0; i < gridPieces.length; i++){
        if (gridPieces[i].classList.contains('grid-piece--food')) {
            gridPieces[i].classList.remove('grid-piece--food');
        }
    }
    score = 0;
    snakeDirection = 1;
    scoreVal.innerHTML = `Score: ${score}`;
    // Time between frames in ms
    timeBetween = 200;
    currentSnake = [ 210, 209];

    currentSnake.forEach(index => gridPieces[index].classList.add('grid-piece--snake'));
    generateFood();
    clearInterval(interval)
    interval = setInterval(ifCollides, timeBetween);
}

//snake control with key strokes
const snakeControl = (event) => {
    if(event.keyCode === 39 && snakeDirection != -1) snakeDirection = 1;
    else if (event.keyCode === 38 && snakeDirection != width) snakeDirection = - width;
    else if (event.keyCode === 37 && snakeDirection != 1) snakeDirection = - 1;
    else if (event.keyCode === 40 && snakeDirection != -width) snakeDirection = + width;
}

const ifCollides = () => {
    if (gridPieces[currentSnake[0] + snakeDirection].classList.contains('grid-piece--snake') || 
    (currentSnake[0] + width >= (width*width) && snakeDirection === width) ||
    (currentSnake[0] % width === (width - 1) && snakeDirection === 1) ||
    (currentSnake[0] % width === 0 && snakeDirection === - 1) ||
    (currentSnake[0] - width <= 0 && snakeDirection === - width)
    ) {
        alert("GAME OVER")
        return runGame();
    }

    const lastItem = currentSnake.pop() 
    //last item of the array is removed so the snake goes forward
    gridPieces[lastItem].classList.remove('grid-piece--snake')
    currentSnake.unshift(currentSnake[0] + snakeDirection) 
    gridPieces[currentSnake[0]].classList.add('grid-piece--snake')

    //eat food
    if(gridPieces[currentSnake[0]].classList.contains('grid-piece--food')) {
        gridPieces[currentSnake[0]].classList.remove('grid-piece--food')
        gridPieces[lastItem].classList.add('grid-piece--snake')
        currentSnake.push(lastItem)

        score += 10;
        scoreVal.innerHTML = `Score: ${score}`;
        generateFood()
      }
}

//adds random food
const generateFood = () => {
    foodLoc = Math.floor(Math.random() * gridPieces.length);
    for (i in gridPieces){
        if (!gridPieces[foodLoc].classList.contains('grid-piece--snake')) {
            gridPieces[foodLoc].classList.add('grid-piece--food');
        }
    }
}

const eatFood = () => {
    foodLoc = Math.floor(Math.random() * gridPieces.length);
    for (i in gridPieces){
        if (!gridPieces[foodLoc].classList.contains('grid-piece--snake')) {
            gridPieces[foodLoc].classList.add('grid-piece--food');
        }
    }
}

document.addEventListener('keydown', snakeControl)
startBtn.addEventListener('click', runGame)
