"use strict";

document.querySelector("#event-btn").addEventListener("click", () => {
    window.location = "./create-events";
});

document.querySelector("#group-btn").addEventListener("click", () => {
    window.location = "./create-group";
});

// Check if the logged in user has an partially created groups
// If they do display them and give user chance to restart them
async function checkMySavedGroupRecords() {
    try {
        let response = await fetch("/saved-groups", {
            method: 'GET'
        });
        if (response.status === 200) {
            let data = await response.json();
            for (let i = 0; i < data.length; i ++) {
                displaySavedGroup(data[i]);
            }
            // displaySavedGroups(data);
        } else {
            console.log(response.status);
        }
    } catch(error) {
        console.log(error);
    }
}

// Called by checkMySavedGroupRecords
// Creates then displays a banner for the saved incomplete group found
function displaySavedGroup(data) {
    let cardTemplate = document.querySelector('#saved-group-template');
    let newCard = cardTemplate.content.cloneNode(true);
    let theDate = data.creationTime;
    theDate = theDate.slice(0, 10);
    newCard.querySelector(".card").setAttribute("id", "savNum" + data.savedID);
    newCard.querySelector('.card-time').innerHTML = `From: ${theDate}`;
    newCard.querySelector('.load-btn').addEventListener("click", () => {
        window.location = `./create-group?saveID=${data.savedID}`;
    });
    newCard.querySelector('.delete-btn').addEventListener("click", () => {
        deleteSavedGroup(data.savedID);
    });
    document.querySelector("#saved-box").appendChild(newCard);
}

// If the user no longer wants that save let them delete it
async function deleteSavedGroup(groupID) {
    // Send data to Server as POST request to create-group
    let groupData = {
        nothing: "nothing"
    };
    try {
        let responseObject = await fetch(`/delete-saved-group/${groupID}`, {
            method: 'POST',
            headers: { "Accept": 'application/json',
                       "Content-Type": 'application/json'
            },
            body: JSON.stringify(groupData)
        });
        
        let parsedJSON = await responseObject.json();
        
        //On group creation should send you to your new groups homepage
        if (parsedJSON.status == "success") {
            document.getElementById(`savNum${groupID}`).classList.add("no-show");
        } else {
            console.log("failed to delete group")
        }
    } catch(error) {
        console.log(error);
    }
}

// Check if the logged in user has an partially created events
// If they do display them and give user chance to restart them
async function checkMySavedEventRecords() {
    try {
        let response = await fetch("/saved-events", {
            method: 'GET'
        });
        if (response.status === 200) {
            let data = await response.json();
            for (let i = 0; i < data.length; i ++) {
                displaySavedEvent(data[i]);
            }
        } else {
            console.log(response.status);
        }
    } catch(error) {
        console.log(error);
    }
}

// Called by checkMySavedGroupRecords
// Creates then displays a banner for the saved incomplete group found
function displaySavedEvent(data) {
    let cardTemplate = document.querySelector('#saved-event-template');
    let newCard = cardTemplate.content.cloneNode(true);
    let theDate = data.creationTime;
    theDate = theDate.slice(0, 10);
    newCard.querySelector(".card").setAttribute("id", "eSavNum" + data.savedID);
    newCard.querySelector('.card-time').innerHTML = `From: ${theDate}`;
    newCard.querySelector('.load-btn').addEventListener("click", () => {
        window.location = `./create-events?saveID=${data.savedID}`;
    });
    newCard.querySelector('.delete-btn').addEventListener("click", () => {
        deleteSavedEvent(data.savedID);
    });
    document.querySelector("#saved-box").appendChild(newCard);
}

// If the user no longer wants that save let them delete it
async function deleteSavedEvent(eventID) {
    // Send data to Server as POST request to create-group
    let groupData = {
        nothing: "nothing"
    };
    try {
        let responseObject = await fetch(`/delete-saved-event/${eventID}`, {
            method: 'POST',
            headers: { "Accept": 'application/json',
                       "Content-Type": 'application/json'
            },
            body: JSON.stringify(groupData)
        });
        
        let parsedJSON = await responseObject.json();
        
        //On group creation should send you to your new groups homepage
        if (parsedJSON.status == "success") {
            document.getElementById(`eSavNum${eventID}`).classList.add("no-show");
        } else {
            console.log("failed to delete group")
        }
    } catch(error) {
        console.log(error);
    }
}

checkMySavedGroupRecords()
checkMySavedEventRecords()