"use strict"
// Page user starts on by default
var pageNumber = 1;

//Get the params from the url to check for save
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const saveNum = urlParams.get("saveID");

document.getElementById("search-events-button").addEventListener("click", function () {
    showHidePages(2);
});

document.getElementById("search-groups-button").addEventListener("click", function () {
    showHidePages(4);
});

document.getElementById("search-users-button").addEventListener("click", function () {
    location.href = "/lookup";
});

document.getElementById("dropdown-button").addEventListener("click", toggleDropdown);

document.getElementById("back-to-search-button").addEventListener("click", function() {
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("error-message-2").innerHTML = "";
    showHidePages(1);
})


document.getElementById("back-to-home-button").addEventListener("click", function() {
    location.href = "/";
})
function toggleDropdown() {
    let content = document.getElementById("dropdown-content");
    content.classList.toggle("dropdown-content-active");
    content.classList.toggle("dropdown-content-inactive");
}

document.querySelectorAll(".city").forEach((button) => {
    button.addEventListener("click", function () {
        toggleDropdown();
        let arrow = document.getElementById("dropdown-arrow");
        document.getElementById("dropdown-button").innerHTML = button.innerText;
        document.getElementById("dropdown-button").append(arrow);
    })
});

document.querySelectorAll(".tag").forEach((tag) => {
    tag.addEventListener("click", function () {
        this.classList.toggle("selected");
    })
});
document.querySelectorAll(".tag-2").forEach((tag) => {
    tag.addEventListener("click", function () {
        this.classList.toggle("selected-2");
    })
});

document.getElementById("back-button").addEventListener("click", function () {
    showHidePages(1);
});
document.getElementById("back-button-2").addEventListener("click", function () {
    showHidePages(1);
});

document.getElementById("search-button").addEventListener("click", function () {
    if (document.querySelectorAll(".selected").length == 0) {
        document.getElementById("error-message").innerHTML = "must select at least one tag";
    } else {
        showHidePages(3);
        let formData = {
            smallDogs: document.querySelector("#small-dogs").classList.contains("selected"),
            bigDogs: document.querySelector("#big-dogs").classList.contains("selected"),
            allDogs: document.querySelector("#all-dogs").classList.contains("selected"),
            puppies: document.querySelector("#puppies").classList.contains("selected"),
            oldDogs: document.querySelector("#old-dogs").classList.contains("selected"),
            outside: document.querySelector("#outside").classList.contains("selected"),
            youngPeople: document.querySelector("#young-people").classList.contains("selected"),
            oldPeople: document.querySelector("#old-people").classList.contains("selected"),
            city: document.querySelector("#dropdown-button").innerHTML.substring(0, document.querySelector("#dropdown-button").innerHTML.indexOf("<")),
        }
        let query = JSON.stringify(formData);
        const xhttp = new XMLHttpRequest();
        xhttp.open("post", "/advanced-search-events", true)
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                let index =  0;
                document.getElementById("card-loader").innerHTML = "";
                if (data.length > 0){
                    data.forEach(function() {
                        let temp = document.querySelector('#post-template');
                        let card = temp.content.cloneNode(true);
                        card.id = "post";
                        card.getElementById("event-img").src = "/img/event-imgs/" + data[index].event_photo;
                        card.getElementById("event-name-placeholder").innerHTML = data[index].event_name;
                        card.getElementById("event-address-placeholder").innerHTML = data[index].city;
                        card.getElementById("event-street-placeholder").innerHTML = data[index].street;
                        let newDate = new Date(data[index].event_date_time);
                        card.getElementById("event-date-placeholder").innerHTML = newDate.toLocaleString();
                        card.getElementById("event-duration-placeholder").innerHTML = (data[index].event_duration / 60) + " minutes";
                        card.getElementById("event-description-placeholder").innerHTML = data[index].event_description;
                        card.querySelector(".link").href = "/event/" + data[index].eventID;
                        document.getElementById("card-loader").appendChild(card);
                        index++;
                    })
                } else {
                    document.getElementById("card-loader").innerHTML = "<p>no posts found</p>";
                }
            }
        }
        xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(query);
    }
});

document.getElementById("search-button-2").addEventListener("click", function () {
    if (document.querySelectorAll(".selected-2").length == 0) {
        document.getElementById("error-message-2").innerHTML = "must select at least one tag";
    } else {
        showHidePages(3);
        let formData = {
            smallDogs: document.querySelector("#small-dogs-2").classList.contains("selected-2"),
            bigDogs: document.querySelector("#big-dogs-2").classList.contains("selected-2"),
            allDogs: document.querySelector("#all-dogs-2").classList.contains("selected-2"),
            puppies: document.querySelector("#puppies-2").classList.contains("selected-2"),
            oldDogs: document.querySelector("#old-dogs-2").classList.contains("selected-2"),
            outside: document.querySelector("#outside-2").classList.contains("selected-2"),
            youngPeople: document.querySelector("#young-people-2").classList.contains("selected-2"),
            oldPeople: document.querySelector("#old-people-2").classList.contains("selected-2"),
        }
        let query = JSON.stringify(formData);
        const xhttp = new XMLHttpRequest();
        xhttp.open("post", "/advanced-search-groups", true)
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText);
                let index =  0;
                document.getElementById("card-loader").innerHTML = "";
                if (data.length > 0){
                    data.forEach(function() {
                        let temp = document.querySelector('#group-template');
                        let card = temp.content.cloneNode(true);
                        card.id = "group";
                        card.getElementById("group-img").src = "/img/group-imgs/" + data[index].group_photo;
                        card.getElementById("group-name-placeholder").innerHTML = data[index].group_name;
                        card.getElementById("group-city-placeholder").innerHTML = data[index].city;
                        card.getElementById("group-description-placeholder").innerHTML = data[index].group_description;
                        card.querySelector(".link").href = "/group/" + data[index].groupID;
                        document.getElementById("card-loader").appendChild(card);
                        index++;
                    })
                } else {
                    document.getElementById("card-loader").innerHTML = "<p>no groups found </p>";
                }
            }
        }
        xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(query);
    }
});

// Handles showing the correct to display elements to users
function showHidePages(goto) {
    // hide all the other pages and show only goto
    document.querySelectorAll(".page").forEach((page) => {
        page.classList.remove("page");
        page.classList.add("no-show");
    });
    document.querySelector(`#page-${goto}`).classList.add("page");
    document.querySelector(`#page-${goto}`).classList.remove("no-show");
}
showHidePages(1);