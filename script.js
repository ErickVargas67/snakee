const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tile = 20;
let snake = [{ x: 200, y: 200 }];
let dx = tile;
let dy = 0;

let food = {
    x: Math.floor(Math.random() * 20) * tile,
    y: Math.floor(Math.random() * 20) * tile
};

function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, tile, tile);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, tile, tile);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * 20) * tile;
        food.y = Math.floor(Math.random() * 20) * tile;
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height)
        return true;

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y)
            return true;
    }

    return false;
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -tile; }
    if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = tile; }
    if (e.key === "ArrowLeft" && dx === 0) { dx = -tile; dy = 0; }
    if (e.key === "ArrowRight" && dx === 0) { dx = tile; dy = 0; }
});

function gameLoop() {
    if (checkCollision()) {
        alert("Game Over");
        document.location.reload();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawFood();
    moveSnake();
    drawSnake();
}

setInterval(gameLoop, 120);
