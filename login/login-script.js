var username_input;
var password_input;
var response;
var json;

async function loginBtClick() {
    getValues();
    response = await fetch(`http://matematico.great-site.net/matematicodb/index.php/login?username=${username_input}&password=${password_input}`, {
        headers: {
            "Accept": "application/json, text/html, */*",
        }
    });
    if(response.ok) {
        json = await response.json();
        console.log(json[0]["ID"]);
        //window.location.href = "http://matematico.great-site.net?i=" + await response.json();
    } else {
        alert("Invalid password or username");
    }
}

function getValues() {
    username_input = document.getElementById("username_in").value;
    password_input = document.getElementById("password_in").value;
}