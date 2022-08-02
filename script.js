 const quoteContainer=document.getElementById('quote-container');
 const quoteText=document.getElementById('quote');
 const authorText=document.getElementById('author');
 const twitterBtn=document.getElementById('twitter');
 const newQuoteBtn=document.getElementById('new-quote');
 const loader=document.getElementById('loader');
let apiQuotes=[];

function showLoadingSpinner(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner(){
  if(!loader.hidden){
      loader.hidden = true;
      quoteContainer.hidden = false;
  }
}

function newQuote()
{
   showLoadingSpinner();
    // Pick a random quote from array
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author)
    {
      authorText.textContent='Uknown';
    }else {
      authorText.textContent=quote.author;
    }
    // Check quote length to determine styling 
    if (quote.text.length>120)
    {
      quoteText.classList.add('long-quote');
    }else {
      quoteText.classList.remove('long-quote');
    } 
    //Set quote 
    quoteText.textContent=quote.text;
    //Hide loader
    hideLoadingSpinner();

}
//Get Quotes From API
async function getQuote(){
  const proxyUrl = 'https://blooming-plains-93648.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try{
      
      showLoadingSpinner();
      const response = await fetch(proxyUrl + apiUrl)
      const data = await response.json();
      
      // If Author is blank or null add 'Unknown'
      if( data.quoteAuthor === ''|| !data.quoteAuthor ){
          authorText.innerText = "Unknown";
      } else{
          authorText.innerText = data.quoteAuthor;
      }
      
      // if quote text length is greater, then decrease the font size;
      if( data.quoteText.length > 120 ){
          quoteText.classList.add('long-quote');
      } else{
          quoteText.classList.remove('long-quote');
      }
      quoteText.innerText = data.quoteText;
      hideLoadingSpinner();
      
  } catch(error){

      if(error instanceof SyntaxError){
          console.log(error);
          quoteContainer.innerText = "No Quote fetched...Please refresh the page";
          quoteContainer.style.fontSize = "3rem";
          hideLoadingSpinner();
      }
  }
}
// Tweet quote 
function tweetQuote(){
  const quote = quoteText.innerText;
  const author = authorText.innerText;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, '_blank');
}
// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();
