const moves = document.getElementById('moves-count');
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const result = document.getElementById('result');
const gameContainer = document.querySelector('.game-container');
const controls = document.querySelector('.controls-container');

let cards;
let interval;
let firstCard = false;
let secondCard = false;

const items = [
    { name: "corgi",    image:"corgi.png"},
    { name: "cat",      image:"cat.png"},
    { name: "donkey",   image:"donkey.png"},
    { name: "fish",     image:"fish.png"},
    { name: "pig",      image:"pig.png"},
    { name: "snail",    image:"snail.png"},
    { name: "turtle",   image:"turtle.png"},
    { name: "octopus",  image:"octopus.png"},
    { name: "peacock",  image:"peacock.png"},
    { name: "squirrel", image:"squirrel.png"},
    { name: "unicorn",  image:"unicorn.png"},
    { name: "crab",     image:"crab.png"},

];

let seconds = 0, minutes=0;
let movesCount = 0, winCount=0;

const timerGenerator = () => {
    seconds += 1;
    if(seconds >= 60){
        minutes += 1;
        seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}`: seconds;
    let minutesValue = minutes < 10 ? `0${minutes}`: minutes;
    timeValue.innerHTML = `<span>Time: </span>${minutesValue} : ${secondsValue}`;
};

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves</span>${movesCount}`;
};

const generateRandom = (size = 4) => {

    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;

    for (let i =0; i < size; i++){
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = '';
    cardValues = [...cardValues, ...cardValues];

    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML += `<div class="card-container" data-card-value="${cardValues[i].name}">
         <div class="card-before">🙈</div>
         <div class="card-after"><img src= "${cardValues[i].image}" class="image"/></div>
        </div>`;
    } 
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                if(!firstCard){
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                }
                else{
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue){
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
    
                        firstCard = false;
                        winCount += 1;
                        
                        if (winCount == Math.floor(cardValues.length / 2)) {
                            result.innerHTML = ` <h2>You Won</h2> <h4>Moves: ${movesCount}</h4>  `;
                            stopGame();
                        }
    
                    }
                    else{
                        let [tempFirst , tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
    
                        }, 900);
                    }
                }
            }
        });
    });        
};

startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");

    interval = setInterval(timerGenerator,1000);
    moves.innerHTML = `<span>Moves: </span> ${movesCount}`;
    initializer();
});

stopButton.addEventListener(
    "click",
    (stopGame = () => {
        controls.classList.remove("hide");
        stopButton.classList.add("hide");
        startButton.classList.remove("hide");
        clearInterval(interval);
    })
);

const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};






