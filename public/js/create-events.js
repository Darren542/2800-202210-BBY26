"use strict"
// Page user starts on by default
var pageNumber = 1;

//Get the params from the url to check for save
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const saveNum = urlParams.get("saveID");
loadSavedEvent(saveNum);

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


// Code for Event type on Page 4
var eventType = true;
document.querySelector("#public-event").addEventListener('click', ()=> {
    showPublic();
});

function showPublic() {
    document.querySelector('#public-event-details').classList.add("type-details");
    document.querySelector('#public-event-details').classList.remove("no-show");
    document.querySelector('#private-event-details').classList.add("no-show");
    document.querySelector('#private-event-details').classList.remove("type-details");
    document.querySelector('#public-event').classList.add("filled");
    document.querySelector('#public-event').classList.remove("unfilled");
    document.querySelector('#private-event').classList.add("unfilled");
    document.querySelector('#private-event').classList.remove("filled");
    eventType = true;
}

document.querySelector("#private-event").addEventListener('click', ()=> {
    showPrivate();
});

function showPrivate() {
    document.querySelector('#public-event-details').classList.remove("type-details");
    document.querySelector('#public-event-details').classList.add("no-show");
    document.querySelector('#private-event-details').classList.remove("no-show");
    document.querySelector('#private-event-details').classList.add("type-details");
    document.querySelector('#public-event').classList.remove("filled");
    document.querySelector('#public-event').classList.add("unfilled");
    document.querySelector('#private-event').classList.remove("unfilled");
    document.querySelector('#private-event').classList.add("filled");
    eventType = false;
}

// Code for Event group on Page 4
// When attaching groups to events is implemented will be updated,
// to get the groups id that it being attached too
var eventGroup = 0;
document.querySelector("#non-group-event").addEventListener('click', ()=> {
    document.querySelector('#non-group-details').classList.add("group-details");
    document.querySelector('#non-group-details').classList.remove("no-show");
    document.querySelector('#group-details').classList.add("no-show");
    document.querySelector('#group-details').classList.remove("group-details");
    document.querySelector('#non-group-event').classList.add("filled");
    document.querySelector('#non-group-event').classList.remove("unfilled");
    document.querySelector('#group-event').classList.add("unfilled");
    document.querySelector('#group-event').classList.remove("filled");
    eventGroup = 0;
});

document.querySelector("#group-event").addEventListener('click', ()=> {
    document.querySelector('#non-group-details').classList.remove("group-details");
    document.querySelector('#non-group-details').classList.add("no-show");
    document.querySelector('#group-details').classList.remove("no-show");
    document.querySelector('#group-details').classList.add("group-details");
    document.querySelector('#non-group-event').classList.remove("filled");
    document.querySelector('#non-group-event').classList.add("unfilled");
    document.querySelector('#group-event').classList.remove("unfilled");
    document.querySelector('#group-event').classList.add("filled");
    eventGroup = 0;
});

// Code for finishing event creation
// Have to check all fields are filled and have valid entries
document.querySelector("#finish-btn").addEventListener('click', async function() {
    let valid = true;
    let errorMsg = "";

    // checking and receiving inputs from page 1
    let country = document.querySelector("#country-input").value;
    let province = document.querySelector("#province-input").value;
    let city = document.querySelector("#city-input").value;
    let street = document.querySelector("#street-input").value;
    let startTime = document.querySelector("#event-date").value;
    let endTime = document.querySelector("#event-end-time").value;

    const Timestamp = (time) => {
        const dt = new Date(time).getTime();
        return dt / 1000;
    }
    let startTimestamp = Timestamp(startTime);
    let endTimestamp = Timestamp(endTime);
    let eventDuration = endTimestamp - startTimestamp;

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
    if (street.length < 1) {
        valid = false;
        errorMsg = "Must fill out street address."
    }
    if (startTime == null) {
        valid = false;
        errorMsg = "Must fill out start time."
    }
    if (endTime == null) {
        valid = false;
        errorMsg = "Must fill out end time."
    }
    if (endTimestamp < startTimestamp) {
        valid = false;
        errorMsg = "Event ends before it starts."
    }

    // checking and receiving inputs from page 2
    let name = document.querySelector("#name-input").value;
    if (name.length < 1) {
        valid = false;
        errorMsg = "Must fill out event's name."
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
        errorMsg = "Must fill out event's description."
    }

    // checking and receiving inputs from page 4
    if (!(eventType == true || eventType == false)) {
        valid = false;
        errorMsg = "Must be public or private event."
    }
    if (eventGroup != 0) {
        valid = false;
        errorMsg = "Group events not implemented"
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
    // Else send request to server to make new event
    if (valid == false) {
        document.getElementById("error-messages").innerHTML = errorMsg;
    } else {
        document.getElementById("error-messages").innerHTML = "";

        let eventData = {
            country: country,
            province: province,
            city: city,
            street: street,
            startTimestamp: startTimestamp,
            endTimestamp: endTimestamp,
            startTime: startTime,
            endTime: endTime,
            eventDuration: eventDuration,
            name: name,
            tags: tags,
            description: description,
            eventType: eventType,
            guidelines: guidelines,
            terms: terms,
            saveNum: saveNum
        }

        // Send data to Server as POST request to create-event
        try {
            let responseObject = await fetch(`/create-event`, {
                method: 'POST',
                headers: { "Accept": 'application/json',
                           "Content-Type": 'application/json'
                },
                body: JSON.stringify(eventData)
            });
            
            let parsedJSON = await responseObject.json();
            
            //On event creation should send you to your new events homepage
            if (parsedJSON.status == "success") {
                document.getElementById("error-messages").innerHTML = "Created new event";

                // delete the saved partial event if it exists
                if (saveNum) {
                    await deleteSavedEvent(saveNum);
                } else {
                       
                }
                // save the image if it exists
                if (formData) {
                    await saveImage(formData, parsedJSON.newID);
                    window.location.href = `/event/${parsedJSON.newID}`;
                } else {
                    window.location.href = `/event/${parsedJSON.newID}`;
                }
            } else {
                document.getElementById("error-messages").innerHTML = "Failed to create new event";
            }
        } catch(error) {
            console.log(error);
        }
    }

});

// Code to save partially created event into database for later use
document.querySelector("#save-quit").addEventListener('click', async function() {

    // receiving inputs from page 1
    let country = document.querySelector("#country-input").value;
    let province = document.querySelector("#province-input").value;
    let city = document.querySelector("#city-input").value;
    let street = document.querySelector("#street-input").value;
    let startTime2 = document.querySelector("#event-date").value;
    let endTime2 = document.querySelector("#event-end-time").value;
    // Trying to get timezones to save right
    // No idea why it is double timezone off
    let startTime = new Date(startTime2);
    startTime.setMinutes(startTime.getMinutes() - (startTime.getTimezoneOffset() * 2));
    let endTime = new Date(endTime2);
    endTime.setMinutes(endTime.getMinutes() - (endTime.getTimezoneOffset() * 2));

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
    let eventData = {
        country: country,
            province: province,
            city: city,
            street: street,
            startTime: startTime,
            endTime: endTime,
            name: name,
            tags: tagString,
            description: description,
            eventType: eventType,
            guidelines: guidelines,
            terms: terms,
            saveNum: saveNum
    }

    // Send data to Server as POST request to save-event
    try {
        let responseObject = await fetch(`/save-event`, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(eventData)
        });

        let parsedJSON = await responseObject.json();
        console.log(parsedJSON);
        //On event creation should send you to your new events homepage
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

// Used to get data from saved event
async function loadSavedEvent(saveNum) {
    if (saveNum) {
        try {
            let response = await fetch(`/saved-events/${saveNum}`, {
                method: 'GET'
            });
            if (response.status === 200) {
                let data = await response.json();
                if (data[0]) {
                    displaySavedEvent(data[0]);
                }              
            } else {
                console.log(response.status);
            }
        } catch(error) {
            console.log(error);
        }
    }
}

// Used to insert data from saved event
function displaySavedEvent(data) {
    // inputs data for page 1
    document.querySelector("#country-input").value = data.country;
    document.querySelector("#province-input").value = data.province;
    document.querySelector("#city-input").value = data.city;
    document.querySelector("#street-input").value = data.street;
    if (data.event_date_time) {
        let startTime = data.event_date_time;
        startTime = startTime.slice(0, 19);
        document.querySelector("#event-date").value = startTime;
    }
    if (data.event_end_time) {
        let endTime = data.event_end_time;
        endTime = endTime.slice(0, 19);
        document.querySelector("#event-end-time").value = endTime;
    }

    // inputs data for page 2
    document.querySelector("#name-input").value = data.event_name;
    document.querySelector("#tag-input").value = data.tagString;

    // inputs data for page 3
    document.querySelector("#description-input").value = data.event_description;

    // inputs data for page 4
    if (data.event_type == false) {
        showPrivate();
    } else {
        showPublic();
    }

    // inputs data for page 5
    document.getElementById("guidelines-checkbox").checked = data.guidelines;
    document.getElementById("terms-checkbox").checked = data.terms;
}

// If the user no longer wants that save let them delete it
async function deleteSavedEvent(eventID) {
    // Send data to Server as POST request to create-event
    let eventData = {
        nothing: "nothing"
    };
    try {
        let responseObject = await fetch(`/delete-saved-event/${eventID}`, {
            method: 'POST',
            headers: { "Accept": 'application/json',
                       "Content-Type": 'application/json'
            },
            body: JSON.stringify(eventData)
        });
        
        let parsedJSON = await responseObject.json();
        
        //On event creation should send you to your new events homepage
        if (parsedJSON.status == "success") {
            //the save was deleted
        } else {
            console.log("failed to delete event")
        }
    } catch(error) {
        console.log(error);
    }
}

async function saveImage(imageFile, eventID) {
      
            const options = {
                method: 'POST',
                body: imageFile,
            };
            fetch(`/upload-event-image/${eventID}`, options
            ).then(function (res) {
                // what do to on return from image upload
                return
            }).catch(function (err) { ("Error:", err) }
            );
}