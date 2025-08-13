let currentColor = document.querySelector("#color");
let gridSize = +document.querySelector("#frame-size").value;
const frameContainer = document.querySelector("#frame-container");

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

createGrid(frameContainer, gridSize);

// Painting events
let painting = false;
function paintCell(target, color) {
    if (target && target.classList.contains("cell")) {
        target.style["background-color"] = color;
    }
}

frameContainer.addEventListener("pointerdown", (event) => {
    painting = true;
    paintCell(event.target, currentColor.value);
    event.preventDefault();
});

frameContainer.addEventListener("pointermove", (event) => {
    if (painting) paintCell(event.target, currentColor.value);
});

frameContainer.addEventListener("pointerup", () => {
    painting = false;
});

frameContainer.addEventListener("pointercancel", () => {
    painting = false;
});
