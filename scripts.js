const allHoles = document.querySelectorAll(".hole-container")
const holes = document.querySelectorAll(".hole");
const worm = document.querySelector(".worm-container");
const wormBox = document.querySelector(".worm-box");
const win = document.querySelector(".win");
const bg = document.querySelector(".bg");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");

let timeoutId;
let intervalId;
let style = parseInt(worm.style.width);
const time = 4000;

function baby(num, type) {
    return `<img data-index="${num}" data-type="${type}" src="mole-game/${type}.png" alt="mole" class="mole" onclick="moleClicked(this);">`;
}

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function startMoleTimer(mole) {
    timeoutId = setTimeout(() => {
        const moleType = mole.getAttribute('data-type');
        const moleIndex = mole.getAttribute('data-index');
        if (moleType === 'hungry') {
            mole.setAttribute('data-type', 'sad');
            mole.src = 'mole-game/sad.png';
            setTimeout(() => {
                mole.setAttribute('data-type', 'leaving');
                mole.src = 'mole-game/leaving.png';
                setTimeout(() => {
                    if(mole.parentNode){
                        mole.parentNode.removeChild(mole);
                    }else{
                        holes[moleIndex-1].removeChild(holes[moleIndex-1].firstChild); 
                    }
                }, time);
            }, time);
        }
    }, time);
}


function moleClicked(mole) {
    const moleType = mole.getAttribute('data-type');
    if (moleType === 'hungry') {
        mole.setAttribute('data-type', 'fed');
        mole.src = 'mole-game/fed.png';
        style += 5;
        worm.style.width = `${style}%`;
        if (style === 70) {
            win.style.display = "block";
            bg.style.display = "none";
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        }
        setTimeout(() => {
            mole.setAttribute('data-type', 'leaving');
            mole.src = 'mole-game/leaving.png';
            setTimeout(() => {
                mole.parentNode.removeChild(mole);
            }, time);
        }, time);
    }
}

function createRandomMole() {
    const moleIndex = rand(1, holes.length);
    let moleType = 'hungry';

    const existingMole = holes[moleIndex - 1].querySelector('.mole');
    if (existingMole) {
        moleType = existingMole.getAttribute('data-type');
    }

    if (moleType === 'hungry' || moleType === 'sad') {
        holes[moleIndex - 1].innerHTML = baby(moleIndex, moleType);
        startMoleTimer(holes[moleIndex - 1].querySelector('.mole'));
    }
}

let i = 0;
let j = 0;

function timer() {
    setTimeout(() => {
        if (i === 59) {
            i = 0;
            j++;
            minutes.innerHTML = j;
            if (j === 60) {
                clearInterval(intervalId);
            }
        } else {
            i++;
        }
        seconds.innerHTML = i;
    }, 1000);
}

function startGame() {
    intervalId = setInterval(() => {
        createRandomMole();
        timer();
    }, 1000);
}

function start(ev) {
    ev.target.style.display = "none";
    wormBox.style.display = "flex";
    allHoles.forEach(box => {
        box.style.display = 'flex';
      });
      startGame();
}

