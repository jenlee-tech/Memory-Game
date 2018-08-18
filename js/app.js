/*
 * Create a list that holds all of your cards
 * Grab all the cards
 */
const allCards = document.querySelectorAll('.card')

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


let deck = document.querySelector('.deck');

deck.addEventListener('click', event => {
    const onClick = event.target;
    if (onClick.classList.contains('card')) {
      flipCard(onClick);
      openCardGroup(onClick);
        if (openCards.length === 2) {
            console.log("I have two cards")
            checkMatch();
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
    
    firstCard.classList.add('unclickable');
    secondCard.classList.add('unclickable');
    console.log("dude, I match!");
    matchCards.push(firstCard, secondCard);
    }
    else 
    {
    console.log("I don't match"); /*if they don't match, then flip cards back and empty out openCards
    array */
    setTimeout(function flipCardBack () 
        {
            firstCard.classList.remove('open', 'show');
            secondCard.classList.remove('open', 'show');
        }
        , 3000);
        openCards=[];
    }
}

/*this function flips the card back - face down*/


/*this function flips the cards*/
function flipCard(onClick) {
    onClick.classList.toggle('open');
    onClick.classList.toggle('show');
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
