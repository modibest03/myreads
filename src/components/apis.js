import axios from "axios";

export const getBooksMatch = async (setMatch) => {
  try {
    const res = await axios({
      method: "get",
      url: "https://reactnd-books-api.udacity.com/books",
      headers: {
        Authorization: "sharif",
      },
    });
    let datas = res.data.books;
    setMatch(datas);
  } catch (error) {
    console.log(error);
  }
};

export const getBooks = async (
  setResults,
  setReading,
  setRead,
  setCuriosRead
) => {
  const abortController = new AbortController();
  let readings = [];
  let reads = [];
  let curiousReads = [];
  try {
    const res = await axios({
      method: "get",
      url: "https://reactnd-books-api.udacity.com/books",
      headers: {
        Authorization: "sharif",
      },
    });
    let datas = res.data.books;
    setResults(datas);
    datas.forEach((element) => {
      if (element.shelf === "currentlyReading") {
        readings.push(element);
      }

      if (element.shelf === "wantToRead") {
        curiousReads.push(element);
      }

      if (element.shelf === "read") {
        reads.push(element);
      }
    });
    setReading(readings);
    setRead(reads);
    setCuriosRead(curiousReads);
    return function cleanup() {
      abortController.abort();
    };
  } catch (error) {
    console.log(error);
  }
};

export const getBook = async (bookId, setBookId) => {
  const abortController = new AbortController();
  try {
    const res = await axios({
      method: "get",
      url: `https://reactnd-books-api.udacity.com/books/${bookId}`,
      headers: {
        Authorization: "sharif",
      },
    });
    let datas = await res.data.book.id;
    setBookId(datas);
    return function cleanup() {
      abortController.abort();
    };
  } catch (e) {
    console.log(e);
  }
};

export const getSearch = async (query, setError, setSearch) => {
  try {
    const res = await axios({
      method: "post",
      url: "https://reactnd-books-api.udacity.com/search/",
      headers: {
        Authorization: "sharif",
      },
      data: { query },
    });
    const data = await res.data.books;
    if (data.error) {
      setError(data.error);
      setSearch([]);
    } else {
      setSearch(data);
    }
  } catch (error) {
    console.log(error);
  }
};
