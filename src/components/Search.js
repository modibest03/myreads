import React, { useEffect, useState } from "react";
import * as booksApi from "./apis";
import { Link } from "react-router-dom";
import Books from "./Books";
import Error from "./Error";

const Search = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState([]);
  const [error, setError] = useState("");
  const [match, setMatch] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    if (query.length > 0) {
      booksApi.getSearch(query, setError, setSearch);
      booksApi.getBooksMatch(setMatch);
      return function cleanup() {
        abortController.abort();
      };
    } else {
      setResult([]);
      setError("");
    }
  }, [query]);

  useEffect(() => {
    const handleBookShelf = (searchBooks) => {
      return searchBooks.map((searchBook) => ({
        ...searchBook,
        shelf: match.find((b) => b.id === searchBook.id),
      }));
    };
    if (search.length > 0 && match.length > 0) {
      const matchBooks = handleBookShelf(search);
      setResult(matchBooks);
    }
  }, [match, search]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query.trim()}
            name="query"
            onChange={handleChange}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {search && result.map((book) => <Books key={book.id} book={book} />)}
        </ol>
        {error && <Error>{error}</Error>}
      </div>
    </div>
  );
};

export default Search;
