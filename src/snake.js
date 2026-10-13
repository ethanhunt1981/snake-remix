import { config } from "./config.js";

class Snake {
  constructor(x, y) {
    this.initialPosition = { x: x, y: y };
    this.body = [{ x: x, y: y }];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.pendingGrowth = 0;
  }

  reset() {
    this.body = [{ x: this.initialPosition.x, y: this.initialPosition.y }];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = this.direction;
    this.pendingGrowth = 0;
  }

  setDirection(x, y) {
    if ((x === -this.direction.x && y === -this.direction.y) || (x === this.direction.x && y === this.direction.y)) {
      return;
    }

    this.nextDirection = { x: x, y: y };
  }

  move() {
    let newHead = {
      x: this.body[0].x + this.nextDirection.x,
      y: this.body[0].y + this.nextDirection.y,
    };

    if (newHead.x > config.grid_size) {
      newHead.x = 1;
    }

    if (newHead.x < 1) {
      newHead.x = config.grid_size;
    }

    if (newHead.y > config.grid_size) {
      newHead.y = 1;
    }

    if (newHead.y < 1) {
      newHead.y = config.grid_size;
    }

    this.body.unshift(newHead);

    if (this.pendingGrowth > 0) {
      this.pendingGrowth--;
    } else {
      this.body.pop();
    }

    this.direction = this.nextDirection;
  }

  grow() {
    this.pendingGrowth++;
  }

  halve() {
    const targetLength = Math.max(2, Math.ceil(this.body.length / 2));
    this.body = this.body.slice(0, targetLength);
    this.pendingGrowth = 0;
  }

  checkSelfCollision() {
    let head = this.body[0];
    let restOftheBody = this.body.slice(1);

    return restOftheBody.some((part) => part.x === head.x && part.y === head.y);
  }

  checkCollision(itemLocation) {
    return this.body.some((part) => part.x === itemLocation.x && part.y === itemLocation.y);
  }
}

export default Snake;
