var grid_buttons = document.getElementsByClassName("button");
var counting_squares = document.getElementsByClassName("counting-square");
var number_display = document.getElementById("number-display");
var remaining_display = document.getElementById("remaining-display");
var time_progress = document.getElementById("time-progress");
var speed = 5;
var remaining_numbers = 25;
var current_number = 0;
var game_loop_interval;
var time_progress_width = 0;
var can_place = false;
var number_occurences = {};
var bomber_tagger = {1:"B", 2:"o", 3:"m", 4:"b", 5:"e", 6:"r", 7:"_", 8:"T", 9:"A", 10:"G", 11:"g", 12:"E", 13:"R"};
var bomber_tagger_enabled = true;

function init() {
    grid_buttons = document.getElementsByClassName("button");
    counting_squares = document.getElementsByClassName("counting-square");
    number_display = document.getElementById("number-display");
    remaining_display = document.getElementById("remaining-display");
    time_progress = document.getElementById("time-progress");
    speed = 5;
    remaining_numbers = 25;
    current_number = 10;
    time_progress_width = 0;
    can_place = false;
    bomber_tagger_enabled = true;
    for(i = 0; i < grid_buttons.length; i++) {
        grid_buttons[i].addEventListener("click", gridBtClick);
        grid_buttons[i].id = i;
    }
    for(i = 0; i < counting_squares.length; i++) {
        counting_squares[i].id = "c" + i;
    }
}

function startBtClick() {
    for(i = 0; i < grid_buttons.length; i++) {
        grid_buttons[i].innerHTML = "";
    }
    for(i = 0; i < counting_squares.length; i++) {
        counting_squares[i].innerHTML = "";
    }
    remaining_numbers = 25;
    newNumber();
    game_loop_interval = window.setInterval(gameLoop, speed * 10);
}

function endBtClick() {
    window.clearInterval(game_loop_interval);
    can_place = false;
    time_progress_width = 0;
    time_progress.style.width = time_progress_width + "px";
    number_display.innerHTML = calculateScore();
}

function newNumber() {
    if(remaining_numbers > 0) {
        current_number = getRndInteger(1, 13);
        console.log(number_occurences[current_number]);
        if(number_occurences[current_number] < 4 || number_occurences[current_number] == undefined) {
            if(bomber_tagger_enabled) {
                number_display.innerHTML = toBomberTagger(current_number);
            } else {
                number_display.innerHTML = current_number;
            }
            remaining_numbers--;
            remaining_display.innerHTML = "Zbývá čísel: " + remaining_numbers;
            can_place = true;
            number_occurences[current_number] = (number_occurences[current_number] || 0) + 1;
        }
        else {
            newNumber();
        }
    } else {
        window.clearInterval(game_loop_interval);
        can_place = false;
        number_display.innerHTML = calculateScore();
    }
}

function gameLoop() {
    if(time_progress_width == 200) {
        time_progress.style.width = "0px"
        time_progress_width = 0;
        newNumber();
    } else {
        time_progress_width += 2;
        time_progress.style.width = time_progress_width + "px";
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function speedChanged(new_speed) {
    speed = new_speed;
}

function gridBtClick() {
    if(this.innerHTML == "" && can_place) {
        if(bomber_tagger_enabled) {
            this.innerHTML = toBomberTagger(current_number);
        } else {
            this.innerHTML = current_number;
        }
        can_place = false;
    }
}

function toBomberTagger(number) {
    return bomber_tagger[number];
}

function fromBomberTagger(letter) {
    return parseInt(Object.keys(bomber_tagger).find(key => bomber_tagger[key] == letter));
}