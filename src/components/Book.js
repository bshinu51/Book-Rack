import React, {Component} from 'react';
import '../App.css'
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';

class Book extends Component{
  static propTypes = {
    book: PropTypes.object.isRequired,
    handler: PropTypes.func.isRequired
  }
  constructor(props){
    super(props);
    this.state = {
      book: props.book,
      shelf: props.book.shelf,
      shouldUpdate : false
    };
  }
  componentDidUpdate(){
    if(this.state.book.shelf!==this.state.shelf){
      BooksAPI.update(this.state.book, this.state.shelf).then((json)=>{
        this.setState((prevState)=>{
          var book = prevState.book;
          book.shelf = this.state.shelf;
          return {book:book, shelf:book.shelf, shouldUpdate:true}
        })
        this.props.handler();
      })
    }
  }
  updateDataBase(optionValue){
    this.setState((prevState)=>{
      if(prevState.shelf!==optionValue){
        return {book:this.state.book, shelf:optionValue, shouldUpdate:true};
      }
    })
  }
  shouldComponentUpdate(nextProps, nextState){
    return nextState.shouldUpdate;
  }
  render(){
    const book = this.state.book;
    const url = book.hasOwnProperty('imageLinks')?book.imageLinks.thumbnail:'https://getuikit.com/v2/docs/images/placeholder_600x400.svg';
    const authors = book.hasOwnProperty('authors')?book.authors:'Ananymous';
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(event)=>{this.updateDataBase(event.target.value)}}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default Book
