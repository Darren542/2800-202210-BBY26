"use strict";
let userID;
function getemail() {
    const getemail = new XMLHttpRequest();
    let path = window.location.pathname;
    const requestId = path.substring(path.lastIndexOf('/'));
    getemail.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let reply = JSON.parse(getemail.response);
            document.getElementById("user-email").innerHTML = reply.email;
        }
    }
    getemail.open("GET", `/email${requestId}`, true);
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


function hidePopup() {
    document.getElementById("background").style = "z-index: -2; opacity: 0;"
    document.getElementById("modify-event-popup").style = "z-index: -2; opacity: 0;";
}

function modifyEvent() {
    let formData = {
        eventID: this.eventID,
        // eventImage: document.getElementById("event-img").src,
        eventName: document.getElementById("event-name-placeholder").value,
        eventLocationCity: document.getElementById("event-street-placeholder").value,
        eventLocationStreet: document.getElementById("event-address-placeholder").value,
        eventDateTime: document.getElementById("event-date-placeholder").value,
        eventDuration: document.getElementById("event-duration-placeholder").value,
        eventDescription: document.getElementById("event-description").value,
    }
    let params = typeof formData == 'string' ? formData : Object.keys(formData).map(
        function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(formData[k]) }
    ).join('&');
    const xhttp = new XMLHttpRequest;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            hidePopup();
            location.reload();
        }
    }
    xhttp.open("PUT", "/update-event", true);
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(params);
}


function getDogs() {
    const theDogs = new XMLHttpRequest();
    theDogs.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("menu-description").innerHTML = this.responseText;
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
            document.getElementById("menu-description").innerHTML = this.responseText;
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
            document.getElementById("menu-description").innerHTML = this.responseText;
        }
    }
    theGroups.open("GET", "/my-groups", true);
    theGroups.send();
    updateProfileMenu("groups-option");
}

function getEvents() {
    document.getElementById("menu-description").innerHTML = "This User's RSVPs:";
    const theEvents = new XMLHttpRequest();
    theEvents.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            let index = 0;
            if (data.length > 0) {
                data.forEach(function () {
                    loadEvent(data[index]);
                    index++;
                });
            }
        }
    }
    let path = window.location.pathname;
    const requestID = path.substring(path.lastIndexOf('/'));

    theEvents.open("POST", "/get-events", true);
    theEvents.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    theEvents.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    theEvents.send("username=" + requestID.substring(1));
    updateProfileMenu("events-option");
}

function getUserID() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            userID = this.responseText;
        }
    }
    xhttp.open("GET", "/userID", true);
    xhttp.send();
}

function unreserveEvent() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        location.reload();
    }
    xhttp.open("delete", "/unreserve-event", true);
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("eventID="+this.eventID+"&userID="+this.userID);
}


function deleteEvent() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        location.reload();
    }
    xhttp.open("delete", "/delete-event", true);
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("eventID="+this.eventID);
}

function loadEvent(eventID) {
    const eventDetail = new XMLHttpRequest();
    const theAddress = new XMLHttpRequest();
    eventDetail.open("POST", "/load-event");
    eventDetail.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    eventDetail.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    eventDetail.send("eventID=" + eventID);
    theAddress.open("post", "/get-event-address");
    theAddress.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    theAddress.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    theAddress.send("eventID=" + eventID);
    getUserID();
    function load() {
        if (theAddress.readyState == 4 && theAddress.status == 200 && eventDetail.readyState == 4 && eventDetail.status == 200) {
            let temp = document.querySelector('#post-template');
            let card = temp.content.cloneNode(true);
            card.id = "post";
            let eventData = JSON.parse(eventDetail.responseText);
            let eventAddress = JSON.parse(theAddress.responseText);
            card.getElementById("delete-button").eventID = eventID;
            card.getElementById("event-img").src = "/img/event-imgs/" + eventData[0].event_photo;
            card.getElementById("event-name-placeholder").innerHTML = eventData[0].event_name;
            if (eventData[0].city) {
                card.getElementById("event-address-placeholder").innerHTML = eventAddress[0].city;
            }
            if (eventData[0].street) {
                card.getElementById("event-street-placeholder").innerHTML = eventAddress[0].street;
            }
            card.getElementById("event-date-placeholder").innerHTML = eventData[0].event_date_time;
            card.getElementById("event-duration-placeholder").innerHTML = eventData[0].event_duration + " minutes";
            card.getElementById("event-description-placeholder").innerHTML = eventData[0].event_description;
            document.getElementById("cancel-button").addEventListener("click", hidePopup);
            document.getElementById("confirm-button").addEventListener("click", modifyEvent);
            if (userID == eventData[0].ownerID) {
                card.getElementById("delete-button").addEventListener("click", deleteEvent);
                card.getElementById("modify-button").style = "display: inline";
                card.getElementById("modify-button").addEventListener("click", function () {
                    document.getElementById("confirm-button").eventID = eventID;

                    document.getElementById("background").style = "z-index: 2; opacity: 1;"
                    document.getElementById("modify-event-popup").style = "z-index: 3; opacity: 1;";
                    let modifyDiv = document.getElementById("modify-event-popup");
                    modifyDiv.querySelector("#event-img").src = "/img/event-imgs/" + eventData[0].event_photo;
                    modifyDiv.querySelector("#event-name-placeholder").value = eventData[0].event_name;
                    modifyDiv.querySelector("#event-address-placeholder").value = eventAddress[0].city;
                    modifyDiv.querySelector("#event-street-placeholder").value = eventAddress[0].street;
                    modifyDiv.querySelector("#event-date-placeholder").value = eventData[0].event_date_time;
                    modifyDiv.querySelector("#event-duration-placeholder").value = eventData[0].event_duration;
                    modifyDiv.querySelector("#event-description").value = eventData[0].event_description;
                });
            } else {
                card.getElementById("delete-button").userID = userID;
                card.getElementById("delete-button").addEventListener("click", unreserveEvent);
            }
            document.getElementById("menu-display").appendChild(card);
        }
    }
    theAddress.onreadystatechange = load;
    eventDetail.onreadystatechange = load;
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
    } catch (error) {
        console.log(error);
    }
}

getProfileInfo(window.location.pathname);

//--------------------------------------------------
// Takes the profile info as a JSON object
// Displays the info on the profile page
//--------------------------------------------------
function displayProfileInfo(data) {
    if (data.quote == undefined) {
        location.href = "/user-profile";
    }
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

    document.getElementById("username").innerHTML = data.username;
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