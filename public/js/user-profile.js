"use strict";
function getname() {
    const getname = new XMLHttpRequest();
    getname.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("username").innerHTML = this.responseText;
        }
    }
    getname.open("GET", "/username", true);
    getname.send();
}
getname();


function getemail() {
    const getemail = new XMLHttpRequest();
    getemail.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("user-email").innerHTML = this.responseText;
        }
    }
    getemail.open("GET", "/email", true);
    getemail.send();
}
getemail();

// Sends the user to the edit-profile page
// Will have to change this tell what users page
// If we use this for admin edits too
document.querySelector("#edit-button").addEventListener("click", () => {
    window.location.href = "/edit-profile";
});

document.querySelector("#dogs-option").addEventListener("click", () => {
    getdogs();
});

function getdogs() {
    const getdogs = new XMLHttpRequest();
    getname.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("menu-display").innerHTML = this.responseText;
        }
    }
    getdogs.open("GET", "/dogs", true);
    getdogs.send();
}

// getdogs();