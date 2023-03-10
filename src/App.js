import React, {useEffect, useLayoutEffect, useState} from 'react';
import './App.scss';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

let quoteDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState('if one room is 20TRY then whole flat would be 75TRY.');
  const [author, setAuthor] = useState('Yılmaz');
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34');

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteDB)
  }, [quoteDB])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length*Math.random());
    setRandomNumber(randomInteger);
    setQuote(quotesArray[randomNumber].quote);
    setAuthor(quotesArray[randomNumber].author);
    setAccentColor(COLORS_ARRAY[randomNumber]);
  }

  const changeQuoteAndAuthor = () => {
    setQuote('secondState');
    setAuthor('Efe Yakup')
  }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor, color: accentColor}}>
        <div id='quote-box'>
          <p id='text'>
            {quote}
          </p>
          <p id='author'>
            - {author}
          </p>
          <div className='buttons'>
            <a id='tweet-quote' href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} - ${author}`)} target='_blank'>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <button id='new-quote' onClick={getRandomQuote}>
              Gimme Random Quote
            </button> 
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
