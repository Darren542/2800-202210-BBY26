Team Members:
Darren Luck, A00964037, Set 1D, May 13th 2022
Brian Cherng, A01056291, Set 1C, May 13th 2022
Aryan Jand, A01169131, Set 1C, May 13th 2022
Pahul Sidhu, A01310077, Set 1A, May 13th 2022
Germanpreet Singh, A01312851, Set 1A, May 13th 2022

This assignment is 90% complete.

The default password for all users in 123

All of the functionality for all milestones is present, but the ui/ux could use more work.

There is some work that needs to be done on the backend dealing with timezones, generally times are taken from users and displayed as if they are all UTC,
but the search function searches on the users timezone.

Some of the pages need more work on their CSS, especially on their desktop views.

Milestone #3 Instructions
We have implemented both a pseduo shopping cart and a timeline.

The shopping cart can be seen by:
1. Log in to a user (eg.username: dluck pw: 123)
2. Openning the hamburger menu and clicking create
3. Choose either create group or create event works for both
4. Fill in details of the event or group
5. click save & quit button - this will create a save in the database
6. will take you back to create page where it will have banner letting you know about your saved shopping cart/creation
7. You can click load and it will bring you back into event/group creation with the details you had already filled out or Click delete if you no longer want that save.
8. You can then finish creating the event/group from your save by clicking finish, doing this will delete the saved object and create the event/group.
One problem currently is that images are not saved and loaded in your saved event/group creations. And will have to be reinputted if you tried to save one.
I also have images limited to 150kbs max atm.


The timeline can be seen by:
1. Login to a user (username: bcherng, pw: 123)
2. Open the navbar and click on profile
3. Click on the events tab

The timeline can be edited by (only as the event creator):
1. Login to a user (username: bcherng, pw:123)
2. Open the navbar and click on create event
3. Fill in and confirm, on the last page, click on "join"
4. Open the navbar and click on profile
5. Click on the events tab
6. Click on the edit button on the top right of the created event
7. Edit info in the popup
8. Press confirm and click on events tab again to see changes

The timeline can be unreserved by (only as non event creator):
1. Login to a user (username: bcherng, pw:123)
2. Open the navbar and click on profile
3. Click on the events tab and then clicking the "x" button on events you want to unreserve
4. The page is reloaded, click on events tab to see that the unreserved event no longer shows up

The timeline can be deleted by (only as event creator):
1. Login to a user (username: bcherng, pw:123)
2. Open the navbar and click on create event
3. Fill in and confirm, on the last page, click on "join"
4. Open the navbar and click on profile
5. Click on the events tab
6. Click on the "X" button on the top right of the created event
7. The page is reloaded, click on events tab to see that the deleted event no longer shows up

(8). to check that deleted events disappear from other users' RSVP list, you'll have to
do an extra step after 5 where you login to another user (username: testuser, pw:123)
and going to the home page, find and reserve the created event, then login back onto bcherng.