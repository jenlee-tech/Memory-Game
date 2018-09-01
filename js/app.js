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

/*
 * Create a list that holds all of your cards
 * Grab all the cards
 */
const allCards = document.querySelectorAll('.card')



/*shuffling the cards
function startGame(){*/
let newDeck = shuffle(symbols);

/*location.reload();
  }*/


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

/*
const restart = document.querySelector('.restart');
restart.addEventListener('click', startGame);
*/


deck.addEventListener('click', event => {
    const onClick = event.target;
    if (onClick.classList.contains('card')) {
      flipCard(onClick);
      openCardGroup(onClick);
        if (openCards.length === 2) {
            console.log("I have two cards")
            checkMatch();
            checkMoves();
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
        setTimeout(flipCardBack, 2000);
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



function shuffleDeck() {
    const mixedCards = document.querySelectorAll('.deck li');
    console.log(mixedCards);
    shuffle(mixedCards)

}

/*this function increments moves each time it runs*/
let moves = 0;
function checkMoves(){
moves++;
const movesNumber = document.querySelector('.moves');
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
    alert('You matched all the cards!');
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
