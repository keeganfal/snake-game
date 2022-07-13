document.addEventListener('DOMContentLoaded', () => {
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
    let currentSnake = [ 208, 209, 210];
    let direction = 1;
    let score = 0;
    let interval = 0;
    let timeBetween = 0;
    let currentIndex = 0;

    // Resets all the variables to the original
    const runGame = () => {
        currentSnake.forEach(index => gridPieces[index].classList.remove('grid-piece--snake'));
        console.log("removed");
        clearInterval(interval)
        score = 0;
        direction = 1;
        scoreVal.innerHTML = `Score: ${score}`;
        // Time between frames in ms
        timeBetween = 200;
        currentSnake = [ 208, 209, 210];
        currentIndex = 0;
        currentSnake.forEach(index => gridPieces[index].classList.add('grid-piece--snake'))
        interval = 0;
    }

    //snake control with key strokes
    const snakeControl = (event) => {
        if(event.keyCode === 39) direction = 1;
        else if (event.keyCode === 38) direction = - width;
        else if (event.keyCode === 37) direction = - 1;
        else if (event.keyCode === 40) direction = + width;
    }

    document.addEventListener('keydown', snakeControl)
    startBtn.addEventListener('click', runGame)
})

//const gridPieces = document.querySelector(".grid-container")
