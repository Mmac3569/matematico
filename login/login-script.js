var username_input;
var password_input;
var response;

async function loginBtClick() {
    getValues();
    response = await fetch(`http://matematico.great-site.net/matematicodb/index.php/login?username=${username_input}&password=${password_input}`, {
        headers: {
            "Accept": "application/json, text/html, */*",
        }
    });
    if(response.ok) {
        let json = await response.json();
        window.location.href = "http://matematico.great-site.net?i=" + json[0]["ID"];
    } else {
        alert("Invalid password or username");
    }
}

function getValues() {
    username_input = document.getElementById("username_in").value;
    password_input = document.getElementById("password_in").value;
}