"use strict";
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

//------------------------------------------------------------------------
// Inserts all the users current profile information into the input fields
// gets called by getProfileInfo
//------------------------------------------------------------------------
function displayProfileInfo(data) {

    document.getElementById("display-name").value = data.displayName;
    document.getElementById("user-quote").value = data.quote;
    document.getElementById("country").value = data.country;
    document.getElementById("province").value = data.province;
    document.getElementById("city").value = data.city;
    document.getElementById("description").value = data.userDescription;
    if (data.showEmail) {
        document.getElementById("show-email-yes").checked = true;
    } else {
        document.getElementById("show-email-no").checked = true;
    }
    if (data.showLoc) {
        document.getElementById("show-location-yes").checked = true;
    } else {
        document.getElementById("show-location-no").checked = true;
    }
}

document.querySelector("#update-profile").addEventListener("click", () => {
    updateProfileInfo();
});

async function updateProfileInfo() {
    let profileData = {
        displayName: document.getElementById("display-name").value,
        quote: document.getElementById("user-quote").value,
        country: document.getElementById("country").value,
        province: document.getElementById("province").value,
        city: document.getElementById("city").value,
        description: document.getElementById("description").value,
        showEmail: document.getElementById("show-email-yes").checked,
        showLocation:document.getElementById("show-location-yes").checked
    };
    
    let path = window.location.pathname;
    const requestId = path.substring(path.lastIndexOf('/'));
    try {
        let responseObject = await fetch(`/update-profile${requestId}`, {
            method: 'POST',
            headers: { "Accept": 'application/json',
                       "Content-Type": 'application/json'
            },
            body: JSON.stringify(profileData)
        });
        
        let parsedJSON = await responseObject.json();
        
        if (parsedJSON.status == "success") {
            document.getElementById("bottom-filler").classList.add("no-show");
            document.getElementById("update-success").classList.remove("no-show");
        } else {
            document.getElementById("bottom-filler").classList.add("no-show");
            document.getElementById("update-failure").classList.remove("no-show");
        }
    } catch(error) {
        console.log(error);
    }
}