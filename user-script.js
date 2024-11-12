
async function displayHighScore() {
    let query_string = window.location.search;
    let user_id = new URLSearchParams(query_string).get("id");
    let response = await fetch("http://matematico.great-site.net/matematicodb/index.php/high-score/get?id=" + user_id);
    let json = await response.json();
    if (response.ok) {
        console.log(json[0]["high-score"]);
        high_score_display.innerHTML = json[0]["high-score"];
    }
}

async function setHighScore(value) {
    let query_string = window.location.search;
    let user_id = new URLSearchParams(query_string).get("id");
    await fetch("http://matematico.great-site.net/matematicodb/index.php/high-score/set?id=" + user_id + "&value=" + value);
}