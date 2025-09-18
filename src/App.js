import React, { useState } from "react";

const quotes = [
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" }
];

function App() {
  const [quote, setQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  const newQuote = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  return (
    <div id="quote-box" style={{ textAlign: "center", marginTop: "100px" }}>
      <p id="text">"{quote.text}"</p>
      <p id="author">- {quote.author}</p>
      <button id="new-quote" onClick={newQuote}>
        New Quote
      </button>
      <br />
      <a
        id="tweet-quote"
        href={`https://twitter.com/intent/tweet?text="${quote.text}" - ${quote.author}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Tweet Quote
      </a>
    </div>
  );
}

export default App;
