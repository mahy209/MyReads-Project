import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchForBook from "./SearchForBook";
import BooksView from "./BooksView";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  };

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  };

  componentDidMount() {
    this.getAllBooks();
  }
  onclickHandler = (Book, BooksView) => {
    if (this.state.books) {
      BooksAPI.update(Book, BooksView).then(() => {
        Book.shelf = BooksView;
        this.setState((state) => ({
          books: state.books.filter((b) => b.id !== Book.id).concat(Book)
        }));
      });
    }
  };

  updateShelfHandler = (e, book) => {
    BooksAPI.update(book, e.target.value).then(() => {
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id).concat(book)
      }));

      this.getAllBooks();
    });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        {console.log(books)}
        <Router>
          <Switch>
            <Route
              exact
              path="/search"
              component={() => (
                <SearchForBook
                  books={books}
                  updateShelfHandler={this.updateShelfHandler}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      <BooksView
                        books={this.state.books}
                        onclickHandler={this.onclickHandler}
                        updateShelfHandler={this.updateShelfHandler}
                      />
                    </div>
                  </div>
                  <div className="open-search">
                    <Link className="open-search" to="/search">
                      Add a book
                    </Link>
                  </div>
                </div>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
