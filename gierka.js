const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const touchShootButton = document.getElementById("touchShootButton");


const player = {
  x: canvas.width / 2 - 15,
  y: canvas.height - 30,
  width: 30,
  height: 15,
  speed: 5,
  bullets: [],
};

const enemies = [];
const enemyRows = 3;
const enemyCols = 8;
const enemySize = 20;
const bulletSpeed = 7;

let kills = 0;
let enemiesMove = false;
let enemySpeed = 0.5;
let gameRunning = false;
let gameOver = false;
let victory = false;

for (let row = 0; row < enemyRows; row++) {
  for (let col = 0; col < enemyCols; col++) {
    enemies.push({
      x: 50 + col * 50,
      y: 30 + row * 40,
      width: enemySize,
      height: enemySize,
      dx: 0,
    });
  }
}

let keys = {};

canvas.addEventListener("touchstart", function(e) {
  e.preventDefault();
});

canvas.addEventListener("touchmove", function(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  let touchX = touch.clientX - rect.left;
  player.x = touchX - player.width / 2;
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }
});

canvas.addEventListener("touchend", function(e) {
  e.preventDefault();
});

touchShootButton.addEventListener("touchstart", function(e) {
  e.preventDefault();
  if (!gameRunning) return;
  const bulletX = player.x + player.width / 2 - 2;
  const bulletY = player.y;
  player.bullets.push({ x: bulletX, y: bulletY });
});

document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  keys[e.key] = true;
  if (e.key === "k") {
    player.bullets.push({ x: player.x + player.width / 2 - 2, y: player.y });
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

startButton.addEventListener("click", () => {
  gameRunning = true;
  startButton.style.display = "none";

  touchShootButton.style.display = "block";
  
  loop();
});

function endGame(result) {
  gameRunning = false;
  gameOver = result === "lose";
  victory = result === "win";
  setTimeout(() => {
    ctx.fillStyle = "white";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      result === "win" ? "VICTORY!" : "GAME OVER",
      canvas.width / 2,
      canvas.height / 2
    );
  }, 100);
  restartButton.style.display = "block";

  touchShootButton.style.display = "none";
  restartButton.style.display = "block";
}

function update() {
  if (!gameRunning) return;

  // Ruch gracza
  if (keys["ArrowLeft"] || keys["a"]) player.x -= player.speed;
  if (keys["ArrowRight"] || keys["d"]) player.x += player.speed;
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

  // Pociski
  player.bullets.forEach((b, i) => {
    b.y -= bulletSpeed;
    if (b.y < 0) player.bullets.splice(i, 1);
  });

  // Kolizje
  enemies.forEach((enemy, ei) => {
    player.bullets.forEach((b, bi) => {
      if (
        b.x < enemy.x + enemy.width &&
        b.x + 4 > enemy.x &&
        b.y < enemy.y + enemy.height &&
        b.y + 10 > enemy.y
      ) {
        enemies.splice(ei, 1);
        player.bullets.splice(bi, 1);
        kills++;

        if (!enemiesMove && kills >= 5) {
          enemiesMove = true;
          enemies.forEach((e) => (e.dx = enemySpeed));
        }

        if (enemies.length === 0) {
          endGame("win");
        }
      }
    });
  });

  // Ruch wrogów
  if (enemiesMove) {
    let reverse = false;
    enemies.forEach((enemy) => {
      enemy.x += enemy.dx;
      if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
        reverse = true;
      }
    });

    if (reverse) {
      enemies.forEach((e) => {
        e.dx *= -1;
        e.y += 10;
      });
    }
  }

  // Sprawdzenie kolizji z graczem lub dolną krawędzią
  for (let enemy of enemies) {
    const touchesBottom = enemy.y + enemy.height >= canvas.height;
    const touchesPlayer =
      enemy.x < player.x + player.width &&
      enemy.x + enemy.width > player.x &&
      enemy.y + enemy.height > player.y;

    if (touchesBottom || touchesPlayer) {
      endGame("lose");
      return;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gracz
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Pociski
  ctx.fillStyle = "yellow";
  player.bullets.forEach((b) => ctx.fillRect(b.x, b.y, 4, 10));

  // Wrogowie
  ctx.fillStyle = "red";
  enemies.forEach((enemy) =>
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
  );

  // Punkty
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`Zestrzeleni: ${kills}`, 10, 20);
}

function loop() {
  if (!gameRunning) return;
  update();
  draw();
  if (!gameOver && !victory) {
    requestAnimationFrame(loop);
  }
}



restartButton.addEventListener("click", () => {
  location.reload(); 
});

touchShootButton.style.display = "none";