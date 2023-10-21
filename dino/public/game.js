// public/game.js
let isJumping = false;
let score = 0;
let gameInterval;
let obstacleIntervals = [];  // Array to keep track of all obstacle intervals
let gameRunning = false;  // Flag to indicate whether the game is running


function jump() {
    isJumping = true;
    let jumpHeight = 0;
    const upInterval = setInterval(() => {
      if (jumpHeight > 100) {
        clearInterval(upInterval);
        const downInterval = setInterval(() => {
          if (jumpHeight <= 0) {
            clearInterval(downInterval);
            isJumping = false;
          } else {
            jumpHeight -= 5;
            dino.style.bottom = `${jumpHeight}px`;
          }
        }, 20);
      } else {
        jumpHeight += 5;
        dino.style.bottom = `${jumpHeight}px`;
      }
    }, 20);
  }

function startGame() {
    gameRunning = true;  // Set the flag to true when the game starts
    document.addEventListener('keydown', jumpHandler);
    // gameInterval = setInterval(createObstacle, 2000);
    createObstacle();  // Call createObstacle directly to start the obstacle creation loop

}

function jumpHandler(e) {
    if (e.code === 'Space' && !isJumping) jump();
}

const dino = document.getElementById('dino');
const obstaclesContainer = document.getElementById('obstacles');

// Ensure the dino is positioned on the left side of the game area
dino.style.left = '50px';

function createObstacle() {
    if (!gameRunning) return;  // Exit the function if the game is not running

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstaclesContainer.appendChild(obstacle);
    let obstaclePosition = 1000;
    obstacle.style.left = `${obstaclePosition}px`;  // Set initial left position for obstacle
    const obstacleInterval = setInterval(() => {  // Changed to const to avoid overriding the outer scope variable
        
        if (!gameRunning) {
            clearInterval(obstacleInterval);
            return;  // Exit the function if the game is not running
        }

        if (obstaclePosition < -60) {
            clearInterval(obstacleInterval);
            const index = obstacleIntervals.indexOf(obstacleInterval);
            if (index !== -1) {
                obstacleIntervals.splice(index, 1);  // Remove the interval from the array
            }
            if (obstaclesContainer.contains(obstacle)) {
                obstaclesContainer.removeChild(obstacle);
            }
            score++;
            document.getElementById('score').innerText = `Score: ${score}`;
        } else {
            obstaclePosition -= 10;
            obstacle.style.left = `${obstaclePosition}px`;  // Update left position to move obstacle to the left
            checkCollision(obstacle);
        }
    }, 50);
    // obstacleIntervals.push(obstacleInterval);  // Add this interval to the array
    if (gameRunning) {
        gameInterval = setTimeout(createObstacle, 2000);  // Schedule the next call to createObstacle
    }
}


function checkCollision(obstacle) {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    if (
        dinoRect.right > obstacleRect.left &&
        dinoRect.left < obstacleRect.right &&
        dinoRect.bottom > obstacleRect.top &&
        dinoRect.top < obstacleRect.bottom
    ) {
        gameRunning = false;  // Set the flag to false when a collision is detected
        // Collision detected, stop the game
        clearTimeout(gameInterval);  // Stop generating new obstacles

        stopGame();
    }
}


function stopGame() {
    console.log("stopGame called");
    gameRunning = false;  // Set the flag to false when the game stops
    window.handleGameOver(score);

    document.removeEventListener('keydown', jumpHandler);
    clearTimeout(gameInterval);
    obstaclesContainer.innerHTML = '';  // Remove all obstacles
    score = 0;  // Reset score
    document.getElementById('score').innerText = `Score: ${score}`;
    obstacleIntervals.forEach(interval => clearInterval(interval));  // Clear all obstacle intervals
    obstacleIntervals = [];  // Reset the array for future games
}

window.handleGameOver = handleGameOver;  // Expose handleGameOver function globally

window.startGame = startGame;
window.stopGame = stopGame;

