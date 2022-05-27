# K9-Meet, Team BBY26's COMP2800 Project #

## Table of Contents ##
* [General info](#general-info)
* [Technologies](#technologies)
* [Content](#content)
* [Running The Project](#running-the-project)
* [Project Features](#project-features)
* [Credits and References](#credits-and-references)
* [Contact Information](#contact-information)

## General Info

K9Meet is a web application to help dog owners alleviate their and 
their dogs’ mental stress from being isolated during the pandemics by letting owners
find others to meet up with and get their much-needed socialization, by focusing
exclusively on dog owners we are able to provide a more streamlined user experience
with features more relevant to our users then other similar apps.
<br/>
This is a web app for made for Comp 2800 & Comp 2537.
<br/>
Members:
* Darren Luck 
* Brian Cherng
* Aryan Jand
* Pahul Sidhu
* Germanpreet Singh

## Technologies
Technologies used for this projects development:
* Node.js
* HTML5
* CSS3
* JavaScript
* Jquery
* MySQL

Node packages that we Implemented.
* Express
* express-session
* mysql2
* Multer
* Crypto
* path

Online version hosted using:
* Amazon Web Services
* Amazon Elastic Beanstalk
* Amazon RDS

Localhost MariaDB server run using:
* XAMPP
* MariaDB

Support Applications used in development:
* Discord
* Trello
* Coggle.it
* Google Docs, Sheets, Calendar
* Slack
* Figma
* Zoom
* Visual Studio Code
* Google Chrome

Source control managed using:
* git
* Github
* SourceTree


## Content
```
Content of the project folder:

C:.
|   .gitignore
|   commands.sql
|   database.sql
|   dev.txt
|   index.js
|   README.md
|   readme.txt
|   
+---app
|   +---html
|   |       404.html
|   |       about-us.html
|   |       account-settings.html
|   |       admin.html
|   |       advanced-search.html
|   |       community-guidelines.html
|   |       contact-us.html
|   |       create-events.html
|   |       create-group.html
|   |       create.html
|   |       event.html
|   |       group-home.html
|   |       group.html
|   |       home.html
|   |       login.html
|   |       lookup.html
|   |       search.html
|   |       share-event.html
|   |       signup.html
|   |       splash.html
|   |       terms-and-conditions.html
|   |       user-profile-editor.html
|   |       user-profile.html
|   |       
|   \---templates
|           footer.html
|           nav-logged-out.html
|           nav.html
|           
\---public
    +---css
    |       404.css
    |       account-settings.css
    |       admin.css
    |       advanced-search.css
    |       client.css
    |       create-events.css
    |       create-group.css
    |       create.css
    |       event.css
    |       group-home.css
    |       group.css
    |       home.css
    |       login.css
    |       lookup.css
    |       signup.css
    |       splash.css
    |       user-profile-editor.css
    |       user-profile.css
    |       
    +---img
    |   |   404.jpg                         // From Pexels.com user Javon Swaby
    |   |   blue-dog-background.png         // the dog from logo editted by Darren
    |   |   bone.svg                        // from https://www.onlinewebfonts.com/icon/556393 , darren edited colour
    |   |   chaser.png                      // the dog from logo editted by darren
    |   |   checkmark.png                   // From pngitem.com
    |   |   desktop-splash.jpg              // From Pexels.com user Julissa Helmuth
    |   |   dog-signup.jpg                  // From Pinterest.com
    |   |   dog.png                         // From Pinpng.com
    |   |   dropdown.png                    // From wikimedia.org
    |   |   favicon.ico                     // Made with favicon.io
    |   |   K_9_Meet-logos.jpeg             // Made using Adobe logomaker
    |   |   logo-transparent-nodog.png      // Made using Adobe logomaker
    |   |   logo-transparent.png            // Made using Adobe logomaker
    |   |   paws.png                        // From freepik.com
    |   |   profile.jpg                     // Made by Darren in paint
    |   |   signup-page-desktop.jpg         // From Pinterest.com
    |   |   splash-image.jpg                // Photo taken by Darren
    |   |   steveston-dog-park.jpg          // Image of steveston dog park 
    |   |   
    |   +---event-imgs
    |   |       events.jpg
    |   |       
    |   +---group-imgs
    |   |       groups.png
    |   |       
    |   +---icons
    |   |       edit.png
    |   |       
    |   \---profile-imgs
    |           profile.jpg
    |           
    \---js
            404.js
            account-settings.js
            admin.js
            advanced-search.js
            create-events.js
            create-group.js
            create.js
            event.js
            group-home.js
            group.js
            home.js
            login.js
            lookup.js
            share-event.js
            signup.js
            skeleton-both.js
            skeleton-logged-in.js
            skeleton.js
            splash.js
            user-profile-editor.js
            user-profile.js
                  
```

## Running The Project ##
The main branch is designed to run on a localhost.

### Languages Used ###
The source code is written using Javascript, CSS, and HTML.<br/>
The database is written for MySQL<br/>

### Software Needed ###
An IDE such as Visual Studio Code is recommended to edit and view the code.<br/>

### Creating Your Local Copy ###
You will need to install git to clone and make changes to your local repo.<br/>
Once git is install create a local folder and run command prompt in it<br/>
If you want to work on our repo you can run
```
C:\CST-Term1\K9-Meet>git clone https://github.com/Darren542/2800-202210-BBY26
```
If you want to start your own repo, create/login into a Github account, navigate to https://github.com/Darren542/2800-202210-BBY26. Then click fork to start your own repo that you can then clone.

### Getting Your Database Running ###
You will need a locally run MySQL database. <br/>
Our suggestion is to install XAMPP and use it to host a MySQL server.<br/>
Once XAMPP is installed and is running a MySQL server you can access it with command prompt
``` 
C:\Apps\xampp\mysql\bin>mysql -u root -p
Enter Password:
``` 
Password will be blank, just hit enter.<br>
Once the locally run MySQL database copy and paste the contents of database.sql into command prompt to created the apps database, tables and some starter accounts and app data.

### Running Your node.js Server ###
You will need to install node.js and npm to run your local version of K9-Meet<br>
Once you have node.js and npm installed you should be able to check with
```
C:\CST-Term1\K9-Meet>npm version
{
  npm: '8.3.1',
  node: '16.14.0',
  v8: '9.4.146.24-node.20',
  uv: '1.43.0',
  zlib: '1.2.11',
  brotli: '1.0.9',
  ares: '1.18.1',
  modules: '93',
  nghttp2: '1.45.1',
  napi: '8',
  llhttp: '6.0.4',
  openssl: '1.1.1m+quic',
  cldr: '40.0',
  icu: '70.1',
  tz: '2021a3',
  unicode: '14.0',
  ngtcp2: '0.1.0-DEV',
  nghttp3: '0.1.0-DEV'
}
```
```
C:\CST-Term1\K9-Meet>node -v
v16.14.0
```
Once those are both running you can either install the needed node.js packages to run the app locally in a node-modules folder in the project or globally<br>
add a -g after 'install' to install globally
```
C:\CST-Term1\K9-Meet>npm install express express-session fs mysql2 crypto path
```
Once all the needed node packages are installed you can start the app
```
C:\CST-Term1\K9-Meet>node index.js
K9-Meet listening on port 8000!
```

## Project Features ##

### Login/Signup ###
K9-Meet will launch onto the splash screen where you navigate to log in or sign up<br/>
This page also has an Easter Egg on it where you can drag and drop the bone on the logo in the top left corner to play fetch with the dog<br/>
You can sign up for a new account using a unique username and email, this will make a regular user account<br/>
If you sign into an admin account you will be sent to admin dashboard where you can edit, add or delete other users accounts<br/>
If you sign into a regular user account you will be sent to the apps home page

The hamburger menu on the top can be used to navigate to the apps different features once logged in
### Profile ###
In the profile page you can view your own profile.<br>
The events tab on the profile page can be used to see your currently RSVPed events, and edit events that you are the owner of.<br>
The 'Edit Profile' button will send you to page where you can edit what is in your profile and what information your profile displays to other users<br>

### Create ###
The Create page allows you choose between creating an new event or a new group.<br/>
Clicking either of these options will start of the task flow to create a new event/group.<br/>
while in the event/group creation task flow you can click 'Save & Quit' to save your partially completed event/group.<br/>
These partially completed saves can be loaded or deleted on the Create page.<br/>
Once all the required fields are filled out (images are optional), the user can click 'Finish' to create their new event/group.<br/>
If the event/group is successfully created the user will be redirected to new event/group's public page where users can see the event/group's details included who has RSVPed/Joined the event so far by clicking on the members tab.

### Search ###
The Search page has three options.<br/>
The 'Users' lets you search for other users accounts then navigate to their profile page.<br/>
The 'Groups'/'Events' options let you search for events/groups that meet the users needs. They can then navigate to the event/group's public page and RSVP/Join the event/group.

### Account Settings ###
The account settings page lets users change their Avatar, username, email and password.<br/>
Admins can change other users Avatars, usernames, emails and passwords.

## Credits and References ##

Code to prevent nodejs server from crashing if database not found from<br/>
@author banguncool & Dharman<br/>
@see https://stackoverflow.com/questions/57469707/how-to-catch-connection-error-with-nodejs-mysql2-library-async-await

Code for drag and drop from feature on Splash page:<br/>
https://javascript.info/mouse-drag-and-drop

Styling to get abbr to work on mobile from:<br/>
https://bitsofco.de/making-abbr-work-for-touchscreen-keyboard-mouse/

## Contact Information ##

Developer Contacts: <br/>
<ul>
<li>Darren - dluck4@my.bcit.ca</li>
<li>Brian - briancherngsch@gmail.com</li>
<li>Aryan - aryan.jand@gmail.com</li>
<li>Pahul - sidhupahul0@gmail.com</li>
<li>Germanpreet - germanpreet3533@gmail.com</li>
</ul>

For question about online version or github repo contact Darren<br/>
