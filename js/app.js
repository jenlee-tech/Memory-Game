/*variables related to the cards and deck*/
let deck = document.querySelector('.deck');
const allCards = document.querySelectorAll('.card')
let newDeck;

let symbols = ["fa fa-diamond",
"fa fa-paper-plane-o",
"fa fa-anchor", 
"fa fa-bolt",
"fa fa-cube",
"fa fa-anchor",
"fa fa-leaf",
"fa fa-bicycle",
"fa fa-diamond",
"fa fa-bomb",
"fa fa-leaf",
"fa fa-bomb",
"fa fa-bolt",
"fa fa-bicycle",
"fa fa-paper-plane-o",
"fa fa-cube"];

/*an array that was created for (clicked open) open cards and its associated variables*/
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

/*Calling the shuffle cards and creating the board*/
shuffleCards();
createBoard();

/*function that shuffles the cards*/
function shuffleCards(){
newDeck = shuffle(symbols);
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


/*steps that occur when a card is click*/
deck.addEventListener('click', event => {
    const onClick = event.target;
    if (onClick.classList.contains('card')) {
        if (clockOff) {
            initTime();
            clockOff=false;
        }
      flipCard(onClick);
      openCardGroup(onClick);
        if (openCards.length === 2) {
            console.log("I have two cards")
            checkMatch();
            checkMoves();
            starBoard();
        }
    }
});

/*event listeners for restart feature on the board*/
const reload = document.querySelector('.restart');
reload.addEventListener('click', replayGame);



/*this function pushes the open card into an array*/
function openCardGroup(onClick) {
    openCards.push(onClick);
    console.log(openCards);
}

/*if two cards are open/show, then test to see if they match*, if they match freeze cards and then 
push them in matchCards array*/
function checkMatch () {
    firstCard = openCards[0];
    secondCard = openCards[1];
    if (firstCard.firstElementChild.className === secondCard.firstElementChild.className)
            {
            freezeCards();
            console.log("dude, I match!");
            matchCards.push(firstCard, secondCard);
            openCards=[];
            matchCounter++;
            if (matchCounter === matchPairs) {

                console.log("I matched all the cards!");
                endGame();
            }
    }
    else 
    {
        console.log("I don't match"); /*if they don't match, then flip cards back and empty out openCards
        array */
        setTimeout(flipCardBack, 1500);
        openCards=[];
    }
}


/*this function flips the card back - face down*/
function flipCardBack(){
    firstCard.classList.remove('open', 'show');
    secondCard.classList.remove('open', 'show');
}

/*this freeze cards*/
function freezeCards(){
firstCard.classList.add('unclickable');
secondCard.classList.add('unclickable');
}

/*this function flips the cards - face open*/
function flipCard(onClick) {
    onClick.classList.toggle('open');
    onClick.classList.toggle('show');
}

function initTime(){
        timeStamp = setInterval(function(){
        time++;
        console.log(time);
        showTime();
    }, 1000);
}

function endTime(){
    clearInterval(timeStamp);
}






function starBoard () {
switch(true) {
    case moves <= 10:
    starScore.innerHTML= starSymbol + starSymbol + starSymbol;
    
    break;

    case (moves > 10  && moves <= 30):
    starScore.innerHTML=starSymbol + starSymbol;
   
    break;

    case (moves > 30):
    starScore.innerHTML=starSymbol;
    break;

    
}}

function endGame() {
    endTime();
    showModal();
    showModalStats();
}

/*
function shuffleDeck() {
    const mixedCards = document.querySelectorAll('.deck li');
    console.log(mixedCards);
    shuffle(mixedCards)

}
*/




/*this function increments moves each time it runs*/
function checkMoves(){
moves++;
movesNumber.innerHTML = moves;
}



/*this function flips card back
function flipCardBack(firstCard, secondCard) {
    
}
*/






/*push open cards in an array (openCards)*/
function addCards (singleCard) {
    openCards.push(singleCard);
} 


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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





/*shows time in HTML*/
function showTime() {
const clock = document.querySelector ('.clock');
console.log(clock);
clock.innerHTML= " and " + time + " seconds";
}

function showModal(){
    document.getElementById("modal").style.display = "block";
    
}

/*places the stats on the modal*/
function showModalStats(){
const showTimeStat = document.querySelector('.modal_time');
const showStarStat = document.querySelector('.modal_stars');
const showMoveStat = document.querySelector('.modal_moves');

showTimeStat.innerHTML="Time = " + time + " seconds";
showStarStat.innerHTML="Stars = " + starScore.innerHTML;
showMoveStat.innerHTML="Moves = " + moves;
}

/*event listener for cancel button and exit feature*/
const modalCancelBtn = document.querySelector('.modal_cancel');
modalCancelBtn.addEventListener('click', hideModal);

const modalExitBtn = document.querySelector('.closeBtn');
modalExitBtn.addEventListener('click', hideModal);

function hideModal(){
    document.getElementById("modal").style.display = "none";
}


const modalReplayBtn = document.querySelector('.modal_replay');
modalReplayBtn.addEventListener('click', replayGame);



/*functions that resets the game*/

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

function resetArrays(){
matchCards=[];
openCards=[];
matchCounter = 0;
}


function resetTime(){
    endTime();
    time=0;
    clockOff=true;
    showTime();
}

function resetMoves(){
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars(){
    stars=0;
    starScore.innerHTML= starSymbol + starSymbol + starSymbol;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
    
}



/* This is Udacity's instructions
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
