var game_code;
var sse_source;
var username;
var speed = 5;

async function joinGame() {
    let code_input = document.getElementById("code-in").value;
    let user_id = new URLSearchParams(window.location.search).get("id");
    if(user_id == null) {
        alert("Abyste mohli hrát multiplayer musíte se přihlásit nebo zaregistrovat!");
        return -1;
    }
    let response = await fetch(`https://matematico.great-site.net/matematicodb/index.php/multiplayer/join?code=x${code_input}x&id=${user_id}`);
    if(response.ok) {
        alert("join successful");
        game_code = code_input;
        let response_json = await response.json();
        sse_source = new EventSource("https://matematico.great-site.net/matematicodb/Controller/SSE/GameSSE.php?username=" + user_id);
        sse_source.onmessage = handleSSE;
        console.log(response_json);
        showParty(false, response_json);
    } else {
        alert("Kód " + code_input + " neexistuje nebo přihlášení není platné");
    }
}

async function createNewGame() {
    let user_id = new URLSearchParams(window.location.search).get("id");
    if(user_id == null) {
        alert("Abyste mohli hrát multiplayer musíte se přihlásit nebo zaregistrovat!");
        return -1;
    }
    let response = await fetch(`https://matematico.great-site.net/matematicodb/index.php/multiplayer/create?id=${user_id}`);
    if(response.ok) {
        alert("create successful");
        let response_text = await response.text();
        game_code = response_text.split("\n")[0];
        if(typeof(EventSource) !== "undefined") {
            console.log("sse supported");
          } else {
            console.log("sse not supported");
          }
        sse_source = new EventSource("https://matematico.great-site.net/matematicodb/Controller/SSE/GameSSE.php?username=" + user_id);
        sse_source.onmessage = handleSSE;
        showParty(true, response_text.split("\n")[1]);
    } else {
        alert("Přihlášení není platné");
    }
}

function startGame() {
    document.getElementById("start").disabled = true;
    let game_for_zero = document.getElementById("game-for-zero").checked;
    if(game_for_zero) {
        fetch(`https://matematico.great-site.net/matematicodb/index.php/multiplayer/start?code=x${game_code}x&speed=${speed}&mode=game_for_zero`);
    } else {
        fetch(`https://matematico.great-site.net/matematicodb/index.php/multiplayer/start?code=x${game_code}x&speed=${speed}&mode=classic`);
    }
}

function sendResults(score) {
    let user_id = new URLSearchParams(window.location.search).get("id");
    if(game_for_zero) {
        fetch(`https://matematico.great-site.net/matematicodb/index.php/multiplayer/result?code=${game_code}&username=${username}&id=${user_id}&score=${score}&mode=game_for_zero`);
    } else {
        fetch(`https://matematico.great-site.net/matematicodb/index.php/multiplayer/result?code=${game_code}&username=${username}&id=${user_id}&score=${score}&mode=classic`);
    }
    sse_source = new EventSource("https://matematico.great-site.net/matematicodb/Controller/SSE/GameSSE.php?username=" + user_id);
    sse_source.onmessage = handleSSE;
}

function speedChanged(new_speed) {
    speed = new_speed;
}

async function showParty(master, players) {
    if(master) {
        username = players;
    } else {
        username = players[0]["username"];
    }
    let response = await fetch("https://matematico.great-site.net/multiplayer/party.html?v=" + Date.now());
    if(response.ok) {
        document.body.innerHTML = await response.text();
        document.getElementById("header").innerHTML += game_code;
        if(master) {
            let elements = document.getElementsByClassName("game-controls");
            for(var i = 0; i < elements.length; i++) {
                elements[i].disabled = false;
            }
            console.log(players);
            addPlayer(players, true);
        } else {
            console.log(players);
            addPlayer(players, false);
        }
    }
}

function addPlayer(username, single) {
    console.log(username);
    console.log(single);
    if(single) {
        document.getElementById("players-div").innerHTML += "<h5>" + username + "</h5>";
    } else if(!single) {
        for(let i = 0; i < username.length; i++) {
            document.getElementById("players-div").innerHTML += "<h5>" + username[i]["username"] + "</h5>";
        }
    }
}