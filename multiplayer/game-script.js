"use strict";

// Global variables
let grid_buttons = document.getElementsByClassName("button");
let counting_squares = document.getElementsByClassName("counting-square");
let number_display = document.getElementById("number-display");
let remaining_display = document.getElementById("remaining-display");
let time_progress = document.getElementById("time-progress");
let high_score_display = document.getElementById("high-score-display");

// Adjust these for your application or read from external config
let speed = 100;                        // Example default if `game_properties[0]` is missing
let game_for_zero = false;             // Example default if `game_properties[1]` is "game_for_zero"
let numbers = [];                      // Will be populated from `game_properties[2]` if available
let unplaced_number_punishment = 0;    // Placeholder variable used in code
let remaining_numbers = 25;            // Starting at 25, or set as needed
let current_number = 0;                // Tracks the current number to be placed
let game_loop_interval = null;         // Interval reference
let time_progress_width = 0;           // Used to animate progress bar
let can_place = false;                 // Whether the user can place a number
let game_running = false;              // Tracks whether the game is ongoing
let wait_for_next = true;             // If true, only one placement allowed per displayed number

// Additional toggles or extras
let acab_pattern = [1, 3, 1, 2];
let acab_progress = 0;

const bomber_tagger = {
  1: "B", 2: "o", 3: "m", 4: "b", 5: "e", 6: "r",
  7: "_", 8: "T", 9: "A", 10: "G", 11: "g", 12: "E", 13: "R"
};
let bomber_tagger_enabled = false;

// If you have a function for scoring:
function calculateScore() {
  // Placeholder or real logic. Replace with your own scoring approach.
  return "FINAL SCORE: 100"; 
}

// If you have a separate array or object with game settings:
let game_properties = [/* speed */, /* "game_for_zero" or something else */, /* "numbers" string etc. */];

// ----------------------------------------------------
// Initialization
// ----------------------------------------------------
function init() {
  // If your code obtains speed, game_for_zero, or numbers from game_properties:
  // Example:
  // speed = game_properties[0];
  // game_for_zero = (game_properties[1] === "game_for_zero");
  // numbers = game_properties[2].split(",");

  // Re-cache DOM elements (in case init is called after DOM load)
  grid_buttons = document.getElementsByClassName("button");
  counting_squares = document.getElementsByClassName("counting-square");
  number_display = document.getElementById("number-display");
  remaining_display = document.getElementById("remaining-display");
  time_progress = document.getElementById("time-progress");
  high_score_display = document.getElementById("high-score-display");

  // Add event listeners to grid buttons
  for (let i = 0; i < grid_buttons.length; i++) {
    grid_buttons[i].addEventListener("click", gridBtClick);
    grid_buttons[i].id = i;
  }

  // Optionally assign IDs to counting squares if needed
  for (let i = 0; i < counting_squares.length; i++) {
    counting_squares[i].id = "c" + i;
  }

  // Possibly read or display a "high score"
  displayHighScore();

  // Start the game with a countdown
  startGameSequence();
}

// ----------------------------------------------------
//  Start & Game Sequence
// ----------------------------------------------------
function startGameSequence() {
  // A short countdown
  number_display.innerHTML = "3";
  setTimeout(() => { number_display.innerHTML = "2"; }, 1000);
  setTimeout(() => { number_display.innerHTML = "1"; }, 2000);
  setTimeout(() => {
    number_display.innerHTML = "GO!";
    // Start actual game after final countdown
    start();
  }, 3000);
}

// Start the game, main loop, etc.
function start() {
  // Reset relevant vars for new game
  game_running = true;
  can_place = true;
  wait_for_next = true;
  time_progress_width = 0;

  // Display the first number
  nextNumber();

  // game_loop_interval calls gameLoop. Speed * 10 is from your code.
  // Adjust if you want a different rate of progression
  game_loop_interval = setInterval(gameLoop, speed * 10);
}

// ----------------------------------------------------
//  Main Game Loop
// ----------------------------------------------------
function gameLoop() {
  // If time bar is at max
  if (time_progress_width >= 200) {
    // Reset time bar
    time_progress.style.width = "0px";
    time_progress_width = 0;

    // If we missed placing the number & we are in 'game_for_zero' mode
    if (can_place && game_for_zero) {
      unplaced_number_punishment += 2;
      console.log("Unplaced Number Penalty. New penalty count:", unplaced_number_punishment);
    }
    nextNumber();
  } else {
    // Increase time bar
    time_progress_width += 2;
    time_progress.style.width = time_progress_width + "px";
  }
}

// Acquire next number from array, or if done, end game
function nextNumber() {
  if (remaining_numbers <= 0 || numbers.length === 0) {
    // All numbers used, or no more
    endGame();
    return;
  }

  // Acquire next from 'numbers'
  current_number = numbers.shift();
  remaining_numbers--;
  // Display in the interface
  number_display.innerHTML = current_number;
  remaining_display.innerHTML = `Remaining: ${remaining_numbers}`;
  // Allow a single place
  can_place = true;
  wait_for_next = true;
}

// End the game
function endGame() {
  clearInterval(game_loop_interval);
  can_place = false;
  game_running = false;
  console.log("Remaining numbers:", remaining_numbers);

  // Example score
  let final_score = calculateScore();
  number_display.innerHTML = final_score;
  // Possibly store final score or do additional logic
}

// ----------------------------------------------------
//  Click Handling
// ----------------------------------------------------
function gridBtClick() {
  // ACAB pattern toggling for bomber tagger
  let clickedID = parseInt(this.id);
  if (clickedID === acab_pattern[acab_progress] && !game_running) {
    acab_progress++;
  } else {
    acab_progress = 0;
  }

  if (acab_progress === acab_pattern.length) {
    // Toggle bomber tagger
    bomber_tagger_enabled = !bomber_tagger_enabled;
    window.alert(`Bomber tagger ${bomber_tagger_enabled ? "enabled" : "disabled"}!`);
    acab_progress = 0;
  }

  // Place the number if the cell is empty and we are allowed
  if (this.innerHTML === "" && can_place && game_running) {
    // Convert current_number to bomber tag if enabled
    this.innerHTML = bomber_tagger_enabled ? toBomberTagger(current_number) : current_number;

    if (!wait_for_next) {
      // If we allow multiple placements per 'time bar', then reset
      time_progress.style.width = "0px";
      time_progress_width = 0;
      nextNumber();
    }

    if (wait_for_next) {
      can_place = false;
    }
  }
}

// Convert number to bomber tag
function toBomberTagger(num) {
  return bomber_tagger[num] || num;
}

// Convert letter back to number (not used in current code)
function fromBomberTagger(letter) {
  let found = Object.keys(bomber_tagger).find(key => bomber_tagger[key] === letter);
  return found ? parseInt(found) : null;
}

// ----------------------------------------------------
//  Helpers & Stubs
// ----------------------------------------------------
function displayHighScore() {
  // If you have logic for displaying a high score, place it here.
  // Example:
  // high_score_display.innerHTML = localStorage.getItem("HighScore") || "No high score yet";
}

// Attach init to window load if needed
window.onload = init;
