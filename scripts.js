var holes = document.getElementsByClassName("hole");
var worm = document.getElementsByClassName("worm-container")
var win = document.getElementsByClassName("win")
var bg = document.getElementsByClassName("bg")
var timeoutId;
var inertval_id;
var style = parseInt(worm[0].style.width);

function baby(num, type) {
    return '<img data-index="' + num + '" data-type="' + type + '" src="mole-game/' + type + '.png" alt="mole" class="mole" onclick="moleClicked(this);">';
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startMoleTimer(mole) {
    timeoutId = setTimeout(function () {
        var moleType = mole.getAttribute('data-type');
        if (moleType === 'hungry') {
            mole.setAttribute('data-type', 'sad');
            mole.src = 'mole-game/sad.png';
            setTimeout(function () {
                mole.setAttribute('data-type', 'leaving');
                mole.src = 'mole-game/leaving.png';
                setTimeout(function () {
                    if(mole.parentNode){
                        mole.parentNode.removeChild(mole);
                    }
                }, 500);
            }, 500);
            setTimeout(function () {
                moleClicked(mole);
            }, 500);
        }
    }, 1000);
}

function moleClicked(mole) {
    var moleType = mole.getAttribute('data-type');
    if (moleType === 'hungry') {
        mole.setAttribute('data-type', 'fed');
        mole.src = 'mole-game/fed.png';
        style = style + 5;
        worm[0].style.width = style + "%"
        if(style === 100){
            win[0].style.display = "block";
            bg[0].style.display = "none";
            clearInterval(inertval_id);
            clearTimeout(timeoutId);
            console.log("khedama");
        }
        setTimeout(function () {
            mole.setAttribute('data-type', 'leaving');
            mole.src = 'mole-game/leaving.png';
            setTimeout(function () {
                mole.parentNode.removeChild(mole);
            }, 500);
        }, 500);
    }
}

function createRandomMole() {
    console.log("fhgfgcg");
    var moleIndex = rand(1, holes.length);
    var moleType = 'hungry';

    var existingMole = holes[moleIndex - 1].querySelector('.mole');
    if (existingMole) {
        moleType = existingMole.getAttribute('data-type');
    }

    if (moleType === 'hungry' || moleType === 'sad') {
        holes[moleIndex - 1].innerHTML = baby(moleIndex, moleType);
        startMoleTimer(holes[moleIndex - 1].querySelector('.mole'));
    }
}

function startGame() {
    console.log(style);
    if(style == 100){
        console.log(style);
        clearInterval(inertval_id)
    }else {
        inertval_id = setInterval(function () {
            createRandomMole();
        }, 1000);
    }
}

startGame();
