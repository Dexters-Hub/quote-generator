const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes=[];

// Show showLoading
function showLoading(){
    loader.hidden = false;
    quoteContainer.hidden = true;

}

// Hide showLoading
function removeLoading(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show new Quotes
function newQuote(){
    showLoading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];

    //Check if Author exists or not
    if(!quote.author){
        authorText.textContent ='Unknown'
    }
    else{
    authorText.textContent = quote.author;
}

    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');

    }else{
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoading();
}

//Get Quotes From API


async function getQuotes() {
    showLoading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(err) {
        //Catch Error here
    }
}

//Tweet Quotes
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listener

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuotes();