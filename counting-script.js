var first_diagonal;
var second_diagonal;
var unplaced_number_punishment;

function calculateScore() {
    let score = 0;
    for(let i = 0; i < 5; i++) {
        let row_score = countPairs(createRow(i)) + countPostupky(createRow(i));
        document.getElementById("c" + i).innerHTML = row_score;
        let column_score = countPairs(createColumn(i)) + countPostupky(createColumn(i));
        document.getElementById("c" + (6 + i)).innerHTML = column_score;
        score += row_score + column_score;
    }
    createDiagonals();
    score += countPairs(first_diagonal) + countPostupky(first_diagonal);
    document.getElementById("c" + 11).innerHTML = countPairs(first_diagonal) + countPostupky(first_diagonal);
    score += countPairs(second_diagonal) + countPostupky(second_diagonal);
    document.getElementById("c" + 5).innerHTML = countPairs(second_diagonal) + countPostupky(second_diagonal);
    if (game_for_zero) {
        score += unplaced_number_punishment;
    }
    if (logged_in && score > parseInt(high_score_display.innerHTML)) {
        setHighScore(score);
        alert("Nové nejvyšší skóre! (" + score + ")");
    } else if (logged_in && game_for_zero && score < parseInt(high_score_display.innerHTML)) {
        setLowScore(score);
        alert("Nové nejnižší skóre! (" + score + ")");
    }
    return score;
}

function createDiagonals() {
    first_diagonal = [grid_buttons[0].innerHTML, grid_buttons[6].innerHTML, grid_buttons[12].innerHTML, grid_buttons[18].innerHTML, grid_buttons[24].innerHTML];
    second_diagonal = [grid_buttons[4].innerHTML, grid_buttons[8].innerHTML, grid_buttons[12].innerHTML, grid_buttons[16].innerHTML, grid_buttons[20].innerHTML];
}

function createRow(index) {
    var row = [grid_buttons[5 * index].innerHTML, grid_buttons[5 * index + 1].innerHTML, grid_buttons[5 * index + 2].innerHTML, grid_buttons[5 * index + 3].innerHTML, grid_buttons[5 * index + 4].innerHTML];
    return row;
}

function createColumn(index) {
    var column = [grid_buttons[5 * 0 + index].innerHTML, grid_buttons[5 * 1 + index].innerHTML, grid_buttons[5 * 2 + index].innerHTML, grid_buttons[5 * 3 + index].innerHTML, grid_buttons[5 * 4 + index].innerHTML];
    return column;
}

function countPairs(numbers) {
    const occurrences = {};
    let pairs = 0;
    let triples = 0;
    let quadruples = 0;

    numbers.forEach(item => {
        if(item != "") {
            occurrences[item] = (occurrences[item] || 0) + 1;
            if (occurrences[item] == 2) {
                pairs++;
            } else if (occurrences[item] == 3) {
                triples++;
                pairs--;
            } else if(occurrences[item] == 4) {
                quadruples++;
                triples--;
            }
        }
    });

    if(quadruples == 1) {
        return 4
    } else if (triples == 1 && pairs == 1) {
        return 5;
    } else if (triples == 1 && pairs == 0) {
        return 2;
    } else if (pairs == 2) {
        return 3;
    } else if (pairs == 1 && triples == 0) {
        return 1;
    } else {
        return 0;
    }
}

function countPostupky(number_strings) {
    var numbers = [];
    var postupka_len = 1;
    number_strings.forEach(item => {
        if(bomber_tagger_enabled) {
            numbers.push(parseInt(fromBomberTagger(item)));
        } else {
            numbers.push(parseInt(item));
        }
    });

    numbers.sort((a, b) => a - b);
    for (let i = 1; i < numbers.length; i++) {
        if(numbers[i] == numbers[i - 1]) {
            continue;
        } else if (numbers[i] !== numbers[i - 1] + 1) {
            if(postupka_len > 2) {
                break;
            } else {
                postupka_len = 1;
            }
        } else {
            postupka_len++;
        }
    }

    switch(postupka_len) {
        case 3:
            return 1;
        case 4:
            return 3;
        case 5:
            return 6;
        default:
            return 0;
    }
}