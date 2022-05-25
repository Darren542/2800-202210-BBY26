'use strict';

// Get the id being requested in the URL.
// Then fetch the data for that event.
let path = window.location.pathname;
const requestID = path.substring(path.lastIndexOf('/') + 1);
let data = `/event-info/${requestID}`;
fetch(data).then(x => x.json()).then(async function(y) {
    //console.log(y);
    document.getElementById('event-name').innerHTML = y.event_name
    document.getElementById('event-location').innerHTML += y.street + ", " + y.city
    document.getElementById('event-owner').innerHTML += y.username
    document.getElementById('event-description').innerHTML = y.event_description;
    let newDate = new Date(y.event_date_time);
    document.getElementById('event-time').innerHTML += newDate.toLocaleString();
    document.getElementById("event-image").src = `/img/event-imgs/${y.event_photo}`;
    checkForRSVP(y.eventID);
    numUsers(y.eventID);
});

var haveJoined = false;
// Creates an RSVP for the currently logged in user for the currently view event
async function joinEvent(eventID) {
    if (!haveJoined) {
        let eventData = {
            data: "nothing"
        }
        try {
            let responseObject = await fetch(`/event-rsvp/${eventID}`, {
                method: 'POST',
                headers: { "Accept": 'application/json',
                           "Content-Type": 'application/json'
                },
                body: JSON.stringify(eventData)
            });
            
            let parsedJSON = await responseObject.json();
            //console.log(parsedJSON);
            if (parsedJSON.status == "success") {
                document.getElementById("join-button").innerHTML = "Joined"
                document.getElementById("join-button").style.backgroundColor = "green";
                haveJoined = true;
            } else {
                document.getElementById("join-button").innerHTML = "Failed"
                document.getElementById("join-button").style.backgroundColor = "red";
            }
        } catch(error) {
            console.log(error);
        }
    }
    
}

// Checks if the logged in user is already RSVPed for the viewed event
async function checkForRSVP(eventID) {
    fetch(`/check-RSVP/${eventID}`).then(response => response.json()).then(data => {
        //console.log(data);
        if (data.status == "yes") {
            document.getElementById("join-button").innerHTML = "Joined"
            document.getElementById("join-button").style.backgroundColor = "green";
            var haveJoined = true;
        } else {
            document.getElementById("join-button").addEventListener("click", () => {
                joinEvent(eventID)});
        }
    })
}

// Function to get number of users who have joined event and display it
async function numUsers(eventID) {
    try {
        let responseObject = await fetch(`/check-RSVPS/${eventID}`, {
            method: 'GET'
        });
        let parsedJSON = await responseObject.json();
        if (parsedJSON.status == "success") {
            let usernames = parsedJSON.usernames;
            for (let username of usernames) {
                displayRSVPedUser(username)
            }
            document.getElementById('member-count').innerHTML += parsedJSON.usernames.length;
        } else {
            console.log(parsedJSON);
        }
    } catch (error) {
        console.log(error);
    }
}
// Function to display info about joined users
// Called by numUsers
// Creates cards with the username and profile image of all RSVPed users
function displayRSVPedUser(data) {
    let cardTemplate = document.querySelector('#member-card-template');
    let newCard = cardTemplate.content.cloneNode(true);
    newCard.querySelector(".member-card").setAttribute("id", "userName" + data.username);
    newCard.querySelector('.member-name').innerHTML = data.username;
    newCard.querySelector('.member-img').src = `/img/profile-imgs/${data.profileImg}`;
    
    document.querySelector("#member-cards").appendChild(newCard);
}

// Different options for viewing on event page
document.querySelector("#description-option").addEventListener("click", () => {
    ShowOption("#description-option")
});

document.querySelector("#members-option").addEventListener("click", () => {
    ShowOption("#members-option")
});

document.querySelector("#photos-option").addEventListener("click", () => {
    ShowOption("#photos-option")
});

document.querySelector("#comments-option").addEventListener("click", () => {
    ShowOption("#comments-option")
});

// For highlighting and displaying the current menu option
function ShowOption(option) {
    var counter = 0;
    document.querySelectorAll(".event-menu").forEach( (choice) => {
        choice.classList.remove("selected");
        counter++;
        if (counter == 4) {
            document.querySelector(option).classList.add("selected");
        }
    });

    if (option == "#description-option") {
        document.querySelector("#event-description").classList.remove("no-show");
    } else {
        document.querySelector("#event-description").classList.add("no-show");
    }

    if (option == "#members-option") {
        document.querySelector("#event-members").classList.remove("no-show");
    } else {
        document.querySelector("#event-members").classList.add("no-show");
    }

    if (option == "#photos-option") {
        document.querySelector("#group-photos").classList.remove("no-show");
    } else {
        document.querySelector("#group-photos").classList.add("no-show");
    }

    if (option == "#comments-option") {
        document.querySelector("#group-comments").classList.remove("no-show");
    } else {
        document.querySelector("#group-comments").classList.add("no-show");
    }

}