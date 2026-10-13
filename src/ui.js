class UIHandler {
  constructor() {
    this.scoreTextElement = document.querySelector("#score");
    this.maxScoreElement = document.querySelector("#maxscore");
    this.gameStateElement = document.querySelector("#game-state");
  }

  updateScoreText(score) {
    this.scoreTextElement.innerHTML = score.toString().padStart(2, "0");
  }

  updateMaxScoreText(maxScore) {
    this.maxScoreElement.innerHTML = maxScore.toString().padStart(2, "0");
  }

  updateGameStateText(gameState) {
    this.gameStateElement.innerHTML = gameState;
  }
}

export default UIHandler;
