class ScoreHandler {
  constructor() {
    this.score = 0;
    this.maxScore = this.loadMaxScore();
  }

  loadMaxScore() {
    const saved = localStorage.getItem("maxScore");
    return saved ? parseInt(saved) : 0;
  }

  saveMaxScore() {
    localStorage.setItem("maxScore", this.maxScore.toString());
  }

  incrementScore(points = 1) {
    this.score += points;

    if (this.score > this.maxScore) {
      this.maxScore = this.score;
      this.saveMaxScore();
    }
  }

  reset() {
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  getMaxScore() {
    return this.maxScore;
  }
}

export default ScoreHandler;
