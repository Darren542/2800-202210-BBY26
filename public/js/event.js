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



