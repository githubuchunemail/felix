import React, { useContext, useEffect, useRef, useState } from "react";
import "./Home.scss";
import Header from "../../Components/Header/Header";
import Books from "../../Components/Books/Books";
import Modal from "antd/es/modal/Modal";
import { Button, Input, Select, Spin, message } from "antd";
import { LinkOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import CryptoJS from "crypto-js";
import { AuthContext } from "../../Context/AuthContext";

const { Option } = Select;

const Home = () => {
  const bookISBNRef = useRef(null);
  const { token } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const userKey = token.key;
  const userSecret = token.secret;

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (currentBook) {
      setStatus(currentBook.book.status);
    }
  }, [currentBook]);

  const fetchBooks = async () => {
    setLoading(true);
    const method = "GET";
    const url = "/books";
    const signString = `${method}${url}${userSecret}`;
    const sign = CryptoJS.MD5(signString).toString();

    try {
      const res = await axios.get("https://no23.lavina.tech/books", {
        headers: {
          Key: userKey,
          Sign: sign,
        },
      });
      setBooks(res.data.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
    setCurrentBook(null);
  };

  const handleAddBook = async () => {
    const isbn = bookISBNRef.current.input.value;

    if (!isbn) {
      message.error("ISBN is required");
      return;
    }

    setIsModalOpen(false);

    const method = "POST";
    const url = "/books";
    const body = { isbn };
    const bodyString = JSON.stringify(body);
    const signString = `${method}${url}${bodyString}${userSecret}`;
    const sign = CryptoJS.MD5(signString).toString();

    try {
      await axios.post(process.env.REACT_APP_URL + "/books", body, {
        headers: {
          "Content-Type": "application/json",
          Key: userKey,
          Sign: sign,
        },
      });
      fetchBooks();
      message.success("Book added successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to add book");
    }
  };

  const handleDelete = async (bookId) => {
    const method = "DELETE";
    const url = `/books/${bookId}`;
    const signString = `${method}${url}${userSecret}`;
    const sign = CryptoJS.MD5(signString).toString();

    try {
      await axios.delete(process.env.REACT_APP_URL + `${url}`, {
        headers: {
          Key: userKey,
          Sign: sign,
        },
      });
      fetchBooks();
      message.success("Book deleted successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to delete book");
    }
  };

  const handleUpdate = async () => {
    if (!currentBook) return;

    const { id } = currentBook.book;
    const method = "PATCH";
    const url = `/books/${id}`;
    const body = { status: +status };
    const bodyString = JSON.stringify(body);
    const signString = `${method}${url}${bodyString}${userSecret}`;
    const sign = CryptoJS.MD5(signString).toString();

    try {
      const response = await axios.patch(
        process.env.REACT_APP_URL + `${url}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Key: userKey,
            Sign: sign,
          },
        }
      );

      const updatedBook = response.data.data;

      const updatedBooks = books.map((book) =>
        book.book.id === updatedBook.book.id
          ? { ...book, book: updatedBook.book }
          : book
      );
      setBooks(updatedBooks);
      setIsEditMode(false);
      setCurrentBook(null);
      setIsModalOpen(false);
      fetchBooks();
      message.success("Book updated successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to update book");
    }
  };

  const handleSubmit = () => {
    if (isEditMode) {
      handleUpdate();
    } else {
      handleAddBook();
    }
  };

  const handleStatusChange = (value) => {
    setStatus(value);

    if (currentBook) {
      const updatedBooks = books.map((book) =>
        book.book.id === currentBook.book.id
          ? { ...book, book: { ...book.book, status: value } }
          : book
      );
      setBooks(updatedBooks);
    }
  };
  const bookReaderStatus = [
    {
      id: 0,
      text: "New",
      color: "red",
    },
    { id: 1, text: "Reading", color: "yellow" },
    { id: 2, text: "Finished", color: "green" },
  ];

  return (
    <div className="home">
      <Header users={books} setUsers={setBooks} />

      <div className="books__top">
        <div className="item">
          <h2>
            You’ve got <span>{books?.length} books</span>
          </h2>
          <p>Your books today</p>
        </div>
        <Button type="primary" onClick={showModal}>
          <PlusOutlined />
          Add book
        </Button>
      </div>
      <div className="books__wrapper">
        {loading ? (
          <Spin size="large" />
        ) : (
          books?.map((book) => (
            <Books
              key={book.book?.id}
              title={book.book?.title || "Unknown Title"}
              cover={book.book?.cover || "http://url.to.book.cover"}
              pages={book.book?.pages || "Unknown Pages"}
              publish={book.book?.published || "Unknown Publish Date"}
              isbn={book.book?.isbn}
              author={book.book?.author || "Unknown Author"}
              onDelete={() => handleDelete(book.book.id)}
              onEdit={() => {
                setCurrentBook(book);
                setIsEditMode(true);
                setIsModalOpen(true);
              }}
              buttonType={
                <Button
                  type="primary"
                  style={{
                    backgroundColor: bookReaderStatus.find(
                      (i) => i.id === book.status
                    ).color,
                  }}
                >
                  {bookReaderStatus.find((i) => i.id === book.status).text}
                </Button>
              }
            />
          ))
        )}
      </div>

      <Modal
        title={isEditMode ? "Edit Book" : "Create a book"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setCurrentBook(null);
          setStatus(null);
        }}
        okText="Submit"
        cancelText="Cancel"
      >
        {isEditMode ? (
          <Select
            placeholder="Select status"
            value={status}
            onChange={handleStatusChange}
            style={{ width: "100%" }}
          >
            <Option value="0">New</Option>
            <Option value="1">Reading</Option>
            <Option value="2">Finished</Option>
          </Select>
        ) : (
          <>
            <label htmlFor="ISBN">ISBN</label>
            <Input
              size="large"
              ref={bookISBNRef}
              placeholder="Enter ISBN"
              prefix={<LinkOutlined />}
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default Home;
