import Snake from "./snake.js";
import { config } from "./config.js";
import Food from "./food.js";
import Renderer from "./renderer.js";
import ScoreHandler from "./score.js";
import UIHandler from "./ui.js";

const GAME_STATE = {
  PLAYING: "playing",
  GAME_OVER: "gameOver",
  PAUSED: "paused",
  STARTED: "started",
};

class Game {
  constructor(canvas, inputHandler) {
    this.snake = null;
    this.ctx = canvas.getContext("2d");
    this.timeElapsed = 0;
    this.inputHandler = inputHandler;
    this.food = null;
    this.renderer = new Renderer(this.ctx);
    this.scoreHandler = new ScoreHandler();
    this.uiHandler = new UIHandler();
    this.gameState = GAME_STATE.STARTED;
  }

  init() {
    this.snake = new Snake(10, 10);
    this.food = new Food();
    this.food.generateFood(this.snake, config.obstacles);
    this.updateUI();
  }

  updateUI() {
    this.uiHandler.updateScoreText(this.scoreHandler.getScore());
    this.uiHandler.updateMaxScoreText(this.scoreHandler.getMaxScore());
    if (this.gameState === GAME_STATE.STARTED) {
      this.uiHandler.updateGameStateText("Press SPACE to Start");
    } else if (this.gameState === GAME_STATE.PLAYING) {
      this.uiHandler.updateGameStateText("Press SPACE or ESC to Pause");
    } else if (this.gameState === GAME_STATE.PAUSED) {
      this.uiHandler.updateGameStateText("Press SPACE to Resume");
    } else if (this.gameState === GAME_STATE.GAME_OVER) {
      this.uiHandler.updateGameStateText("Game Over! Press SPACE to Restart");
    }
  }

  resetGame() {
    this.gameState = GAME_STATE.PLAYING;
    this.scoreHandler.reset();
    this.snake.reset();
    this.food.generateFood(this.snake, config.obstacles);
    this.updateUI();
  }

  setState(state) {
    this.gameState = state;
    this.updateUI();
  }

  handleInput() {
    const key = this.inputHandler.getLatestInput();

    if (!key) return;

    let direction = null;
    switch (key) {
      case "ArrowUp":
        direction = { x: 0, y: -1 };
        break;

      case "w":
        direction = { x: 0, y: -1 };
        break;

      case "ArrowDown":
        direction = { x: 0, y: 1 };
        break;

      case "s":
        direction = { x: 0, y: 1 };
        break;

      case "ArrowLeft":
        direction = { x: -1, y: 0 };
        break;

      case "ArrowRight":
        direction = { x: 1, y: 0 };
        break;

      case "a":
        direction = { x: -1, y: 0 };
        break;

      case "d":
        direction = { x: 1, y: 0 };
        break;
    }
    if (direction && this.gameState === GAME_STATE.PLAYING) {
      this.snake.setDirection(direction.x, direction.y);
      this.moveSnake();
    }

    if (key === " ") {
      if (this.gameState === GAME_STATE.STARTED) {
        this.setState(GAME_STATE.PLAYING);
      } else if (this.gameState === GAME_STATE.PAUSED) {
        this.setState(GAME_STATE.PLAYING);
      } else if (this.gameState === GAME_STATE.PLAYING) {
        this.setState(GAME_STATE.PAUSED);
      } else if (this.gameState === GAME_STATE.GAME_OVER) {
        this.resetGame();
      }
    }

    if (key === "Escape") {
      if (this.gameState === GAME_STATE.PLAYING) {
        this.setState(GAME_STATE.PAUSED);
      } else if (this.gameState === GAME_STATE.PAUSED) {
        this.setState(GAME_STATE.PLAYING);
      }
    }
  }

  checkGameOver() {
    if (this.snake.checkSelfCollision() || this.isWallCollision(this.snake.body[0])) {
      this.setState(GAME_STATE.GAME_OVER);
    }
  }

  isWallCollision(location) {
    return config.obstacles.some((obstacle) => obstacle.x === location.x && obstacle.y === location.y);
  }

  handleFoodCollision() {
    if (!this.food.location || !this.snake.checkCollision(this.food.location)) {
      return;
    }

    const points = this.food.isBonus ? 2 : 1;
    if (this.food.isBonus) {
      this.snake.halve();
    } else {
      this.snake.grow();
    }
    this.scoreHandler.incrementScore(points);
    this.food.generateFood(this.snake, config.obstacles);
    this.updateUI();
  }

  moveSnake() {
    this.snake.move();
    this.timeElapsed = 0;
    this.handleFoodCollision();
    this.checkGameOver();
  }

  update(timeDelta) {
    this.handleInput();

    if (this.gameState !== GAME_STATE.PLAYING) {
      return;
    }

    this.timeElapsed += timeDelta;

    const moveInterval = config.move_interval / 1000; // in sec

    this.handleFoodCollision();

    if (this.timeElapsed >= moveInterval) {
      this.moveSnake();
    }
  }

  render(timeDelta) {
    this.renderer.drawGrid();
    this.renderer.drawWalls(config.obstacles);
    this.renderer.drawFood(this.food);
    this.renderer.drawSnake(this.snake);
  }
}

export default Game;
