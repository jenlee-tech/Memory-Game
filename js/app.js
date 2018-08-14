/*
 * Create a list that holds all of your cards
 * Grab all the cards
 */
const allCards = document.querySelectorAll('.card')

/*an array that was created for matched cards*/
var matchCards = [];

/*testing the new git configurations*/


/*an array that was created for open cards*/
var openCards = []; 

/*this takes all the cards and prvents them from showing*/
/*function closeCards(){*/
/*for (let singleCard of allCards) {*/
/*    singleCard.classList.remove('open');*/
/*    }*/
/*}*/


/*the list allCards, runs through a loop, on click, card opens and shows (via toggling method)*/
/*for (let singleCard of allCards) {
    singleCard.addEventListener('click', () => {
        singleCard.classList.add('show');
        singleCard.classList.add('open');
        
    })
}*/



    allCards.addEventListener("click", function()
    {
        card.classList.add("show", "open")
    });












/*when all the cards are matchCards*/
if (matchCards.length === 16) {
    alert('You matched all the cards!');
}



/*if two cards are open/show, then run match function*/

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
