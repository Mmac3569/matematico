var game_code;
var sse_source;

async function joinGame() {
    let code_input = document.getElementById("code-in").value;
    let user_id = new URLSearchParams(window.location.search).get("id");
    if(user_id == null) {
        alert("Abyste mohli hrát multiplayer musíte se přihlásit nebo zaregistrovat!");
        return -1;
    }
    let response = await fetch(`http://matematico.great-site.net/matematicodb/index.php/multiplayer/join?code=x${code_input}x&id=${user_id}`);
    if(response.ok) {
        alert("join successful");
        game_code = code_input;
        sse_source = new EventSource("http://matematico.great-site.net/matematicodb/Controller/SSE/GameSSE.php");
        sse_source.onmessage = handleSSE;
        let response_json = await response.json();
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
    let response = await fetch(`http://matematico.great-site.net/matematicodb/index.php/multiplayer/create?id=${user_id}`);
    if(response.ok) {
        alert("create successful");
        let response_text = await response.text();
        game_code = response_text.split("\n")[0];
        sse_source = new EventSource("http://matematico.great-site.net/matematicodb/Controller/SSE/GameSSE.php");
        sse_source.onmessage = handleSSE;
        showParty(true, response_text.split("\n")[1]);
    } else {
        alert("Přihlášení není platné");
    }
}

async function showParty(master, players) {
    let response = await fetch("http://matematico.great-site.net/multiplayer/party.html?v=" + Date.now());
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