let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let highestScore = 0;

let h3 = document.querySelector("h3");

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {

        started = true;
        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    let randbtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    btnFlash(randbtn);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function checkAns(idx) {

    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {

        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        if (highestScore < level - 1) {
            highestScore = level - 1;
            h3.innerText = `Highest Score = ${level - 1}`;
        }
        reset();

    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}