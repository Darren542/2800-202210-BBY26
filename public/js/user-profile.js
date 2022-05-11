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
    getDogs();
});

document.querySelector("#photos-option").addEventListener("click", () => {
    getPhotos();
});

document.querySelector("#groups-option").addEventListener("click", () => {
    getGroups();
});

document.querySelector("#events-option").addEventListener("click", () => {
    getEvents();
});

function getDogs() {
    const theDogs = new XMLHttpRequest();
    theDogs.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("menu-display").innerHTML = this.responseText;
        }
    }
    theDogs.open("GET", "/dogs", true);
    theDogs.send();
    updateProfileMenu("dogs-option");
}

function getPhotos() {
    const thePhotos = new XMLHttpRequest();
    thePhotos.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("menu-display").innerHTML = this.responseText;
        }
    }
    thePhotos.open("GET", "/photos", true);
    thePhotos.send();
    updateProfileMenu("photos-option");
}

function getGroups() {
    const theGroups = new XMLHttpRequest();
    theGroups.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("menu-display").innerHTML = this.responseText;
        }
    }
    theGroups.open("GET", "/my-groups", true);
    theGroups.send();
    updateProfileMenu("groups-option");
}

function getEvents() {
    const theEvents = new XMLHttpRequest();
    theEvents.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("menu-display").innerHTML = this.responseText;
        }
    }
    theEvents.open("GET", "/my-events", true);
    theEvents.send();
    updateProfileMenu("events-option");
}


getDogs();

//----------------------------------------------------------------------
// takes the whole path as a parameter.
// eg. user-profile/testuser
// Calls displayProfileInfo
//----------------------------------------------------------------------
async function getProfileInfo(path) {
    const requestId = path.substring(path.lastIndexOf('/'));
    try {
        let response = await fetch(`/profile-info${requestId}`, {
            method: 'GET'
        });
        if (response.status === 200) {
            let data = await response.json();
            displayProfileInfo(data);
        } else {
            console.log(response.status);
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
    if (data.showEmail) {
        getemail();
    } else {
        document.getElementById("user-email").innerHTML = "Email hidden";
    }
    
    document.getElementById("user-quote").innerHTML = data.quote;
    document.getElementById("user-quote").innerHTML = data.quote;
}

//--------------------------------------------------------------
// Menu bar highligher funcion
// Changes the menu bar to show the spot
//--------------------------------------------------------------
function updateProfileMenu(selected) {
    document.querySelectorAll(".profile-menu").forEach((option) => {
        option.classList.remove("selected");
    });
    document.getElementById(selected).classList.add("selected");
}