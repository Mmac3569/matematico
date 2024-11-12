class user {
    constructor() {

    }

    async displayHighScore() {
        let query_string = window.location.search;
        let user_id = new URLSearchParams(query_string).get("id");
        let response = await fetch("http://matematico.great-site.net/matematicodb/index.php/high-score?id=" + user_id);
        let json = await response.json();
        if (response.ok) {
            console.log(json[0]["high-score"]);
            high_score_display = json[0]["high-score"];
        }
    }
}