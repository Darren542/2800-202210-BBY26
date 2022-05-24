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
    document.getElementById("temp-display").innerHTML = data.group_description;
    checkForGroup(data.groupID);  
}

getGroupInfo(window.location.pathname);


// Creates an RSVP for the currently logged in user for the currently view event
async function joinGroup(groupID) {
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
        } else {
            document.getElementById("join-button").innerHTML = "Failed"
            document.getElementById("join-button").style.backgroundColor = "red";
        }
    } catch(error) {
        console.log(error);
    }
}

// Checks if the logged in user is already RSVPed for the viewed event
async function checkForGroup(groupID) {
    fetch(`/check-membership/${groupID}`).then(response => response.json()).then(data => {
        //console.log(data);
        if (data.status == "yes") {
            document.getElementById("join-button").innerHTML = "Joined"
            document.getElementById("join-button").style.backgroundColor = "green";
        } else {
            document.getElementById("join-button").addEventListener("click", () => {
                joinGroup(groupID)});
        }
    })
}
