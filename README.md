# SCRAMBLEX - Neural Word Puzzle

<p align="center">
  <b>A futuristic word scramble game built with HTML, CSS, and JavaScript.</b><br/>
  Decode words, beat the timer, build streaks, and climb your score.
</p>

<p align="center">
  <img alt="HTML" src="https://img.shields.io/badge/HTML-5-orange?logo=html5&logoColor=white" />
  <img alt="CSS" src="https://img.shields.io/badge/CSS-3-blue?logo=css3&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&logoColor=black" />
  <img alt="Status" src="https://img.shields.io/badge/Status-Playable-00c853" />
</p>

---

## Overview

**SCRAMBLEX** is a neon-themed browser game where players unscramble words under time pressure.  
The game features multiple difficulty modes, dynamic timers, live scoring, streak bonuses, hints, and a game-over summary with accuracy stats.

---

## Features

- Three difficulty levels: `Easy`, `Medium`, `Hard`
- Dynamic countdown timer based on difficulty and level
- Scoring system with:
  - Base points for correct answers
  - Streak bonus
  - Speed bonus
  - No-hint bonus
- Hint system with score penalty (`-5` points)
- Skip functionality for moving to the next word
- Live game stats:
  - Score
  - Level
  - Streak
  - Timer
- End-of-game modal with:
  - Final score
  - Words solved
  - Best streak
  - Accuracy percentage
- Futuristic UI with animated grid, particles, glow effects, and responsive design

---

## Gameplay Rules

1. Choose a difficulty to start.
2. Unscramble the displayed word before the timer reaches zero.
3. Submit your answer using the **Submit** button or `Enter` key.
4. Use **Hint** if needed (`-5` points).
5. Use **Skip** to move to a new word.
6. Keep solving to increase your level and maximize score.

---

## Scoring System

- Correct answer: `+10` points
- Streak bonus (streak >= 3): `+5` points
- Speed bonus (answer in first half of timer): `+5` points
- No-hint bonus: `+5` points
- Wrong answer: `-5` points (minimum score is `0`)
- Hint used: `-5` points

---

## Difficulty and Timer

Base timer per word:

- `Easy`: 45s
- `Medium`: 30s
- `Hard`: 20s

Timer also gets shorter as level increases.

---

## Project Structure

```text
Word-scramble-game/
|- index.html   # Game layout and UI elements
|- style.css    # Neon theme, animations, responsive styles
|- script.js    # Game logic, scoring, timer, word handling
```

---

## How to Run Locally

1. Clone or download this repository.
2. Open the project folder.
3. Launch `index.html` in your browser.

No build tools or dependencies required.

---

## Tech Stack

- HTML5
- CSS3 (custom animations and responsive design)
- Vanilla JavaScript (ES6)

---

## Future Improvements

- Add sound effects and music controls
- Save high scores with `localStorage`
- Expand word database categories
- Add keyboard shortcuts and accessibility enhancements
- Add multiplayer or challenge mode

---

## Author

Made by **Your Name**  
Replace this with your GitHub profile link:

```text
https://github.com/your-username
```

---

## License

This project is open source and available under the **MIT License**.
