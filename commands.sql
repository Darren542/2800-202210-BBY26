/* some useful queries to get data from database */

select * from bby_26_events
WHERE eventID not in (select eventID from bby_26_rsvp WHERE userID = 6);

select * from bby_26_events 
WHERE eventID not in (select eventID from bby_26_rsvp WHERE userID = 6) AND event_date_time > CURRENT_TIMESTAMP;

select * from bby_26_events WHERE eventID 
in (
    select eventID from bby_26_tag 
    WHERE tags = "smallDogs" AND ?
    OR tags = "bigDogs" AND ?
    OR tags = "allDogs" AND ?
    OR tags = "puppies" AND ?
    OR tags = "oldDogs" AND ?
    OR tags = "outside" AND ?
    OR tags = "youngPeople" AND ?
    OR tags = "oldPeople" AND ?
    ) 
AND event_date_time > CURRENT_TIMESTAMP;

SELECT city, street, event_name, event_date_time, event_end_time, event_duration, event_photo, event_description 
FROM bby_26_events 
INNER JOIN bby_26_event_address
ON bby_26_events.eventID = bby_26_event_address.eventID
WHERE bby_26_events.eventID IN (
    SELECT eventID
    FROM bby_26_tag
    WHERE ((tags = 'smallDogs' AND TRUE) 
    OR (tags = 'bigDogs' AND FALSE) 
    OR (tags = 'allDogs' AND FALSE) 
    OR (tags = 'puppies' AND FALSE) 
    OR (tags = 'oldDogs' AND FALSE) 
    OR (tags = 'outside' AND FALSE) 			
    OR (tags = 'youngPeople' AND FALSE) 
    OR (tags = 'oldPeople' AND FALSE))
) 
AND bby_26_event_address.city = "Test"
AND event_end_time > CURRENT_TIMESTAMP;

SELECT city, group_name, group_photo, group_description 
FROM BBY_26_groups
WHERE groupID IN (
	SELECT groupID
	FROM bby_26_tag
	WHERE ((tags = 'smallDogs' AND FALSE) 
	OR (tags = 'bigDogs' AND TRUE) 
	OR (tags = 'allDogs' AND FALSE) 
	OR (tags = 'puppies' AND FALSE) 
	OR (tags = 'oldDogs' AND FALSE) 
	OR (tags = 'outside' AND FALSE) 			
	OR (tags = 'youngPeople' AND FALSE) 
	OR (tags = 'oldPeople' AND FALSE))
);