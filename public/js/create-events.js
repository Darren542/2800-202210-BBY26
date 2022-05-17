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





document.getElementById('finish-btn').addEventListener('click', function (event) {
    event.preventDefault();
    console.log("pressed");

    let gudilines = document.getElementById('gudilines').checked;
    let conditions = document.getElementById('conditions').checked;
    let formData = {
        eventName: document.getElementById('event-name').value,
        eventLocationStreet: document.getElementById('event-street').value,
        eventLocationCity: document.getElementById('event-city').value,
        eventDateTime: document.getElementById('event-date').value,
        eventEndTime: document.getElementById('event-end-time').value,
        eventDuration: document.getElementById('event-duration').value,
        // eventImage: document.getElementById('image-upload').;
        eventDetails: document.getElementById('event-description').value,
        // this probleley needs to changed
        eventTags: document.getElementById('event-tags').value,
    }
    if (gudilines && conditions) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                
            }
        }


        xhr.open('POST', '/create-event');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(formData));
    }
});