"use strict";

function getemail() {
    const getemail = new XMLHttpRequest();
    getemail.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("email").value = this.responseText;
        }
    }
    getemail.open("GET", "/email", true);
    getemail.send();
}

function getname() {
    const getname = new XMLHttpRequest();
    getname.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("username-name").value = this.responseText;
        }
    }
    getname.open("GET", "/username", true);
    getname.send();
}

getname();
getemail();

async function updateUsername() {
    let newUsername = document.getElementById("username-name").value;    
    let path = window.location.pathname;
    const requestId = path.substring(path.lastIndexOf('/'));
    try {
        let responseObject = await fetch(`/update-username${requestId}`, {
            method: 'POST',
            headers: { "Accept": 'application/json',
                       "Content-Type": 'application/json'
            },
            body: JSON.stringify(newUsername)
        });
        
        let parsedJSON = await responseObject.json();
        
        if (parsedJSON.status == "success") {
            document.getElementById("username-filler").classList.add("no-show");
            document.getElementById("username-update-success").classList.remove("no-show");
        } else {
            document.getElementById("username-filler").classList.add("no-show");
            document.getElementById("username-update-failure").classList.remove("no-show");
        }
    } catch(error) {
        console.log(error);
    }
}
