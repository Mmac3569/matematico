var game_code;

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
        game_code = response.body;
    } else {
        alert("Přihlášení není platné");
    }
}