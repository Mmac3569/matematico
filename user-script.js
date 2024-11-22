var logged_in = false;

async function displayHighScore() {
    let query_string = window.location.search;
    let user_id = new URLSearchParams(query_string).get("id");
    let response = await fetch("http://matematico.great-site.net/matematicodb/index.php/high-score/get?id=" + user_id);
    let json = await response.json();
    if (response.ok) {
        high_score_display.innerHTML = json[0]["high-score"];
        document.getElementById("high-score-label").hidden = false;
        document.getElementById("high-score-display").hidden = false;
        logged_in = true;
    }
}

async function displayLowScore() {
    let query_string = window.location.search;
    let user_id = new URLSearchParams(query_string).get("id");
    let response = await fetch("http://matematico.great-site.net/matematicodb/index.php/low-score/get?id=" + user_id);
    let json = await response.json();
    if (response.ok) {
        if (json[0]["low-score"] == "null") {
            high_score_display.innerHTML = "N/A";
        }
        high_score_display.innerHTML = json[0]["low-score"];
        document.getElementById("high-score-label").hidden = false;
        document.getElementById("high-score-display").hidden = false;
        logged_in = true;
    }
}

async function setHighScore(value) {
    let query_string = window.location.search;
    let user_id = new URLSearchParams(query_string).get("id");
    await fetch("http://matematico.great-site.net/matematicodb/index.php/high-score/set?id=" + user_id + "&value=" + value);
    high_score_display.innerHTML = value;
}

async function setLowScore(value) {
    let query_string = window.location.search;
    let user_id = new URLSearchParams(query_string).get("id");
    await fetch("http://matematico.great-site.net/matematicodb/index.php/low-score/set?id=" + user_id + "&value=" + value);
    high_score_display.innerHTML = value;
}