
const gridContainer = document.querySelector(".grid-container")

function makeRows(rows, cols) {
    gridContainer.style.setProperty('--grid-rows', rows);
    gridContainer.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
      let cell = document.createElement("div");
      cell.innerText = (c + 1);
      gridContainer.appendChild(cell).className = "grid-piece";
    };
};
  
makeRows(20, 20);

//const gridPieces = document.querySelector(".grid-container")