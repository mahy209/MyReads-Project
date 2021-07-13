import React, { Component } from "react";
//import PropTypes from 'prop-types'
//import * as BooksAPI from './BooksAPI'

export default class Lists extends Component {
  UpdateReaingState(book, BooksView) {
    this.props.onclickHandler(book, BooksView);
  }

  render() {
    const { booksToShow, books } = this.props;
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.length > 0 &&
            books.map((book) => {
              if (!book.shelf) {
                book.shelf = "none";
              }

              if ((booksToShow && book.shelf === booksToShow) || !booksToShow) {
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${
                              book.imageLinks ? book.imageLinks.thumbnail : ""
                            })`
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select
                            value={book.shelf}
                            onChange={(e) =>
                              this.props.updateShelfHandler(e, book)
                            }
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                );
              } else {
                return true;
              }
            })}
        </ol>
      </div>
    );
  }
}
