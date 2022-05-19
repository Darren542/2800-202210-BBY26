"use strict"
// Page user starts on by default
var pageNumber = 1;

//Get the params from the url to check for save
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const saveNum = urlParams.get("saveID");
loadSavedGroup(saveNum);

document.querySelector("#next-btn").addEventListener("click", () => {
    if (pageNumber < 5) {
        pageNumber++;
        showHidePages(pageNumber);
    }
});

document.querySelector("#back-btn").addEventListener("click", () => {
    if (pageNumber >= 1) {
        pageNumber--;
        showHidePages(pageNumber);
    }
});

// Handles showing the correct to display elements to users
function showHidePages (goto) {
    // hide all the other pages and show only goto
    document.querySelectorAll(".page").forEach( (page) => {
        page.classList.remove("page");
        page.classList.add("no-show");
    });
    document.querySelector(`#page-${goto}`).classList.add("page");
    document.querySelector(`#page-${goto}`).classList.remove("no-show");


    // hide all the other titles and show only current one
    document.querySelectorAll(".progress-span").forEach( (page) => {
        page.classList.remove("show");
        page.classList.add("no-show");
    });
    document.querySelector(`#span-${goto}`).classList.add("show");
    document.querySelector(`#span-${goto}`).classList.remove("no-show");

    // Change background colour on progress bar to show progress
    for (let i = 1; i < 6; i++) {
        if (i <= goto) {
            document.querySelector(`#part-${i}`).classList.add("filled");
            document.querySelector(`#part-${i}`).classList.remove("unfilled");
        } else {
            document.querySelector(`#part-${i}`).classList.remove("filled");
            document.querySelector(`#part-${i}`).classList.add("unfilled");
        }
    }
    
    // Don't show back button on page 1
    if (goto == 1) {
        document.querySelector('#back-btn').classList.remove("btn");
        document.querySelector('#back-btn').classList.add("no-show");
    } else {
        document.querySelector('#back-btn').classList.add("btn");
        document.querySelector('#back-btn').classList.remove("no-show");
    }

    // Don't show next button on page 5 and show finish button
    if (goto == 5) {
        document.querySelector('#next-btn').classList.remove("btn");
        document.querySelector('#next-btn').classList.add("no-show");
        document.querySelector('#finish-btn').classList.add("btn");
        document.querySelector('#finish-btn').classList.remove("no-show");
    } else {
        document.querySelector('#next-btn').classList.add("btn");
        document.querySelector('#next-btn').classList.remove("no-show");
        document.querySelector('#finish-btn').classList.remove("btn");
        document.querySelector('#finish-btn').classList.add("no-show");
    }
}

document.querySelectorAll(".premade-tag").forEach( (tag) => {
    tag.addEventListener("click", () => {
        document.querySelector("#tag-input").value += tag.innerHTML;
        tag.innerHTML = "";
    })
});


// Code for Group Plan Page 4
var planType = "free";
document.querySelector("#free-plan").addEventListener('click', ()=> {
    document.querySelector('#free-plan-details').classList.add("plan-details");
    document.querySelector('#free-plan-details').classList.remove("no-show");
    document.querySelector('#premium-plan-details').classList.add("no-show");
    document.querySelector('#premium-plan-details').classList.remove("plan-details");
    document.querySelector('#free-plan').classList.add("filled");
    document.querySelector('#free-plan').classList.remove("unfilled");
    document.querySelector('#premium-plan').classList.add("unfilled");
    document.querySelector('#premium-plan').classList.remove("filled");
    planType = "free";
});

document.querySelector("#premium-plan").addEventListener('click', ()=> {
    document.querySelector('#free-plan-details').classList.remove("plan-details");
    document.querySelector('#free-plan-details').classList.add("no-show");
    document.querySelector('#premium-plan-details').classList.remove("no-show");
    document.querySelector('#premium-plan-details').classList.add("plan-details");
    document.querySelector('#free-plan').classList.remove("filled");
    document.querySelector('#free-plan').classList.add("unfilled");
    document.querySelector('#premium-plan').classList.remove("unfilled");
    document.querySelector('#premium-plan').classList.add("filled");
    planType = "premium";
});


// Code for finishing group creation
// Have to check all fields are filled and have valid entries
document.querySelector("#finish-btn").addEventListener('click', async function() {
    let valid = true;
    let errorMsg = "";

    // checking and receiving inputs from page 1
    let country = document.querySelector("#country-input").value;
    let province = document.querySelector("#province-input").value;
    let city = document.querySelector("#city-input").value;
    if (country.length < 1) {
        valid = false;
        errorMsg = "Must fill out country."
    }
    if (province.length < 1) {
        valid = false;
        errorMsg = "Must fill out state/province."
    }
    if (city.length < 1) {
        valid = false;
        errorMsg = "Must fill out city."
    }

    // checking and receiving inputs from page 2
    let name = document.querySelector("#name-input").value;
    if (name.length < 1) {
        valid = false;
        errorMsg = "Must fill out group's name."
    }
    let tagString = document.querySelector("#tag-input").value;
    let tags = tagString.split("#");

    // Need to add code for the images here
    let formData;
    const imageUpload = document.querySelector('#image-upload');
    const maxEventImageSize = 150000;
    if (imageUpload.files[0]) {
        if (imageUpload.files[0].size < maxEventImageSize) {
            formData = new FormData();
            
    
            // put the images from the input into the form data
            formData.append("files", imageUpload.files[0]);
    
        } else {
            valid = false;
            errorMsg = "Image too large."
        }
    } else {
        // they don't need to submit image
    }

    // checking and receiving inputs from page 3
    let description = document.querySelector("#description-input").value;
    if (description.length < 1) {
        valid = false;
        errorMsg = "Must fill out group's description."
    }

    // checking and receiving inputs from page 4
    if (planType != "free") {
        valid = false;
        errorMsg = "Only free plans available currently."
    }

    // checking and receiving inputs from page 5
    let guidelines = document.getElementById("guidelines-checkbox").checked;
    if (guidelines != true) {
        valid = false;
        errorMsg = "Must agree to Community Guidelines."
    }
    let terms = document.getElementById("terms-checkbox").checked;
    if (terms != true) {
        valid = false;
        errorMsg = "Must agree to Terms & Conditions."
    }

    // If all inputs are not valid send error msg to user
    // Else send request to server to make new group
    if (valid == false) {
        document.getElementById("error-messages").innerHTML = errorMsg;
    } else {
        document.getElementById("error-messages").innerHTML = "";

        // Combine all data into a JSON object
        let groupData = {
            country: country,
            province: province,
            city: city,
            name: name,
            tags: tags,
            description: description,
            planType: planType,
            guidelines: guidelines,
            terms: terms,
            saveNum: saveNum
        }

        // Send data to Server as POST request to create-group
        try {
            let responseObject = await fetch(`/create-group`, {
                method: 'POST',
                headers: { "Accept": 'application/json',
                           "Content-Type": 'application/json'
                },
                body: JSON.stringify(groupData)
            });
            
            let parsedJSON = await responseObject.json();
            
            //On group creation should send you to your new groups homepage
            if (parsedJSON.status == "success") {
                document.getElementById("error-messages").innerHTML = "Created new Group";
                // delete the saved partial group if it exists
                if (saveNum) {
                    await deleteSavedGroup(saveNum);
                } else {
                    
                }

                if (formData) {
                    saveImage(formData, parsedJSON.newID);
                }
            } else {
                document.getElementById("error-messages").innerHTML = "Failed to create new Group";
            }
        } catch(error) {
            console.log(error);
        }
    }

});

// Code to save partially created group into database for later use
document.querySelector("#save-quit").addEventListener('click', async function() {

    // receiving inputs from page 1
    let country = document.querySelector("#country-input").value;
    let province = document.querySelector("#province-input").value;
    let city = document.querySelector("#city-input").value;

    // receiving inputs from page 2
    let name = document.querySelector("#name-input").value;
    let tagString = document.querySelector("#tag-input").value;

    // receiving inputs from page 3
    let description = document.querySelector("#description-input").value;

    // receiving inputs from page 4

    // receiving inputs from page 5
    let guidelines = document.getElementById("guidelines-checkbox").checked;
    let terms = document.getElementById("terms-checkbox").checked;

    // Combine all data into a JSON object
    let groupData = {
        country: country,
        province: province,
        city: city,
        name: name,
        tags: tagString,
        description: description,
        planType: planType,
        guidelines: guidelines,
        terms: terms,
        saveNum: saveNum
    }

    // Send data to Server as POST request to save-group
    try {
        let responseObject = await fetch(`/save-group`, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(groupData)
        });

        let parsedJSON = await responseObject.json();
        console.log(parsedJSON);
        //On group creation should send you to your new groups homepage
        if (parsedJSON.status == "success") {
            document.getElementById("error-messages").innerHTML = "Progress Saved";
            window.location.href = "/create";
        } else {
            document.getElementById("error-messages").innerHTML = "Failed to save Progress";
        }
    } catch (error) {
        console.log(error);
    }

});

// Used to get data from saved group
async function loadSavedGroup(saveNum) {
    if (saveNum) {
        try {
            let response = await fetch(`/saved-groups/${saveNum}`, {
                method: 'GET'
            });
            if (response.status === 200) {
                let data = await response.json();
                if (data[0]) {
                    displaySavedGroup(data[0]);
                }              
            } else {
                console.log(response.status);
            }
        } catch(error) {
            console.log(error);
        }
    }
}

// Used to insert data from saved group
function displaySavedGroup(data) {
    // inputs data for page 1
    document.querySelector("#country-input").value = data.country;
    document.querySelector("#province-input").value = data.province;
    document.querySelector("#city-input").value = data.city;

    // inputs data for page 2
    document.querySelector("#name-input").value = data.group_name;
    document.querySelector("#tag-input").value = data.tagString;

    // inputs data for page 3
    document.querySelector("#description-input").value = data.group_description;

    // inputs data for page 4

    // inputs data for page 5
    document.getElementById("guidelines-checkbox").checked = data.guidelines;
    document.getElementById("terms-checkbox").checked = data.terms;
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
            //the save was deleted
        } else {
            console.log("failed to delete group")
        }
    } catch(error) {
        console.log(error);
    }
}

function saveImage(imageFile, eventID) {
      
    const options = {
        method: 'POST',
        body: imageFile,
    };
    fetch(`/upload-group-image/${eventID}`, options
    ).then(function (res) {
        // what do to on return from image upload
    }).catch(function (err) { ("Error:", err) }
    );
}