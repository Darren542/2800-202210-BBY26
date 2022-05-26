//----------------------------------------------------------------------
// takes the whole path as a parameter.
// eg. group/2
// Calls displayGroupInfo
//----------------------------------------------------------------------
async function getGroupInfo(path) {
    const requestId = path.substring(path.lastIndexOf('/'));
    try {
        let response = await fetch(`/group-info${requestId}`, {
            method: 'GET'
        });
        if (response.status === 200) {
            let data = await response.json();
            displayGroupInfo(data);
        } else {
            console.log(response.status);
        }
    } catch (error) {
        console.log(error);
    }
}

//--------------------------------------------------
// Takes the basic group info as a JSON object
// Displays the info on the group page
//--------------------------------------------------
function displayGroupInfo(data) {
    document.getElementById("group-name").innerHTML = data.group_name;
    document.getElementById("group-image").src = `/img/group-imgs/${data.group_photo}`;
    document.getElementById("location").innerHTML += `${data.city}, ${data.province}`;
    fetch(`/username/${data.ownerID}`).then( response => response.json()).then(name => {
        document.getElementById("group-owner").innerHTML += name.username;
    });
    document.getElementById("group-description").innerHTML = data.group_description;
    checkForGroup(data.groupID); 
    numUsers(data.groupID) 
}

getGroupInfo(window.location.pathname);

// for fixing double joining groups
var haveJoined = false;
// Creates an RSVP for the currently logged in user for the currently view event
async function joinGroup(groupID) {
    if (!haveJoined) {
        let eventData = {
            data: "nothing"
        }
        try {
            let responseObject = await fetch(`/group-join/${groupID}`, {
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
async function checkForGroup(groupID) {
    fetch(`/check-membership/${groupID}`).then(response => response.json()).then(data => {
        //console.log(data);
        if (data.status == "yes") {
            document.getElementById("join-button").innerHTML = "Joined"
            document.getElementById("join-button").style.backgroundColor = "green";
            haveJoined = true;
        } else {
            document.getElementById("join-button").addEventListener("click", () => {
                joinGroup(groupID)});
        }
    })
}

// Function to get number of users who have joined event and display it
async function numUsers(groupID) {
    try {
        let responseObject = await fetch(`/check-members/${groupID}`, {
            method: 'GET'
        });
        let parsedJSON = await responseObject.json();
        if (parsedJSON.status == "success") {
            let usernames = parsedJSON.usernames;
            for (let username of usernames) {
                displayGroupMember(username);
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
function displayGroupMember(data) {
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

document.querySelector("#events-option").addEventListener("click", () => {
    ShowOption("#events-option")
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
    document.querySelectorAll(".group-menu").forEach( (choice) => {
        choice.classList.remove("selected");
        counter++;
        if (counter == 5) {
            document.querySelector(option).classList.add("selected");
        }
    });

    if (option == "#description-option") {
        document.querySelector("#group-description").classList.remove("no-show");
    } else {
        document.querySelector("#group-description").classList.add("no-show");
    }

    if (option == "#members-option") {
        document.querySelector("#group-members").classList.remove("no-show");
    } else {
        document.querySelector("#group-members").classList.add("no-show");
    }

    if (option == "#events-option") {
        document.querySelector("#group-events").classList.remove("no-show");
    } else {
        document.querySelector("#group-events").classList.add("no-show");
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