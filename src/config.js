export const config = {
  grid_size: 20,
  cell_size: 25,
  move_interval: 250, // in ms
  bonus_food_chance: 0.15,
  obstacles: [
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
    { x: 15, y: 13 },
    { x: 15, y: 14 },
    { x: 15, y: 15 },
  ],
  colors: {
    bg: "#ffc0cb",
    gridLines: "#f0f0f0",
    snakeHead: "#7a1f5b",
    snakeBody: "#c2185b",
    snakeBorder: "#5a123f",
    food: "#35d615",
    foodBorder: "#000000",
    bonusFood: "#ffd700",
    bonusFoodBorder: "#8b5a00",
    obstacle: "#4a1f3f",
    obstacleBorder: "#2a1024",
  },
};
