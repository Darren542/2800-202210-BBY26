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

const upLoadForm = document.getElementById("avatar-update-form");
upLoadForm.addEventListener("submit", uploadImages);

function uploadImages(e) {
    e.preventDefault();
    hideErrors();
    const imageUpload = document.querySelector('#image-upload');
    const maxProfileImageSize = 150000
    if (imageUpload.files[0]) {
        if (imageUpload.files[0].size < maxProfileImageSize) {

            const formData = new FormData();
    
            // put the images from the input into the form data
            formData.append("files", imageUpload.files[0]);
    
            const options = {
                method: 'POST',
                body: formData,
            };
    
            let path = window.location.pathname;
            const requestId = path.substring(path.lastIndexOf('/'));
    
            // now use fetch
            fetch(`/update-avatar${requestId}`, options
            ).then(function (res) {
                location.reload();
            }).catch(function (err) { ("Error:", err) }
            );
        } else {
            document.getElementById("profile-filler").classList.add("no-show");
            document.getElementById("update-failure-avatar").classList.remove("no-show");
            document.getElementById("update-failure-avatar").innerHTML = "Image too large"
        }
    } else {
        document.getElementById("profile-filler").classList.add("no-show");
            document.getElementById("update-failure-avatar").classList.remove("no-show");
            document.getElementById("update-failure-avatar").innerHTML = "No Image Choosen"
    }
    

}

async function getProfileImgUrl() {
    let path = window.location.pathname;
    const requestId = path.substring(path.lastIndexOf('/'));

    const options = {
        method: 'GET',
    };
    fetch(`/profile-url${requestId}`, options
        ).then(async function (res) {
            let imgUrl = await res.json();
            document.getElementById("profile-image").src = `/img/profile-imgs/${imgUrl.profileImg}`;
        }).catch(function (err) { ("Error:", err) }
        );
}

async function hideErrors() {
    document.querySelectorAll(".error-message").forEach((ele) => {
        ele.classList.add("no-show");
    })
    document.querySelectorAll(".space-filler").forEach((ele) => {
        ele.classList.remove("no-show");
    })
}


getProfileImgUrl();