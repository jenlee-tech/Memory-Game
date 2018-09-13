/*variables related to the cards and deck*/
let deck = document.querySelector('.deck');
const allCards = document.querySelectorAll('.card')
let newDeck;

let symbols = ["fa fa-diamond",
"fa fa-paper-plane-o",
"fa fa-anchor", 
"fa fa-bolt",
"fa fa-cube",
"fa fa-leaf",
"fa fa-bicycle",
"fa fa-bomb"];

let moreSymbols = symbols.concat(symbols); /*doubling the symbols to prevent typo errors*/

/*an array that was created for (clicked to show) open cards and its associated variables*/
let openCards = []; 
let firstCard;
let secondCard;

/*an array that was created for matched cards and variables associated with matching
cards/counter*/
let matchCards = [];
let matchCounter = 0;
const matchPairs = 8;

/*variables for time related functions*/
let clockOff = true;
let time = 0;
let timeStamp;

/*variables related to the moves function*/
let moves = 0;
const movesNumber = document.querySelector('.moves');

/*variables for stars function*/
const starSymbol = '<li><i class="fa fa-star"></i></li>';
let starScore = document.querySelector('.stars');


/*variables for modal feature and other functions*/
let showTimeStat = document.querySelector('.modal_time');
let showStarStat = document.querySelector('.modal_stars');
let showMoveStat = document.querySelector('.modal_moves');

/*event listeners for restart feature on the board*/
const reload = document.querySelector('.restart');
reload.addEventListener('click', replayGame);

/*event listener to hide the modal*/
function hideModal(){
    document.getElementById("modal").style.display = "none";
}

/*event listener for cancel button and exit feature*/
const modalCancelBtn = document.querySelector('.modal_cancel');
modalCancelBtn.addEventListener('click', hideModal);

const modalExitBtn = document.querySelector('.closeBtn');
modalExitBtn.addEventListener('click', hideModal);


/*event listener for replay button*/
const modalReplayBtn = document.querySelector('.modal_replay');
modalReplayBtn.addEventListener('click', replayGame);

/*Event listener when a card is clicked*/
deck.addEventListener('click', event => {
    const onClick = event.target;
    if (onClick.classList.contains('card') && openCards.length < 2) {
        if (clockOff) {
            initTime();
            clockOff=false;
        }
      flipCard(onClick);
      openCardGroup(onClick);
        if (openCards.length === 2) {
            console.log("I have two cards");
            checkMatch();
            checkMoves();
            starBoard();
        }
    }
});


/*CALLING THE FUNCTIONS THAT SHUFFLE CARDS AND CREATES THE BOARD*/
shuffleCards();
createBoard();


/*function that shuffles the cards*/
function shuffleCards(){
newDeck = shuffle(moreSymbols);
}

//*A Shuffle function from http://stackoverflow.com/a/2450976 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*function that creates the board*/
function createBoard(){
    newDeck.forEach(function(element) {
        let card = document.createElement("li");
        card.classList.add('card');
        let iclass='<i class =' + '"' + element + '"'+ '></i>';
        card.innerHTML=iclass;
        console.log(element);
        console.log(card);
        deck.appendChild(card);
    });
}

/*this function pushes the open card into an array*/
function openCardGroup(onClick) {
    openCards.push(onClick);
    console.log(openCards);
}

/*this function test if the open cards; if they match, freeze cards and then 
push them in matchCards array*/
function checkMatch () {
    firstCard = openCards[0];
    secondCard = openCards[1];
    if (firstCard.firstElementChild.className === secondCard.firstElementChild.className)
        {
        /*freezeCards();*/
        matchCardStyle();
        console.log("dude, I match!");
        matchCards.push(firstCard, secondCard);
        matchCounter++;
        openCards=[];
            if (matchCounter === matchPairs) {
                console.log("I matched all the cards!");
                endGame();
            }
    }
    else 
    {
        console.log("I don't match"); /*if they don't match, then flip cards back and empty out openCards
        array */
        flipCardsBack();
       
    }
}

function matchCardStyle(){
    firstCard.classList.add('match');
    secondCard.classList.add('match');
}
/*this function flips the cards back - face down with a time delay*/
function flipCardsBack(){
        setTimeout(function() {
            firstCard.classList.remove('open', 'show', 'unclickable');
            secondCard.classList.remove('open', 'show', 'unclickable');
            openCards=[];
            }, 1000);
        }



/*this function freezes cards
function freezeCards(){
    firstCard.classList.add('unclickable');
    secondCard.classList.add('unclickable');
}*/

/*this function flips the cards - face open*/
function flipCard(onClick) {
    onClick.classList.add('open', 'show','unclickable');
}

/*this function starts time and calls the showTime function*/
function initTime(){
    timeStamp = setInterval(function(){
        time++;
        console.log(time);
        showTime();
        }, 1000);
}

/*this function shows time in the HTML (clock and modal)*/
function showTime() {
    const clock = document.querySelector ('.clock');
    console.log(clock);
    clock.innerHTML= " and " + time + " seconds";
    showTimeStat.innerHTML="Time = " + time + " seconds";
    }

/*this function stops the time*/    
function endTime(){
    clearInterval(timeStamp);
}

/*this function increments moves each time it runs*/
function checkMoves(){
    moves++;
    movesNumber.innerHTML = moves;
    showMoveStat.innerHTML = "Moves =" + moves;
}


/*this function shows the stars in the HTML*/
function starBoard () {
    switch(true) {
        case moves <= 20:
        starScore.innerHTML= starSymbol + starSymbol + starSymbol;
        showStarStat.innerHTML="Stars = " + starScore.innerHTML;
        break;

        case (moves > 20  && moves <= 40):
        starScore.innerHTML=starSymbol + starSymbol;
        showStarStat.innerHTML="Stars = " + starScore.innerHTML;
        break;
    
        case (moves > 40):
        starScore.innerHTML=starSymbol;
        showStarStat.innerHTML="Stars = " + starScore.innerHTML;
        break;
    }
}

/*function that ends the game by calling other functions*/
function endGame() {
    endTime();
    showModal();
}

/*this function shows the modal by modifying the style*/
function showModal(){
    document.getElementById("modal").style.display = "block";
}

/*FUNCTIONS THAT RESETS THE GAME*/

/*function that calls other functions to replay the game*/
function replayGame(){
      resetTime();
      resetMoves();
      resetStars();
      deck.innerHTML="";
      resetArrays();
      hideModal();
      shuffleCards();
      createBoard();
}

/*function tha resets the arrays and matchCounter*/
function resetArrays(){
    matchCards=[];
    openCards=[];
    matchCounter = 0;
}

/*function at resets and ends the time*/
function resetTime(){
    endTime();
    time=0;
    clockOff=true;
    showTime();
}

/*function that resets the moves*/
function resetMoves(){
    moves = 0;
    movesNumber.innerHTML = moves;
    showMoveStat.innerHTML = "Moves =" + moves;
}

/*function that resets the stars and styles it*/
function resetStars(){
    stars=0;
    starScore.innerHTML= starSymbol + starSymbol + starSymbol;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}