import { config } from "./config.js";

class Food {
  constructor() {
    this.location = null;
    this.isBonus = false;
  }

  generateFood(snake, obstacles = []) {
    let attempts = 0;
    const maxAttempts = config.grid_size * config.grid_size;

    do {
      this.location = {
        x: Math.floor(Math.random() * config.grid_size) + 1,
        y: Math.floor(Math.random() * config.grid_size) + 1,
      };
      attempts++;
    } while (
      (snake.checkCollision(this.location) || this.isObstacle(this.location, obstacles)) &&
      attempts < maxAttempts
    );

    this.isBonus = Math.random() < config.bonus_food_chance;

    if (attempts >= maxAttempts) {
      console.log("You win! Grid is full!");
    }
  }

  isObstacle(location, obstacles) {
    return obstacles.some((obstacle) => obstacle.x === location.x && obstacle.y === location.y);
  }
}

export default Food;
