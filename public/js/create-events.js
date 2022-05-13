"use strict";
let page_num = 1;

document.getElementById('page2').classList.add('no-show');
document.getElementById('page3').classList.add('no-show');
document.getElementById('page4').classList.add('no-show');
document.getElementById('finish-btn').classList.add('no-show');



document.getElementById('next-btn').addEventListener('click', function (event) {
    event.preventDefault();
    page_num++;
    pageLoad();
    // Need check requiered fields are filled out
});

document.getElementById('back-btn').addEventListener('click', function (event) {
    event.preventDefault();
    page_num--;
    pageLoad();
});


function pageLoad() {
    if (page_num == 1) {
        document.getElementById('page1').classList.remove('no-show');
        document.getElementById('page2').classList.add('no-show');
        document.getElementById('page3').classList.add('no-show');
        document.getElementById('page4').classList.add('no-show');
        document.getElementById('finish-btn').classList.add('no-show');
        document.getElementById('next-btn').classList.remove('no-show');
    } else if (page_num == 2) {
        document.getElementById('page1').classList.add('no-show');
        document.getElementById('page2').classList.remove('no-show');
        document.getElementById('page3').classList.add('no-show');
        document.getElementById('page4').classList.add('no-show');
        document.getElementById('finish-btn').classList.add('no-show');
        document.getElementById('next-btn').classList.remove('no-show');
    } else if (page_num == 3) {
        document.getElementById('page1').classList.add('no-show');
        document.getElementById('page2').classList.add('no-show');
        document.getElementById('page3').classList.remove('no-show');
        document.getElementById('page4').classList.add('no-show');
        document.getElementById('finish-btn').classList.add('no-show');
        document.getElementById('next-btn').classList.remove('no-show');
    } else if (page_num == 4) {
        document.getElementById('page1').classList.add('no-show');
        document.getElementById('page2').classList.add('no-show');
        document.getElementById('page3').classList.add('no-show');
        document.getElementById('page4').classList.remove('no-show');
        document.getElementById('finish-btn').classList.remove('no-show');
        document.getElementById('next-btn').classList.add('no-show');
    }
}

let formData = {
    eventName: document.getElementById('event-name').value,
    eventLocationStreet: document.getElementById('event-street').value,
    eventLocationCity: document.getElementById('event-city').value,
    // need to add time objects for event start and end
    eventDetails: document.getElementById('event-description').value,
    eventTags: document.getElementById('event-tags').value,
    eventGuidelines: document.getElementById('gudilines').value,
    eventTerms: document.getElementById('terms').value
};



const xhr = new XMLHttpRequest();
// this gets loaded when 
xhr.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE && xhr.status === 200) {
    }
}

document.getElementById('finish-btn').addEventListener('click', function (event) {
    event.preventDefault();

    xhr.open('POST', '/');
    xhr.setRequestHeader('Content-Type', 'application-json');
    console.log(formData);
    xhr.send(formData);
});