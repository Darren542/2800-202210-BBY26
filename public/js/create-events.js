"use strict";
let page_num = 1;

document.getElementById('page2').classList.add('no-show');
document.getElementById('page3').classList.add('no-show');
document.getElementById('page4').classList.add('no-show');

document.getElementById('next-btn').addEventListener('click', function(e) {
    e.preventDefault();
    page_num++;
});

const xhr = new XMLHttpRequest();
xhr.onload = function () {

    if (this.readyState == XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            if (page_num == 1) {
                document.getElementById('page1').classList.remove('no-show');
                document.getElementById('page2').classList.add('no-show');
                document.getElementById('page3').classList.add('no-show');
                document.getElementById('page4').classList.add('no-show');
            } else if (page_num == 2) {
                document.getElementById('page1').classList.add('no-show');
                document.getElementById('page2').classList.remove('no-show');
                document.getElementById('page3').classList.add('no-show');
                document.getElementById('page4').classList.add('no-show');
            } else if (page_num == 3) {
                document.getElementById('page1').classList.add('no-show');
                document.getElementById('page2').classList.add('no-show');
                document.getElementById('page3').classList.remove('no-show');
                document.getElementById('page4').classList.add('no-show');

            } else if (page_num == 4) {
                document.getElementById('page1').classList.add('no-show');
                document.getElementById('page2').classList.add('no-show');
                document.getElementById('page3').classList.add('no-show');
                document.getElementById('page4').classList.remove('no-show');

            }
        }
    }
    
}