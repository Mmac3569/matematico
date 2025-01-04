var grid_buttons = document.getElementsByClassName("button");
var counting_squares = document.getElementsByClassName("counting-square");
var number_display = document.getElementById("number-display");
var remaining_display = document.getElementById("remaining-display");
var time_progress = document.getElementById("time-progress");
var high_score_display = document.getElementById("high-score-display");
var speed;
var remaining_numbers = 25;
var current_number = 0;
var game_loop_interval;
var time_progress_width = 0;
var can_place = false;
var game_running = false;
var acab_pattern = [1, 3, 1, 2];
var acab_progress = 0;
var bomber_tagger = {1:"B", 2:"o", 3:"m", 4:"b", 5:"e", 6:"r", 7:"_", 8:"T", 9:"A", 10:"G", 11:"g", 12:"E", 13:"R"};
var bomber_tagger_enabled = false;
var wait_for_next = true;
var game_for_zero;
var numbers = [];

init();

function init() {
    grid_buttons = document.getElementsByClassName("button");
    counting_squares = document.getElementsByClassName("counting-square");
    number_display = document.getElementById("number-display");
    remaining_display = document.getElementById("remaining-display");
    time_progress = document.getElementById("time-progress");
    high_score_display = document.getElementById("high-score-display");
    for(i = 0; i < grid_buttons.length; i++) {
        grid_buttons[i].addEventListener("click", gridBtClick);
        grid_buttons[i].id = i;
    }
    for(i = 0; i < counting_squares.length; i++) {
        counting_squares[i].id = "c" + i;
    }
    displayHighScore();
    speed = game_properties[0];
    game_for_zero = game_properties[1] == "game_for_zero";
    numbers = game_properties[2].split(",");
    start();
}

function start() {
    let count = 3;
    
    const intervalId = setInterval(() => {
        if (count === 0) {
            clearInterval(intervalId);
            number_display.innerHTML = "GO!";
            setTimeout(() => {
                game_running = true;
                can_place = true;
                game_loop_interval = window.setInterval(gameLoop, speed * 10);
            }, 1000);
        } else {
            number_display.innerHTML = count;
        }
        count--;
    }, 1000);
}

function gameLoop() {
    if(time_progress_width == 200) {
        time_progress.style.width = "0px";
        time_progress_width = 0;
        if(can_place && game_for_zero) {
            unplaced_number_punishment += 2;
            console.log(can_place);
        }
        nextNumber();
    } else {
        time_progress_width += 2;
        time_progress.style.width = time_progress_width + "px";
    }
}

function nextNumber() {
    if(remaining_numbers > 0) {
        current_number = numbers.shift();
        number_display.innerHTML = current_number;
        remaining_numbers--;
        remaining_display.innerHTML = "Zbývá čísel: " + remaining_numbers;
        can_place = true;
    } else {
        window.clearInterval(game_loop_interval);
        can_place = false;
        console.log(remaining_numbers);
        number_display.innerHTML = calculateScore();
        game_running = false;
    }
}

function gridBtClick() {
    if(this.id == acab_pattern[acab_progress] && !game_running) {
        acab_progress++;
    } else {
        acab_progress = 0;
    }
    if(acab_progress == 4) {
        if(bomber_tagger_enabled) {
            bomber_tagger_enabled = false;
            window.alert("Bomber tagger disabled!");
        } else {
            bomber_tagger_enabled = true;
            window.alert("Bomber tagger enabled!");
        }
        acab_progress = 0;
    }
    if(this.innerHTML == "" && can_place) {
        if(bomber_tagger_enabled) {
            this.innerHTML = toBomberTagger(current_number);
        } else {
            this.innerHTML = current_number;
        }
        if (!wait_for_next) {
            time_progress.style.width = "0px";
            time_progress_width = 0;
            newNumber();
        }
        if (wait_for_next) {
            can_place = false;
        }
    }
}

function toBomberTagger(number) {
    return bomber_tagger[number];
}

function fromBomberTagger(letter) {
    return parseInt(Object.keys(bomber_tagger).find(key => bomber_tagger[key] == letter));
}