var game_properties;

function handleSSE(event) {
    var data = event.data.split("||");
    console.log(data);
    switch(data[1]) {
        case "PlayerUpdate":
            handlePlayerUpdate(data);
            break;
        case "StartUpdate":
            handleStart(data);
            break;
        case "Results":
            displayResults(data);
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
    game_properties = [data[2], data[3], data[4]];
    let response = await fetch("https://matematico.great-site.net/multiplayer/game.html?v=" + Date.now());
    if(response.ok) {
        document.body.innerHTML = await response.text();
        document.getElementById("header").innerHTML += game_code;

        let styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.href = 'https://matematico.great-site.net/styles.css?v=' + Date.now();
        document.head.appendChild(styles);

        let script2 = document.createElement('script');
        script2.src = 'https://matematico.great-site.net/counting-script.js?v=' + Date.now();
        document.head.appendChild(script2);

        let script3 = document.createElement('script');
        script3.src = 'https://matematico.great-site.net/user-script.js?v=' + Date.now();
        script3.onload = function() {
            init();
        }
        document.head.appendChild(script3);

        sse_source.close();
    }
}

function displayResults(data) {
    let players = data[2].split(" ");
    for (let i = 0; i < players.length; i++) {
        document.getElementById("results-table").innerHTML += 
        `<tr>
            <td class="combination">${i}</td>
            <td class="combination">${players[i].split("#")[0]}}</td>
            <td>${players[i].split("#")[1]}</td>
        </tr>`;
    }
    let end_brs = document.getElementsByClassName("end-br");
    //end_brs[0].parentNode.removeChild(end_brs[0]);
    //end_brs[1].parentNode.removeChild(end_brs[1]);
    document.getElementById("results-table").hidden = false;
    document.getElementById("results-header").hidden = false;
    document.getElementById("results-table").parentNode.appendChild(document.createElement("br"));
    document.getElementById("results-table").parentNode.appendChild(document.createElement("br"));
    document.getElementById("results-header").scrollIntoView({ behavior: 'smooth' });
}