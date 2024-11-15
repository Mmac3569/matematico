var username_input;
var password_input;
var new_username_input;
var new_password_input;
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
        window.location.href = "http://matematico.great-site.net?id=" + json;
    } else {
        alert("Invalid password or username");
    }
}

async function registerBtClick() {
    getValues();
    response = await fetch(`http://matematico.great-site.net/matematicodb/index.php/register?username=${new_username_input}&password=${new_password_input}`);
    if (response.ok) {
        alert("You've been registered successfuly! You can login now.");
    } else {
        alert("Failed to register, account may exist already.");
    }
}

function getValues() {
    username_input = document.getElementById("username_in").value;
    password_input = document.getElementById("password_in").value;
    new_username_input = document.getElementById("new_username_in").value;
    new_password_input = document.getElementById("new_password_in").value;
}