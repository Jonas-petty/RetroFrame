import html2canvas from "./node_modules/html2canvas/dist/html2canvas.esm.js";

let currentColor = document.querySelector("#color");
const gridSize = document.querySelector("#frame-size");
const frameContainer = document.querySelector("#frame-container");
const toggleGridButton = document.querySelector("#toggle-grid");
const eraseButton = document.querySelector("#erase-button");
const resetButton = document.querySelector("#reset-button");
const downloadButton = document.querySelector("#download-png");

let gridIsActive = true;
let painting = false;
let erase = false;

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
        for (let i = 0; i < numberOfCells; i++) {
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
    setGridBorder(frame, gridIsActive);
}

function paintCell(target, color) {
    if (target && target.classList.contains("cell")) {
        target.style["background-color"] = erase ? "" : color;
    }
}

function setGridBorder(grid, gridIsActive) {
    toggleGridButton.textContent = gridIsActive
        ? "Grid is Active"
        : "Grid is Inactive";
    const cells = grid.childNodes;
    cells.forEach((cell) => {
        if (gridIsActive) {
            cell.classList.add("grid-active");
        } else {
            cell.classList.remove("grid-active");
        }
    });
}

function startProject(frame, gridSize) {
    createGrid(frame, gridSize);
    setGridBorder(frame, gridIsActive);
}

document.addEventListener("DOMContentLoaded", () => {
    startProject(frameContainer, gridSize.value);
});

toggleGridButton.addEventListener("click", () => {
    gridIsActive = !gridIsActive;
    setGridBorder(frameContainer, gridIsActive);
});

gridSize.addEventListener("change", () => {
    resetGrid(frameContainer, gridSize.value);
});

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

downloadButton.addEventListener("click", () => {
    html2canvas(frameContainer, { backgroundColor: null }).then((canvas) => {
        let downloadDataURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = downloadDataURL;
        console.log("clicou");
        link.download = "output.png";
        link.click();
        link.remove();
    });
});
