// Game constants and variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];
let food = {x: 6, y: 7};

// Game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // Check collision with itself
    for (let i = 1; i < snake.length; i++) { // Start from 1 to avoid self-collision at index 0
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // Check collision with walls
    if (snake[0].x >= 18 || snake[0].x < 0 || snake[0].y >= 18 || snake[0].y < 0) {
        return true;
    }

    return false;
}

function gameEngine() {
    // 1. Updating the snake array and food (to be implemented)
    
        if(isCollide(snakeArr)){
            gameOverSound.play();
            musicSound.pause();
            inputDir = {x: 0, y: 0};
            alert("Game over. Press any key to play again!");
            snakeArr = [{x:13, y:15}];
            musicSound.play();
            score = 0;
            updateScore();
        }

        // if you have eaten the food, score++, randomgen the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        updateScore();
        score.innerHTML= "Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a=2;
        let b= 16;    
       
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
        
    }


    //moving the snake
    for (let i = snakeArr.length -2 ; i >=0; i--) {
        const element = snakeArr[i];
        snakeArr[i +1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;




    // 2. Display the snake and food

    // Clear the board
    const board = document.getElementById('board');
    board.innerHTML = "";

    // Display the snake
    snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    
    if (index === 0) {
        snakeElement.classList.add('head'); 
    }
    else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
});
//  snakeArr.forEach((e, index) => {
//         let snakeElement = document.createElement('div');
//         snakeElement.style.gridRowStart = e.y;
//         snakeElement.style.gridColumnStart = e.x;
//         snakeElement.classList.add('snake');
//         if (index == 0) {
//             snakeElement.classList.add('head');
//         }
        
//         board.appendChild(snakeElement);
//     });
    // Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}
function updateScore() {
    // Update the score element
    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = "Score: " + score;
}

// Start the game loop
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
   inputDir = {x:0, y:1}//start
   musicSound.play();
   moveSound.play();
   switch(e.key){
    case 'ArrowUp':
        console.log("Arrowup");
        inputDir.x = 0;
        inputDir.y = -1;
        
        break;

        case 'ArrowDown':
        console.log("ArrowDown");
        inputDir.x = 0;
        inputDir.y = 1;
        break;
        
        case 'ArrowLeft':
        console.log("ArrowLeft");
        inputDir.x = -1;
        inputDir.y = 0;
        break;
        
        case 'ArrowRight':
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;
        break;
   }
 
});
