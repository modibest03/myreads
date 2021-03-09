import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as booksApi from "./apis";
import Books from "./Books";

const Home = () => {
  const [curiousRead, setCuriosRead] = useState([]);
  const [reading, setReading] = useState([]);
  const [read, setRead] = useState([]);

  useEffect(() => {
    booksApi.getBooks(setReading, setRead, setCuriosRead);
  }, [setReading, setRead, setCuriosRead]);

  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {reading.map((book) => (
                  <Books key={book.id} book={book} />
                ))}
              </ol>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {curiousRead.map((book) => (
                    <Books key={book.id} book={book} />
                  ))}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map((book) => (
                    <Books key={book.id} book={book} />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
