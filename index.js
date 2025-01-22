var board;
var score = 0;
var rows = 4;
var columns = 4;
var undoStack = []; // Stack to store previous states for undo

window.onload = function () {
    setGame();
    document.getElementById("restart").addEventListener("click", restartGame);
    document.getElementById("undo").addEventListener("click", undoMove); // Attach undo button
};

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // Create the grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }

    // Initialize with two random tiles
    setTwo();
    setTwo();
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) {
                return true;
            }
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        document.getElementById("score").innerText = `Game Over! Your final score is ${score}`;
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] === 0) {
            board[r][c] = 2;
            let tile = document.getElementById(`${r}-${c}`);
            tile.innerText = "2";
            tile.classList.add("t2");
            found = true;
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "tile";
    if (num > 0) {
        tile.innerText = num;
        tile.classList.add("t" + num.toString());
    }
}

// Listen for arrow key presses
document.addEventListener("keyup", (e) => {
    let changed = false;

    // Save the current state for undo
    saveState();

    if (e.code === "ArrowLeft") {
        changed = slideLeft();
    } else if (e.code === "ArrowRight") {
        changed = slideRight();
    } else if (e.code === "ArrowUp") {
        changed = slideUp();
    } else if (e.code === "ArrowDown") {
        changed = slideDown();
    }

    if (changed) {
        setTwo();
    } else {
        // Undo the save state if no valid move was made
        undoStack.pop();
    }

    document.getElementById("score").innerText = score;
});

function slide(row) {
    let filteredRow = row.filter((num) => num !== 0); // Remove zeroes
    for (let i = 0; i < filteredRow.length - 1; i++) {
        if (filteredRow[i] === filteredRow[i + 1]) {
            filteredRow[i] *= 2;
            filteredRow[i + 1] = 0;
            score += filteredRow[i];
        }
    }
    filteredRow = filteredRow.filter((num) => num !== 0); // Remove zeroes again
    while (filteredRow.length < columns) {
        filteredRow.push(0);
    }
    return filteredRow;
}

function slideLeft() {
    let changed = false;
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        let newRow = slide(row);
        if (JSON.stringify(row) !== JSON.stringify(newRow)) {
            changed = true;
        }
        board[r] = newRow;

        // Update the UI
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(`${r}-${c}`);
            updateTile(tile, board[r][c]);
        }
    }
    return changed;
}

function slideRight() {
    let changed = false;
    for (let r = 0; r < rows; r++) {
        let row = board[r].slice().reverse();
        let newRow = slide(row).reverse();
        if (JSON.stringify(row.reverse()) !== JSON.stringify(newRow)) {
            changed = true;
        }
        board[r] = newRow;

        // Update the UI
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(`${r}-${c}`);
            updateTile(tile, board[r][c]);
        }
    }
    return changed;
}

function slideUp() {
    let changed = false;
    for (let c = 0; c < columns; c++) {
        let col = board.map((row) => row[c]);
        let newCol = slide(col);
        for (let r = 0; r < rows; r++) {
            if (board[r][c] !== newCol[r]) {
                changed = true;
            }
            board[r][c] = newCol[r];
            let tile = document.getElementById(`${r}-${c}`);
            updateTile(tile, board[r][c]);
        }
    }
    return changed;
}

function slideDown() {
    let changed = false;
    for (let c = 0; c < columns; c++) {
        let col = board.map((row) => row[c]).reverse();
        let newCol = slide(col).reverse();
        for (let r = 0; r < rows; r++) {
            if (board[r][c] !== newCol[r]) {
                changed = true;
            }
            board[r][c] = newCol[r];
            let tile = document.getElementById(`${r}-${c}`);
            updateTile(tile, board[r][c]);
        }
    }
    return changed;
}

function saveState() {
    // Push a deep copy of the board and score to the undo stack
    let currentState = {
        board: board.map((row) => row.slice()),
        score: score
    };
    undoStack.push(currentState);
}

function undoMove() {
    if (undoStack.length > 0) {
        let lastState = undoStack.pop();
        board = lastState.board;
        score = lastState.score;

        // Update the grid and score display
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let tile = document.getElementById(`${r}-${c}`);
                updateTile(tile, board[r][c]);
            }
        }
        document.getElementById("score").innerText = score;
    }
}

function restartGame() {
    score = 0;
    undoStack = [];
    document.getElementById("score").innerText = score;
    document.getElementById("board").innerHTML = "";
    setGame();
}

