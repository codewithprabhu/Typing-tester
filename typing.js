const typingtext = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistakes span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')

// Set values
let timer;
let maxtime = 60;
let timeleft = maxtime;
let charindex = 0;
let mistake = 0;
let istyping = false;

function loadparagraph() {
    const paragraph = [
        "Avoid daydreaming about the years to come.",
        "You are the most important person in your whole life.",
        "Always be true to who you are, and ignore what other people have to say about you.",
        "Only demonstrate your strength when it’s really required.",
        "Subscribe to Drop X Out"
    ];

    const randomindex = Math.floor(Math.random() * paragraph.length);
    typingtext.innerHTML = '';

    for (const char of paragraph[randomindex]) {
        typingtext.innerHTML += `<span>${char}</span>`;
    }

    typingtext.querySelectorAll('span')[0].classList.add('active');

    typingtext.addEventListener("click", () => input.focus());
}

// Handle user input
function initTyping() {
    const char = typingtext.querySelectorAll('span');
    const typedchar = input.value.charAt(charindex); // FIXED

    if (charindex < char.length && timeleft > 0) {

        if(!istyping){
            timer = setInterval(initTime,1000);
            istyping=true;
        }
        if (char[charindex].innerText.toLowerCase() === typedchar.toLowerCase()) { // FIXED
            char[charindex].classList.add('correct');
        } else {
            mistake++;
            char[charindex].classList.add('incorrect'); // Fixed class name (case-sensitive)
        }
        charindex++;
        char[charindex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charindex - mistake;
    }
    else{
        clearInterval(time);
        input.value='';
    }
}


function initTime(){
    if(timeleft>0){
        timeleft--;
        time.innerText=timeleft;
        let wpmval = Math.round((charindex-mistake)/5)/(maxtime - timeleft)*60;
        wpm.innerText = wpmval;
    }
    else{
        clearInterval(time);
    }
}
 function reset(){
    loadparagraph();
    clearInterval(timer);
    timeleft = maxtime;
    time.innerText=timeleft;
    Int16Array;
    let charindex =0;
    mistake = 0;
    istyping = false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
 }
input.addEventListener("input", initTyping);
btn.addEventListener("click",reset);
loadparagraph();
