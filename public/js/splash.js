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

setTimeout(() => {
    let newEle = `<img src="/img/bone.svg" style="cursor: pointer; position: absolute; z-index: 11000; left: 8px; top: 59px; color:white" width="40" height="40" id="ball"></img>`
    let chaser = `<img src="/img/chaser.png" style="cursor: pointer; position: absolute; z-index: 11000; left: 89px; top: 4.5px;" width="60" height="65" id="chaser"></img>`
    document.querySelector("#logo-image").src = "/img/logo-transparent-nodog.png";
    document.querySelector("#navbar-placeholder").innerHTML += newEle;
    document.querySelector("#navbar-placeholder").innerHTML += chaser;
    let ball = document.querySelector("#ball");
    
    
      
    ball.ondragstart = function() {
        return false;
    };
    
    
    ball.addEventListener('touchstart', touchingFunction);
    ball.addEventListener('mousedown', mousingFunction);  
    

}, 50);
let xCoord = 0;
let yCoord = 0;

function returnBall(x, y) {
    let chaser = document.querySelector("#chaser");
    let ball = document.querySelector("#ball");
    ball.removeEventListener("touchstart", touchingFunction);
    ball.removeEventListener("mousedown", mousingFunction);
    chaser.style.transition = "all 2s";
    chaser.style.transform = `translateX(${x - 104}px) translateY(${y - 43}px)`;
    setTimeout(() => {
        chaser.style.transition = "all 2s";
        chaser.style.transform = `translateX(${0}px) translateY(${0}px)`;
        ball.style.transition = "all 2s";
        ball.style.transform = `translateX(${100 - x}px) translateY(${40 - y}px)`;
    }, 2000);

    setTimeout(() => {
        ball.classList.add('no-show');
    }, 4000);
    
}

// For the mobile view to move ball
function touchingFunction(event) {
    // (1) prepare to moving: make absolute and on top by z-index
    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;

    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    document.body.append(ball);

    // centers the ball at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
        ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
        ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
    }

    // move our absolutely positioned ball under the pointer
    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
        xCoord = event.touches[0].clientX;
        yCoord = event.touches[0].clientY;
        moveAt(event.touches[0].clientX, event.touches[0].clientY);
    }

    // (2) move the ball on mousemove
    document.addEventListener('touchmove', onMouseMove);

    // // (3) drop the ball, remove unneeded handlers
    ball.addEventListener("touchend", (e) => {
        ball.removeEventListener('touchmove', onMouseMove);
        ball.touchend = null;
        returnBall(xCoord, yCoord);
    });
}

// Code for drag and drop from:
//https://javascript.info/mouse-drag-and-drop
// for desktop users to move ball
function mousingFunction(event) {
    let ball = document.querySelector("#ball");
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
  
    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    document.body.append(ball);
  
    moveAt(event.pageX, event.pageY);
  
    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      ball.style.left = pageX - shiftX + 'px';
      ball.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
        xCoord = event.pageX;
        yCoord = event.pageY;
      moveAt(event.pageX, event.pageY);
    }
  
    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the ball, remove unneeded handlers
    ball.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      ball.onmouseup = null;
      returnBall(xCoord, yCoord);
    };
  
};