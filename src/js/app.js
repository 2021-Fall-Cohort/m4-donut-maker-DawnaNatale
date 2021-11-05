const donutButton = document.getElementById("donut");
const donutSpan = document.getElementById("donutSpan");
const toggle = document.getElementsByClassName("toggleButton");
const autoClickerButton = document.getElementById("autoClicker");
const autoClickersPurchased = document.getElementById("autoSpan");
const autoClickerCostSpan = document.getElementById("autoCost");
const multiplierButton = document.getElementById("multiplierClicker");
const multipliersPurchased = document.getElementById("multiplierSpan");
const multiplierCostSpan = document.getElementById("multiplierCost");
const donutsPerClickSpan = document.getElementById("donutsPerClick");

const collapseBtn = document.getElementsByClassName("collapsible");
const resetBtn = document.getElementById("reset");
const title = document.getElementsByClassName("title");

const quickAudio = document.getElementById("quickAudioContainer");
const errorAudio = document.getElementById("errorAudioContainer");
const successAudio = document.getElementById("successAudioContainer");
const restartAudio = document.getElementById("restartAudioContainer");


for (let i = 0; i < collapseBtn.length; i++) {
    collapseBtn[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
};

function myFunction() {
    var x = document.getElementById("myTopNav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

let donut = new donutMaker();
donutSpan.innerText = donut.getCount().toFixed(0);
autoClickersPurchased.innerText = donut.getACCount();
multipliersPurchased.innerText = donut.getMultiplierCount();
autoClickerCostSpan.innerText = donut.getAutoCost();
multiplierCostSpan.innerText = donut.getMultiplierCost();
donutsPerClickSpan.innerText = donut.rate;


updateDash = () => {
    donutSpan.innerText = donut.getCount().toFixed(0);
    autoClickersPurchased.innerText = donut.getACCount();
    multipliersPurchased.innerText = donut.getMultiplierCount();
    autoClickerCostSpan.innerText = donut.getAutoCost().toFixed(0);
    multiplierCostSpan.innerText = donut.getMultiplierCost().toFixed(0);
    donutsPerClickSpan.innerText = donut.rate;
};

donutButton.addEventListener("click", function () {
    var button = this;
    this.classList = "";
    setTimeout(function () {
        button.classList.add('bounce');
    }, 2);
    donut.bake();
    donutSpan.innerText = donut.getCount().toFixed(0);
    quickAudio.play();
});

autoClickerButton.addEventListener("click", function () {
    if (donut.donutCount < donut.autoClickerCost) {
        errorAudio.play();
        alert(`You don't have enough donuts to purchase this yet. You still need ${donut.autoClickerCost - donut.donutCount} donuts.`)
    } else {
        successAudio.play();
        var button = this;
        this.classList = "";
        setTimeout(function () {
            button.classList.add('spin');
        }, 2);
        donut.autoClickersPurchased += 1;
        donut.recalculateRate();
        donut.donutCount -= donut.autoClickerCost;
        donut.autoClickerCost *= 1.1;
        console.log(donut.rate);
        startAutoClicking();
    }
});

multiplierButton.addEventListener("click", function () {
    if (donut.donutCount < donut.multiplierCost) {
        errorAudio.play();
        alert(`You don't have enough donuts to purchase this yet. You still need ${donut.multiplierCost - donut.donutCount} donuts.`)
    } else {
        successAudio.play();
        var button = this;
        this.classList = "";
        setTimeout(function () {
            button.classList.add('spin');
        }, 2);
        donut.multipliersPurchased += 1;
        donut.recalculateRate();
        donut.donutCount -= donut.multiplierCost;
        donut.multiplierCost *= 1.1;
        console.log(donut.rate);
        updateDash();
    }
});


function startAutoClicking() {
    if (donut.autoClickerId == undefined) {
        donut.autoClickerId = setInterval(
            () => {
                for (let i = 0; i < donut.autoClickersPurchased; i++) {
                    donut.bake();
                    updateDash();
                }
            }, 1000);
    }
};

resetGame = () => {
    donut.donutCount = 90;
    donut.autoClickersPurchased = 0;
    donut.multipliersPurchased = 0;
    donut.autoClickerCost = 100;
    donut.multiplierCost = 100;
    donut.rate = 1;
    updateDash();
};

resetBtn.addEventListener("click", function () {
    restartAudio.play();
    resetGame();
});
