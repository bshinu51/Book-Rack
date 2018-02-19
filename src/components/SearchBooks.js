import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

  constructor(props){
    super(props);
    this.state = {
      query : '',
      searchList: [],
      allList: [],
      needsChange: false
    }
  }
  componentDidMount(){
    BooksAPI.getAll().then((book) => {
      this.setState({
        query : '',
        searchList: [],
        allList: book,
        needsChange: false
      })
    })
  }
  componentDidUpdate() {
    if(this.state.needsChange){
      BooksAPI.search(this.state.query).then((book) => {
        var books = [];
        for(let i=0; i<book.length; i++){
          let isAdded = false;
          for(let j=0; j<this.state.allList.length; j++){
            if(this.state.allList[j].id===book[i].id){
              books.push(this.state.allList[j]);
              isAdded = true;
              break;
            }
          }
          if(!isAdded){
            book[i].shelf = "none";
            books.push(book[i]);
          }
        }
        if(Array.isArray(book)){
          console.log(books);
          this.setState({ query: this.state.query, searchList: books ,needsChange:false})
        } else {
          this.setState({ query: this.state.query, searchList: [] ,needsChange:false})
        }
      })
    }
  }
  updateQuery(query){
    this.setState({ query: query, searchList: this.state.searchList, needsChange:true});
  }
  handler(){
    console.log("Future Implementation");
  }
  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text" placeholder="Search by title or author" value={this.state.query}
              onChange={(event)=>this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchList? this.state.searchList.map((book)=>(
              <li key={book.id} >
                <Book book={book} handler={this.handler}/>
              </li>
            )):""}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
