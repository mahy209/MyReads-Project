import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Lists from './Lists'
import PropTypes from 'prop-types'

export default class SearchForBook extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired
    }

    state = {
        query: '',
        books: [],
    }

    updateQuery = (query) => {
      this.setState(() => ({
          query: query
      }))

      BooksAPI.search(query).then((apiBooks) => {
        apiBooks = apiBooks ? apiBooks : [];

        if(apiBooks.length>0){
          // home books
          this.props.books.map((storedBook) => {

            // books comming from search
            apiBooks.find(apiBook => {
              if(apiBook.title === storedBook.title){
                apiBook.shelf = storedBook.shelf;
              }
              return null;
            })
            return null;

          })
        }


        this.setState({books: apiBooks})
      })        
  }

render(){
    if(this.props.books.length>0 && this.state.query!==''){
        return(
            
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
           
                <input type="text" value={this.state.query} placeholder="Search by title or author" 
                onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                 
                  <Lists books={this.state.books} updateShelfHandler={this.props.updateShelfHandler}/>

              </ol>
              
            </div>
          </div>
            
        )}
        else {return( <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
       
            <input type="text" value={this.state.query} placeholder="Search by title or author" 
            onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
             Sorry! no results are found yet!
              
          </ol>
          
        </div>
      </div>)}
    }
}