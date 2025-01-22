Here's the updated **README.md** for your project with the new features included:

---

# 2048 Game

This is a simple implementation of the popular **2048** puzzle game using **HTML**, **CSS**, and **JavaScript**. The game involves sliding numbered tiles on a grid to combine like numbers, with the goal of creating a tile with the value 2048. The game offers features such as **Undo** and **Restart**.

## Features Added:

- **Undo Move**: A new feature that allows the user to undo the previous move and return to the state of the board before the move.
  
- **Restart Game**: Restart the game with the same grid size (4x4) and reset the score to 0.

- **Tile Animation**: Smooth tile movement and merging animations to enhance the gaming experience.

- **Random Tile Generation**: Tiles (initially with a value of 2) are randomly generated in empty spaces on the grid after every valid move.

- **Score Display**: The score is updated based on the tiles that are merged. The score is displayed at the top and reflects the current progress.

- **Game Over Detection**: The game checks if there are no more valid moves left. If the board is full and no merges are possible, a "Game Over" message is shown.

- **Responsive Layout**: The game grid adapts to different screen sizes, ensuring it is playable on both desktop and mobile devices.

## How to Play:

1. Use the **Arrow Keys** (Left, Right, Up, Down) to move the tiles on the board.
2. Tiles with the same number will merge into one when they touch, doubling in value.
3. The goal is to create a tile with the value **2048**.
4. You can **Undo** your last move using the **Undo** button, and restart the game with the **Restart** button.

## Installation

### Prerequisites:
- A web browser (Chrome, Firefox, Edge, etc.) to run the game.

### Steps to Run the Game Locally:
1. Download or clone the repository.
2. Open the **index.html** file in your browser to start the game.
3. Start playing and enjoy!

## Technologies Used:
- **HTML**: For the basic structure of the game.
- **CSS**: To style the game board and tiles.
- **JavaScript**: To handle the game logic, tile movement, scoring, and undo functionality.

## Future Features (Planned):
- **Leaderboard**: Keep track of the best scores.
- **High Score**: Store and display the highest score achieved.

## Acknowledgments:

This project was inspired by a https://www.youtube.com/watch?v=XM2n1gu4530&list=PLnKe36F30Y4bLhA-st9sC4ZthyV7nsL2Q&index=18, where the basic structure and game logic were explained. The code was customized and additional features like **Undo**, **Restart**, and **Responsive Design** were implemented.

---

Feel free to make any modifications or add new features to enhance the game further!

