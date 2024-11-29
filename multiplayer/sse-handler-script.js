

function handleSSE(event) {
    let data = event.data.split("\n");
    if(data[0] != game_code) {
        return 0;
    }
    switch(data[1]) {
        case "PlayerUpdate":
            handlePlayerUpdate();
            break;
        case "GameStart":
            break;
        default:
            break;
    }
}

function handlePlayerUpdate(data) {
    if(data[3] == "join") {

    } else if (data[3] == "leave") {

    }
}