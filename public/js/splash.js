"use strict";
document.querySelector("#log-in").addEventListener("click", () => {
    window.location.href = "/login";
})

document.querySelector("#sign-up").addEventListener("click", () => {
    window.location.href = "/signup";
})

document.querySelector("#popular-event").addEventListener("click", () => {
    window.location.href = "/event";
})

function startEasterEgg() {
    setTimeout(() => {
        let newEle = `<img src="/img/bone.svg" style="cursor: pointer; position: absolute; z-index: 11000; left: 8px; top: 59px; color:white" width="40" height="40" id="bone"></img>`
        let chaser = `<img src="/img/chaser.png" style="cursor: pointer; position: absolute; z-index: 11000; left: 89px; top: 4.5px;" width="60" height="65" id="chaser"></img>`
        document.querySelector("#logo-image").src = "/img/logo-transparent-nodog.png";
        document.querySelector("#navbar-placeholder").innerHTML += newEle;
        document.querySelector("#navbar-placeholder").innerHTML += chaser;
        let bone = document.querySelector("#bone");
        
        
          
        bone.ondragstart = function() {
            return false;
        };
        
        
        bone.addEventListener('touchstart', touchingFunction);
        bone.addEventListener('mousedown', mousingFunction);  
        
    
    }, 50);
}

let xCoord = 0;
let yCoord = 0;
startEasterEgg();
function returnbone(x, y) {
    let chaser = document.querySelector("#chaser");
    let bone = document.querySelector("#bone");
    bone.removeEventListener("touchstart", touchingFunction);
    bone.removeEventListener("mousedown", mousingFunction);
    chaser.style.transition = "all 2s";
    chaser.style.transform = `translateX(${x - 104}px) translateY(${y - 43}px)`;
    setTimeout(() => {
        chaser.style.transition = "all 2s";
        chaser.style.transform = `translateX(${0}px) translateY(${0}px)`;
        bone.style.transition = "all 2s";
        bone.style.transform = `translateX(${100 - x}px) translateY(${40 - y}px)`;
    }, 2000);

    setTimeout(() => {
        bone.classList.add('no-show');
    }, 4000);

    setTimeout(() => {
        bone.remove();
        chaser.remove();
        startEasterEgg(); 
    }, 6000);
    
}

// For the mobile view to move bone
function touchingFunction(event) {
    // (1) prepare to moving: make absolute and on top by z-index
    bone.style.position = 'absolute';
    bone.style.zIndex = 1000;

    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    document.body.append(bone);

    // centers the bone at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
        bone.style.left = pageX - bone.offsetWidth / 2 + 'px';
        bone.style.top = pageY - bone.offsetHeight / 2 + 'px';
    }

    // move our absolutely positioned bone under the pointer
    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
        xCoord = event.touches[0].clientX;
        yCoord = event.touches[0].clientY;
        moveAt(event.touches[0].clientX, event.touches[0].clientY);
    }

    // (2) move the bone on mousemove
    document.addEventListener('touchmove', onMouseMove);

    // // (3) drop the bone, remove unneeded handlers
    bone.addEventListener("touchend", (e) => {
        bone.removeEventListener('touchmove', onMouseMove);
        bone.touchend = null;
        returnbone(xCoord, yCoord);
    });
}

// Code for drag and drop from:
//https://javascript.info/mouse-drag-and-drop
// for desktop users to move bone
function mousingFunction(event) {
    let bone = document.querySelector("#bone");
    let shiftX = event.clientX - bone.getBoundingClientRect().left;
    let shiftY = event.clientY - bone.getBoundingClientRect().top;
  
    bone.style.position = 'absolute';
    bone.style.zIndex = 1000;
    document.body.append(bone);
  
    moveAt(event.pageX, event.pageY);
  
    // moves the bone at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      bone.style.left = pageX - shiftX + 'px';
      bone.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
        xCoord = event.pageX;
        yCoord = event.pageY;
      moveAt(event.pageX, event.pageY);
    }
  
    // move the bone on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the bone, remove unneeded handlers
    bone.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      bone.onmouseup = null;
      returnbone(xCoord, yCoord);
    };
  
};