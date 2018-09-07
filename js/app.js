/*referencing the deck class*/
let deck = document.querySelector('.deck');

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

let clockOff = true;
let time = 0;
/*
let endTime = new Date().getTime();
*/
let timeStamp;
/*
 * Create a list that holds all of your cards
 * Grab all the cards
 */
const allCards = document.querySelectorAll('.card')



/*shuffling the cards*/
let newDeck = shuffle(symbols);

/*restarting the game*/
function startGame(){
document.location.reload()
/*let startTime = new Date().getTime();*/
  }


/*creating the board*/
newDeck.forEach(function(element) {
    let card = document.createElement("li");
    card.classList.add('card');
    let iclass='<i class =' + '"' + element + '"'+ '></i>';
    card.innerHTML=iclass;
    console.log(element);
    console.log(card);
    deck.appendChild(card);
    });




/*an array that was created for matched cards*/
var matchCards = [];

/*an array that was created for open cards*/
let openCards = []; 

let firstCard;
let secondCard;



/*the list allCards, runs through a loop, on click, card opens and shows (via toggling method)
for (let singleCard of allCards) {
    singleCard.addEventListener('click', () => {
        singleCard.classList.toggle('show');
        singleCard.classList.toggle('open');
    });
}
*/


const reload = document.querySelector('.restart');
reload.addEventListener('click', startGame);

var startTime = new Date().getTime();

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
};

/*this freeze cards*/
function freezeCards(){
firstCard.classList.add('unclickable');
secondCard.classList.add('unclickable');
};

/*this function flips the cards*/
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


let starSymbol = '<li><i class="fa fa-star"></i></li>';
let starScore = document.querySelector('.stars');
starScore.innerHTML


function starBoard () {
switch(true) {
    case moves <= 10:
    starScore.innerHTML= starSymbol + starSymbol + starSymbol;
    
    break;

    case (moves > 10  && moves < 30):
    starScore.innerHTML=starSymbol + starSymbol;
   
    break;

    case (moves > 30 && moves < 40):
    starScore.innerHTML=starSymbol;
    break;

    
}}



function shuffleDeck() {
    const mixedCards = document.querySelectorAll('.deck li');
    console.log(mixedCards);
    shuffle(mixedCards)

}

/*this function increments moves each time it runs*/

let moves = 0;
const movesNumber = document.querySelector('.moves');
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

/*when all the cards are matchCards*/
if (matchCards.length === 16) {
    endTime();
    alert('You matched all the cards!');

    
}


/*more info for modal
let timer = endTime - startTime;
*/

/*shows time in HTML*/
function showTime() {
const clock = document.querySelector ('.clock');
console.log(clock);
clock.innerHTML= " and " + time + " seconds";
}

const modal = document.getElementById('modal');
function showModal(){
    modal.style.display = 'block';
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
