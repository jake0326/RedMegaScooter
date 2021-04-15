import Starship from './starship';
import Enemy from './enemy';
import { shuffle, collisionOccured } from './utility';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = "20px 'Press Start 2P'"

  const gameOverText = document.getElementById("game-over");
  let starship = new Starship();
  let enemies = [];
  let killCount = 1;
  let score = 0;
  let waveTimers = [];
  let gameAnimation;
  let gameOver = true;

  let firstWaveFormation = [];
  let secondWaveFormation = [];
  for (let x = 50; x < 401; x += 50) {
    for (let y = 80; y < 331; y += 50) {
      let coords = { "x": x, "y": y };
      if (y < 181) {
        firstWaveFormation.push(coords);
      } else {
        secondWaveFormation.push(coords);
      }
    }
  }

  let starfieldColors = ["#31FFFF", "#008A00", "#931C1C", "#8B41C1", "#8C7D00"];
  for (let i = 0; i < 5; i++) {
    starfieldColors = starfieldColors.concat(starfieldColors);
  }

  const starfieldPositions = [];
  for (var i = 0; i < 60; i++) {
    let radius = Math.random() * 2 + 1.5;
    starfieldPositions.push({
      "x": canvas.width * Math.random(),
      "y": canvas.height * Math.random(),
      "radius": radius,
    });
  }

  const renderStarfield = (canvas, ctx) => {
    starfieldPositions.forEach((star, idx) => {
      ctx.fillStyle = starfieldColors[idx];
      if (star.y > 600) {
        star.y = 0;
      }
      star.y++;
      ctx.fillRect(
        star.x,
        star.y,
        star.radius,
        star.radius,
      )
    });
  };

  const createEnemyWave = (waveFormation, centerY, yCurveDirection) => {
    shuffle(waveFormation).forEach((coords, idx) => {
      waveTimers.push(
        setTimeout(() => {
          let enemy;
          if (idx % 2 == 0) {
            enemy = new Enemy(coords.x, coords.y, 177, 341, centerY, 1, yCurveDirection);
          } else {
            enemy = new Enemy(coords.x, coords.y, 154, 100, centerY, -1, yCurveDirection);
          }
          enemies.push(enemy);
        }, (idx * 200))
      );
    });
  }

  const queueEnemyWaves = () => {
    createEnemyWave(firstWaveFormation, 200, 1);
    waveTimers.push(
      setTimeout(() => createEnemyWave(secondWaveFormation, 150, -1), 15000)
    );
  }

  const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillText(
      score,
      400,
      25,
    );

    if (gameOver) {
      ctx.drawImage(gameOverText, 120, 150);
    }

    renderStarfield(canvas, ctx);

    if (killCount % 49 === 0) {
      killCount++;
      score += 100;
      queueEnemyWaves();
    }
    starship.renderStarship(canvas, ctx);
    enemies.forEach((enemy, idx) => {
      enemy.renderEnemy(canvas, ctx);

      if (enemy.alive) {
        if (collisionOccured(enemy, starship, 12, -10, 65)) {
          starship.implode();
          setTimeout(() => {
            gameOver = true;
          }, 1500);
        }

        enemy.lasers.forEach(laser => {
          if (collisionOccured(starship, laser, 12, 17, 50)) {
            starship.implode();
            laser.dissolve();
            setTimeout(() => {
              gameOver = true;
            }, 1500);
          }
        });

        starship.lasers.forEach(laser => {
          if (collisionOccured(enemy, laser, 22, 17, 50)) {
            enemy.destroy(canvas, ctx);
            laser.dissolve();
            killCount += 1;
            score += 15;
          }
        });
      }
    });

    gameAnimation = requestAnimationFrame(gameLoop);
  };

  const resetGame = () => {
    waveTimers.forEach(wave => clearTimeout(wave));
    enemies.forEach(enemy => enemy.alive = false);
    starship.alive = false;
    waveTimers = [];
    enemies = [];
    starship = new Starship();
    gameOver = false;
    killCount = 1;
    score = 0;
  };

  const startGame = () => {
    resetGame();
    cancelAnimationFrame(gameAnimation);
    gameLoop();
    queueEnemyWaves();
  };

  const clickToPlay = () => {
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => {
      startGame();
    });
  };

  const spaceToPlay = () => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 32 && gameOver) {
        startGame();
      }
    });
  };

  clickToPlay();
  spaceToPlay();

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderStarfield(canvas, ctx);
    ctx.drawImage(
      document.getElementById("game-ready"),
      190,
      200,
    );
  }, 1000/60);
});
