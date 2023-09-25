const hole = document.querySelectorAll(".hole");
const worm = document.querySelector(".worm-container");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const time = 2500;
let style = parseInt(worm.style.width);
let intervalId;
let i = 0;
let j = 0;

function baby(num, type) {
    return `<img data-index="${num}" data-type="${type}" src="mole-game/${type}.png" alt="mole" class="mole">`;
}

function getRandomHole() {
    const index = Math.floor(Math.random() * hole.length);
    if (!hole[index].querySelector(".mole")) {
        return index;
    }
}

function setMole() {
    const i = getRandomHole();
    if (i !== undefined) {
        const moleElement = hole[i].querySelector(".mole");
        if (moleElement) {
            return;
        }
        const moleData = { clicked: false };
        hole[i].innerHTML = baby(i, "hungry");

        const clickHandler = () => {
            const { clicked } = moleData;
            if (!clicked) {
                if (hole[i].querySelector(".mole[data-type='hungry']")) {
                    moleData.clicked = true;
                    fed(i);
                    hole[i].removeEventListener("click", clickHandler);
                }
            }
        };

        hole[i].addEventListener("click", clickHandler);

        setTimeout(() => {
            if (!moleData.clicked) {
                if (hole[i].querySelector(".mole[data-type='hungry']")) {
                    sad(i);
                }
            }
        }, time);
    }
}

function fed(i) {
    hole[i].innerHTML = baby(i, "fed");
    style += 5;
    worm.style.width = `${style}%`;
    if (style === 70) {
        document.getElementById("win").style.display = "block";
        document.getElementById("playing").style.display = "none";
        clearInterval(intervalId);
        return;
    }
    setTimeout(() => leaving(i), time);
}

function sad(i) {
    hole[i].innerHTML = baby(i, "sad");
    setTimeout(() => leaving(i), time);
}

function leaving(i) {
    hole[i].innerHTML = baby(i, "leaving");
    setTimeout(() => rmv(i), time);
}

function rmv(i) {
    hole[i].innerHTML = '';
}

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
        requestAnimationFrame(timer);
    }, 1000);
}

function startGame() {
    document.getElementById("start").style.display = "none";
    document.getElementById("playing").style.display = "block";
    intervalId = setInterval(() => {
        setMole();
    }, time);
    timer();
}

document.querySelector(".start-button").addEventListener("click", startGame);
