

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
    let response = await fetch("https://matematico.great-site.net/multiplayer/game.html?v=" + Date.now());
    if(response.ok) {
        document.body.innerHTML = await response.text();
        document.getElementById("header").innerHTML += game_code;

        let styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.href = 'https://matematico.great-site.net/styles.css?v=' + Date.now();
        document.head.appendChild(styles);

        let script1 = document.createElement('script');
        script1.src = 'https://matematico.great-site.net/script.js?v=' + Date.now();
        document.head.appendChild(script1);

        let script2 = document.createElement('script');
        script2.src = 'https://matematico.great-site.net/counting-script.js?v=' + Date.now();
        document.head.appendChild(script2);

        let script3 = document.createElement('script');
        script3.src = 'https://matematico.great-site.net/user-script.js?v=' + Date.now();
        document.head.appendChild(script3);

        sse_source.close();
    }
}