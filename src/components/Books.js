import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as booksApi from "./apis";
import axios from "axios";

const Books = ({ book }) => {
  let history = useHistory();
  const location = useLocation();
  const [options, setOptions] = useState([
    { value: "currentlyReading", label: "currently Reading" },
    { value: "wantToRead", label: "Want to Read" },
    { value: "read", label: "Read" },
    { value: "none", label: "None" },
  ]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [bookId, setBookId] = useState(null);

  const handleChange = async (e) => {
    setSelectedValue(e.target.value);
    booksApi.getBook(book.id, setBookId);
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (selectedValue && bookId) {
      const handleCategory = async (pdfBook, shelf) => {
        try {
          const res = await axios({
            method: "put",
            url: `https://reactnd-books-api.udacity.com/books/${pdfBook}`,
            headers: {
              Authorization: "sharif",
            },
            data: { pdfBook, shelf },
          });
          let datas = await res.data;
          setSelectedValue(pdfBook.id);
          if (location.pathname === "/search") {
            history.push("/");
          } else {
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
      };
      handleCategory(bookId, selectedValue);
      return function cleanup() {
        abortController.abort();
      };
    }
  }, [selectedValue, bookId, history, location]);

  useEffect(() => {
    if (location.pathname === "/") {
      if (book.shelf) {
        setSelectedValue(book.shelf);
      } else {
        setSelectedValue("");
      }
    }

    if (location.pathname === "/search") {
      if (book.shelf) {
        setSelectedValue(book.shelf.shelf);
      } else {
        setSelectedValue("none");
      }
    }
  }, [book.shelf, location]);

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks
                  ? book.imageLinks.thumbnail
                  : "https://edit.org/images/cat/book-covers-big-2019101610.jpg"
              })`,
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={handleChange}>
              <option value="move" disabled>
                Move to...
              </option>
              {options.map((option) => {
                return selectedValue === option.value ? (
                  <option value={option.value} key={option.value} selected>
                    {option.label}
                  </option>
                ) : (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors || ""}</div>
      </div>
    </li>
  );
};

export default Books;
