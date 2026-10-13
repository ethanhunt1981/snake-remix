class InputHandler {
  constructor() {
    this.latestKey = null;
    this.keys = {};

    this.setupListeners();
  }

  setupListeners() {
    window.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Escape"].includes(e.key)) {
        e.preventDefault();
      }

      this.handleKeyDown(e.key);
    });

    window.addEventListener("keyup", (e) => {
      delete this.keys[e.key];
    });
  }

  handleKeyDown(key) {
    this.keys[key] = true;
    this.latestKey = key;
  }

  getLatestInput() {
    const input = this.latestKey;
    this.latestKey = null;
    return input;
  }

  isKeyPressed(key) {
    return this.keys[key] === true;
  }
}

export default InputHandler;
