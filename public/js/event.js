'use strict';

let data = '/event-info/:1';
fetch(data).then(x => x.json()).then(y => {
    console.log(y);
    document.getElementById('event-name').innerHTML = y.event_name
    document.getElementById('event-location').innerHTML = y.street + " " + y.city
    document.getElementById('event-owner').innerHTML = y.username
    document.getElementById('event-description').innerHTML = y.event_description;
});

// fetch(data).then(x => x.json()).then(y => document.getElementById('location').innerHTML = y.event_name);
// fetch(data).then(x => x.json()).then(y => let eventTime = y.event_date_time);
// fetch(data).then(x => x.json()).then(y => document.getElementById('ev').innerHTML = y.event_name);

