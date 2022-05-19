const whatsapp = document.querySelector('.whatsapp');
const telegram  = document.querySelector('.telegram');
const twitter  = document.querySelector('.twitter')
const pageurl = location.href;

const message = " This app contains awesome events to socialize and its a lot of fun. Take time to explore them.";


const whatsappApi=`https://wa.me/?text-${pageUrl}.${message}`;
const telegramApi = `https://t.me/share/url?url-${pageUrl}&text-${message}`;
const twitterApi=`https://twitter.com/intent/tweet?text-${pageUrl}.${message}`;


whatsapp.addEventListener("click",() =>{
    window.open(url = whatsapp, target = "blank" )
})
telegram.addEventListener("click",() =>{
    win
})
twitter.addEventListener('click',() =>{
    
})

