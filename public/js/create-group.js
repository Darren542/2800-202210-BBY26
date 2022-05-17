// Page user starts on by default
var pageNumber = 1;

document.querySelector("#next-btn").addEventListener("click", () => {
    if (pageNumber < 5) {
        pageNumber++;
        showHidePages(pageNumber);
    }
});

document.querySelector("#back-btn").addEventListener("click", () => {
    if (pageNumber >= 1) {
        pageNumber--;
        showHidePages(pageNumber);
    }
});

// Handles showing the correct to display elements to users
function showHidePages (goto) {
    // hide all the other pages and show only goto
    document.querySelectorAll(".page").forEach( (page) => {
        page.classList.remove("page");
        page.classList.add("no-show");
    });
    document.querySelector(`#page-${goto}`).classList.add("page");
    document.querySelector(`#page-${goto}`).classList.remove("no-show");


    // hide all the other titles and show only current one
    document.querySelectorAll(".progress-span").forEach( (page) => {
        page.classList.remove("show");
        page.classList.add("no-show");
    });
    document.querySelector(`#span-${goto}`).classList.add("show");
    document.querySelector(`#span-${goto}`).classList.remove("no-show");

    // Change background colour on progress bar to show progress
    for (let i = 1; i < 6; i++) {
        if (i <= goto) {
            document.querySelector(`#part-${i}`).classList.add("filled");
            document.querySelector(`#part-${i}`).classList.remove("unfilled");
        } else {
            document.querySelector(`#part-${i}`).classList.remove("filled");
            document.querySelector(`#part-${i}`).classList.add("unfilled");
        }
    }
    
    // Don't show back button on page 1
    if (goto == 1) {
        document.querySelector('#back-btn').classList.remove("btn");
        document.querySelector('#back-btn').classList.add("no-show");
    } else {
        document.querySelector('#back-btn').classList.add("btn");
        document.querySelector('#back-btn').classList.remove("no-show");
    }

    // Don't show next button on page 5 and show finish button
    if (goto == 5) {
        document.querySelector('#next-btn').classList.remove("btn");
        document.querySelector('#next-btn').classList.add("no-show");
        document.querySelector('#finish-btn').classList.add("btn");
        document.querySelector('#finish-btn').classList.remove("no-show");
    } else {
        document.querySelector('#next-btn').classList.add("btn");
        document.querySelector('#next-btn').classList.remove("no-show");
        document.querySelector('#finish-btn').classList.remove("btn");
        document.querySelector('#finish-btn').classList.add("no-show");
    }
}

document.querySelectorAll(".premade-tag").forEach( (tag) => {
    tag.addEventListener("click", () => {
        document.querySelector("#tag-input").value += tag.innerHTML;
    })
});