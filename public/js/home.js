"use strict";
//------------------------------------------------
// Gets users name to display on page.
//------------------------------------------------
function ready() {
    const getname = new XMLHttpRequest();
    getname.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("username-placeholder").innerHTML = this.responseText;
        }
    }
    getname.open("GET", "/username", true);
    getname.send();
}


function loadEvent() {
    let eventData;
    const eventDetail = new XMLHttpRequest();
    eventDetail.open("GET", "/get-events", true);
    eventDetail.send();
    eventDetail.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let result = JSON.parse(this.responseText);
            if (result.status == "fail") {
                document.getElementById("loader-message").innerHTML = result.msg;
            } else {
                eventData = JSON.parse(this.responseText);
                let temp = document.querySelector('#post-template');
                let card = temp.content.cloneNode(true);
                card.id = "post";
                card.getElementById("RSVP").id = "event" + eventData[0].eventID;
                card.querySelector("#event"+eventData[0].eventID).addEventListener("click", function(){
                    const xhttp = new XMLHttpRequest();
                    xhttp.open("post", "/event-rsvp/" + eventData[0].eventID, true);
                    xhttp.send(); 
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            location.reload();
                        }
                    }
                });
                card.getElementById("event-img").src = "/img/event-imgs/" + eventData[0].event_photo;
                card.getElementById("event-name-placeholder").innerHTML = eventData[0].event_name;
                card.getElementById("event-date-placeholder").innerHTML = eventData[0].event_date_time;
                card.getElementById("event-description-placeholder").innerHTML = eventData[0].event_description;
                document.getElementById("posts-loader").append(card);
            }


        }
    };


    // const theAddress = new XMLHttpRequest();
    // theAddress.open("post", "/get-event-address");
    // theAddress.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // theAddress.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // theAddress.send("eventID=" + eventID);
    // theAddress.onreadystatechange = function() {
    //     if (this.readyState ==4 && this.status == 200) {

    //     }
    // )
}
ready();

loadEvent();