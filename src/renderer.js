import { config } from "./config.js";

class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.canvasWidth = config.grid_size * config.cell_size;
    this.canvasHeight = config.grid_size * config.cell_size;
  }

  clear() {
    this.ctx.fillStyle = config.colors.bg;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  drawGrid() {
    this.clear();

    this.ctx.strokeStyle = config.colors.gridLines;
    this.ctx.lineWidth = 0.5;

    // verticle lines
    for (let x = 0; x <= config.grid_size; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * config.cell_size, 0);
      this.ctx.lineTo(x * config.cell_size, this.canvasHeight);
      this.ctx.stroke();
    }

    //horizontal lines
    for (let y = 0; y <= config.grid_size; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * config.cell_size);
      this.ctx.lineTo(this.canvasWidth, y * config.cell_size);
      this.ctx.stroke();
    }
  }

  drawWalls(walls) {
    if (!this.ctx) return;

    walls.forEach((wall) => {
      let x = (wall.x - 1) * config.cell_size;
      let y = (wall.y - 1) * config.cell_size;

      this.ctx.fillStyle = config.colors.obstacle;
      this.ctx.fillRect(x, y, config.cell_size, config.cell_size);
      this.ctx.strokeStyle = config.colors.obstacleBorder;
      this.ctx.lineWidth = 1.5;
      this.ctx.strokeRect(x, y, config.cell_size, config.cell_size);
    });
  }

  drawSnake(snake) {
    if (!this.ctx) return;

    snake.body.forEach((part, idx) => {
      let x = (part.x - 1) * config.cell_size;
      let y = (part.y - 1) * config.cell_size;

      if (idx === 0) {
        this.ctx.fillStyle = config.colors.snakeHead;
      } else {
        this.ctx.fillStyle = config.colors.snakeBody;
      }

      this.ctx.fillRect(x, y, config.cell_size, config.cell_size);
      this.ctx.strokeStyle = config.colors.snakeBorder;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.strokeRect(x, y, config.cell_size, config.cell_size);
      this.ctx.stroke();
    });
  }

  drawFood(food) {
    if (!food || !food.location) return;
    if (!this.ctx) return;

    let location = food.location;
    let x = (location.x - 1) * config.cell_size;
    let y = (location.y - 1) * config.cell_size;

    if (food.isBonus) {
      const inset = config.cell_size * 0.18;
      this.ctx.fillStyle = config.colors.bonusFood;
      this.ctx.fillRect(x + inset, y + inset, config.cell_size - inset * 2, config.cell_size - inset * 2);
      this.ctx.strokeStyle = config.colors.bonusFoodBorder;
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(x + inset, y + inset, config.cell_size - inset * 2, config.cell_size - inset * 2);
      return;
    }

    let radius = (config.cell_size / 2) * 0.7;
    this.ctx.beginPath();
    this.ctx.fillStyle = config.colors.food;
    this.ctx.strokeStyle = config.colors.foodBorder;
    this.ctx.lineWidth = 1.5;
    this.ctx.arc(x + config.cell_size / 2, y + config.cell_size / 2, radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
  }
}

export default Renderer;
