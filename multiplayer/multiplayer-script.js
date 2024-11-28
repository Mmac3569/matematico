

async function joinGame() {
    let code_input = "|" + document.getElementById("code-in").value + "|";
    let user_id = new URLSearchParams(window.location.search).get("id");
    if(user_id == null) {
        alert("Abyste mohli hrát multiplayer musíte se přihlásit nebo zaregistrovat!");
        return -1;
    }
    response = await fetch(`http://matematico.great-site.net/matematicodb/index.php/multiplayer/join?code=${code_input}&id=${user_id}`);
    if(response.ok) {
        alert("join successful");
    } else {
        alert("Kód " + code_input + " neexistuje");
    }
}