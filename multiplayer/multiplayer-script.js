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
        showParty();
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
        game_code = await response.text();
        sse_source = new EventSource("http://matematico.great-site.net/matematicodb/Controller/SSE/GameSSE.php");
        sse_source.onmessage = handleSSE;
        showParty();
    } else {
        alert("Přihlášení není platné");
    }
}

async function showParty() {
    let response = await fetch("http://matematico.great-site.net/multiplayer/party.html");
    if(response.ok) {
        document.body = await response.body;
    }
}