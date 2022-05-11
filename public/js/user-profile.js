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

//----------------------------------------------------------------------
// takes the whole path as a parameter.
// eg. user-profile/testuser
// Calls displayProfileInfo
//----------------------------------------------------------------------
async function getProfileInfo(path) {
    const requestId = path.substring(path.lastIndexOf('/'));
    console.log(requestId);
    try {
        let response = await fetch(`/profile-info${requestId}`, {
            method: 'GET'
        });
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            displayProfileInfo(data);
        } else {
            console.log(response.status, response.text);
        }
    } catch(error) {
        console.log(error);
    }
}

getProfileInfo(window.location.pathname);

//--------------------------------------------------
// Takes the profile info as a JSON object
// Displays the info on the profile page
//--------------------------------------------------
function displayProfileInfo(data) {
    document.getElementById("user-quote").innerHTML = data.quote;
    document.getElementById("user-description").innerHTML = data.userDescription;
    if (data.showLoc) {
        document.getElementById("user-location").innerHTML = data.city + ", " + data.province + ", " + data.country;
    } else {
        document.getElementById("user-location").innerHTML = "Location hidden"
    }
    console.log(data.showEmail);
    if (data.showEmail) {
        getemail();
    } else {
        document.getElementById("user-email").innerHTML = "Email hidden";
    }
    
    document.getElementById("user-quote").innerHTML = data.quote;
    document.getElementById("user-quote").innerHTML = data.quote;
}