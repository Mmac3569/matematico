

function handleSSE(event) {
    var data = event.data.split("||");
    console.log(event.data);
    console.log(data);
    switch(data[1]) {
        case "PlayerUpdate":
            handlePlayerUpdate(data);
            break;
        case "StartUpdate":
            handleStart(data);
            break;
        default:
            break;
    }
}

function handlePlayerUpdate(data) {
    if(data[3] == "join") {
        addPlayer(data[2], true);
    } else if (data[3] == "leave") {
        
    }
}

async function handleStart(data) {
    let response = await fetch("http://matematico.great-site.net/multiplayer/game.html?v=" + Date.now());
    if(response.ok) {
        document.body.innerHTML = await response.text();
        document.getElementById("header").innerHTML += game_code;
    }
}