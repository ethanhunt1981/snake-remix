import { config } from "./src/config.js";
import Game from "./src/game.js";
import InputHandler from "./src/input.js";

const canvas = document.getElementById("gameCanvas");

canvas.width = config.grid_size * config.cell_size;
canvas.height = config.grid_size * config.cell_size;

let inputHandler = new InputHandler();

let game = new Game(canvas, inputHandler);
game.init();

let lastTime = 0;

function tick(currentTime = 0) {
  let timeDelta = (currentTime - lastTime) / 1000;

  game.update(timeDelta);
  game.render(timeDelta);

  lastTime = currentTime;

  requestAnimationFrame(tick);
}

tick();
