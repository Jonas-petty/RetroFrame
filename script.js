let currentColor = document.querySelector("#color");
const gridSize = document.querySelector("#frame-size");
const frameContainer = document.querySelector("#frame-container");
const eraseButton = document.querySelector("#erase-button");
const resetButton = document.querySelector("#reset-button");

function createCell(id, className, width, height) {
    const cell = document.createElement("div");
    cell.id = id;
    cell.className = className;
    cell.style["width"] = `${width}%`;
    cell.style["height"] = `${height}%`;

    return cell;
}

function createGrid(frame, gridSize) {
    if (gridSize <= 100) {
        const numberOfCells = gridSize * gridSize;
        for (i = 0; i < numberOfCells; i++) {
            const cellSize = 100 / gridSize;
            const cell = createCell(i, "cell", cellSize, cellSize);
            frame.appendChild(cell);
        }
    } else {
        alert("The maximum size is 100, please try again!");
    }
}

function resetGrid(frame, gridSize) {
    frame.innerHTML = "";
    createGrid(frame, gridSize);
}

document.addEventListener("DOMContentLoaded", () => {
    createGrid(frameContainer, gridSize.value);
});

gridSize.addEventListener("change", () => {
    // alert(gridSize.value);
    resetGrid(frameContainer, gridSize.value);
});

// Painting/Erasing/Reset events
let painting = false;
let erase = false;

function paintCell(target, color) {
    if (target && target.classList.contains("cell")) {
        target.style["background-color"] = erase ? "" : color;
    }
}

frameContainer.addEventListener("pointerdown", (event) => {
    if (event.shiftKey) {
        erase = true;
    }
    painting = true;
    paintCell(event.target, currentColor.value);
    event.preventDefault();
});

frameContainer.addEventListener("pointermove", (event) => {
    if (painting) paintCell(event.target, currentColor.value);
});

frameContainer.addEventListener("pointerup", () => {
    painting = false;
    erase = false;
});

frameContainer.addEventListener("pointercancel", () => {
    painting = false;
});

eraseButton.addEventListener("click", () => {
    erase = !erase;
});

resetButton.addEventListener("click", () => {
    resetGrid(frameContainer, gridSize.value);
});
