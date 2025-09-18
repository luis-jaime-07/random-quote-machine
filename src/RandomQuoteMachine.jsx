import React, { useEffect, useState, useRef } from "react";

export default function RandomQuoteMachine() {
  const [quote, setQuote] = useState("Loading quote...");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const mounted = useRef(false);

  const fallbackQuotes = [
    { content: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { content: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
    { content: "So many books, so little time.", author: "Frank Zappa" },
    { content: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" }
  ];

  async function fetchRandomQuote() {
    setLoading(true);
    try {
      const res = await fetch("https://api.quotable.io/random");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setQuote(data.content);
      setAuthor(data.author || "Unknown");
    } catch (e) {
      const q = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(q.content);
      setAuthor(q.author);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    fetchRandomQuote();
  }, []);

  const tweetHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" — ${author}`)}`;

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg,#f6f9ff,#e8f0ff)" }}>
      <div id="quote-box" style={{ width: "100%", maxWidth: "700px", background: "#fff", borderRadius: "12px", padding: "28px", boxShadow: "0 8px 24px rgba(20,30,60,0.08)", fontFamily: "Arial, sans-serif" }}>
        <div id="text" style={{ fontSize: "1.6rem", marginBottom: "18px" }}>
          {loading ? "Fetching a fresh quote..." : `"${quote}"`}
        </div>
        <div id="author" style={{ textAlign: "right", marginBottom: "18px", fontSize: "1rem", color: "#555" }}>
          — {author}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <a
            id="tweet-quote"
            href={tweetHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1d9bf0", border: "1px solid #1d9bf0", padding: "8px 12px", borderRadius: "8px", textDecoration: "none" }}
          >
            Tweet
          </a>
          <button
            id="new-quote"
            onClick={fetchRandomQuote}
            style={{ background: "#2563eb", color: "white", border: "none", padding: "10px 14px", borderRadius: "8px", cursor: "pointer" }}
          >
            {loading ? "Loading..." : "New Quote"}
          </button>
        </div>
      </div>
    </div>
  );
}
