# 🐍 Snake Remix

An extended Snake remix built with vanilla JavaScript, clean architecture principles, and modern design patterns. Classic arcade movement meets tactical risk-reward decisions: walls make the board dangerous, while Superfood can save a snake that has grown too long.

![Snake Game](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![Architecture](https://img.shields.io/badge/Architecture-MVC-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🎮 Features

- **Classic Snake Gameplay** - Eat food, grow longer, avoid hitting yourself
- **Smooth Controls** - Arrow keys or WASD for movement
- **Game States** - Start, Playing, Paused, Game Over
- **Score Tracking** - Current score and high score persistence (localStorage)
- **Fixed Obstacles** - Walls are placed on the board and touching one causes Game Over
- **Tactical Superfood** - Rare Superfood awards double points but halves the snake instead of making it grow
- **Responsive UI** - Clean, modern interface
- **Wraparound Edges** - Snake wraps around screen edges

## 🕹️ Controls

| Key        | Action                                |
| ---------- | ------------------------------------- |
| `SPACE`    | Start game / Pause / Resume / Restart |
| `ESC`      | Pause / Resume                        |
| `↑` or `W` | Move Up                               |
| `↓` or `S` | Move Down                             |
| `←` or `A` | Move Left                             |
| `→` or `D` | Move Right                            |

## 🚀 How to Run

1. **Clone the repository**

   ```bash
    git clone https://github.com/ethanhunt1981/snake-remix.git
    cd snake-remix
   ```

2. **Open in browser**

   - Simply open `index.html` in your browser
   - Or use a local server:

     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx http-server
     ```

3. **Play!**
   - Press `SPACE` to start
   - Use arrow keys or WASD to move
  - Eat the green food to grow and score points
  - Collect the gold Superfood for double points and a strategic length reset

## 🏗️ Architecture

This project implements a **Component-based MVC architecture** with clean separation of concerns:

```
src/
├── game.js         # Game controller & orchestration
├── snake.js        # Snake entity (model)
├── food.js         # Food entity (model)
├── renderer.js     # Canvas rendering (view)
├── ui.js           # DOM UI updates (view)
├── score.js        # Score management & persistence
├── input.js        # Input handling
└── config.js       # Game configuration
```

## ⚙️ Configuration

Game settings can be modified in `src/config.js`:

```javascript
export const config = {
  grid_size: 20, // Grid dimensions (20x20)
  cell_size: 25, // Size of each cell in pixels
  move_interval: 250, // Snake movement speed (ms)
  bonus_food_chance: 0.15, // Chance of spawning Superfood
  obstacles: [
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
    // ... fixed wall coordinates
  ],
  colors: {
    bg: "#ffc0cb", // Background color
    gridLines: "#f0f0f0", // Grid line color
    snakeHead: "#7a1f5b", // Snake head color
    snakeBody: "#c2185b", // Snake body color
    food: "#35d615", // Food color
    bonusFood: "#ffd700", // Superfood color
    // ...
  },
};
```

## Technologies

- **Vanilla JavaScript (ES6+)** - Modern JavaScript features
- **HTML5 Canvas** - 2D graphics rendering
- **CSS3** - Styling and layout
- **LocalStorage API** - Score persistence

## Learning Outcomes

This project demonstrates:

1. **Clean Architecture** - Proper separation of concerns
2. **Design Patterns** - MVC, State, Dependency Injection
3. **Game Development** - Game loop, entity management, rendering
4. **Canvas API** - 2D graphics and animations
5. **State Management** - Game state handling
6. **Event Handling** - Keyboard input processing
7. **Data Persistence** - localStorage usage

## Future Enhancements

Potential features to add:

- [ ] Difficulty levels (speed adjustments)
- [ ] Power-ups (speed boost, slow down, etc.)
- [ ] Sound effects and background music
- [ ] Mobile touch controls
- [ ] Multiplayer mode
- [ ] Different game modes
- [ ] Leaderboard system

## 👤 Author

**ethanhunt1981** (Remix based on Himanshu Varshney's original project)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
