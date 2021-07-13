import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Lists from "./Lists";
import PropTypes from "prop-types";

export default class BooksView extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onclickHandler: PropTypes.func.isRequired
  };
  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <Lists
              books={this.props.books}
              booksToShow={"currentlyReading"}
              updateShelfHandler={this.props.updateShelfHandler}
            />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <Lists
              books={this.props.books}
              booksToShow={"wantToRead"}
              updateShelfHandler={this.props.updateShelfHandler}
            />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <Lists
              books={this.props.books}
              booksToShow={"read"}
              updateShelfHandler={this.props.updateShelfHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}
