

function handleSSE(event) {
    var data = event.data.split("||");
    console.log(event.data);
    console.log(data);
    switch(data[1]) {
        case "PlayerUpdate":
            handlePlayerUpdate(data);
            break;
        case "GameStart":
            break;
        default:
            break;
    }
}

function handlePlayerUpdate(data) {
    if(data[3] == "join") {
        document.getElementById("players-div").innerHTML += data[2];
    } else if (data[3] == "leave") {

    }
}