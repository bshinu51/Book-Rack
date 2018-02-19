import React, { Component } from 'react';
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class RenderBooks extends Component {
  state = {
    bookList: [],
    needsUpdate: true
  }
  componentDidMount(){
    console.log("Mount");
    if(this.state.needsUpdate){
      BooksAPI.getAll().then((book) => {
        this.setState({bookList:book, needsUpdate:false})
      })
    }
  }
  handler(){
    this.setState({bookList: this.state.bookList,needsUpdate: true});
  }
  render(){
    const bookList = this.state.bookList;
    let currentList = bookList.filter((item)=>item.shelf==="currentlyReading")
    let wantToRead = bookList.filter((item)=>item.shelf==="wantToRead")
    let read = bookList.filter((item)=>item.shelf==="read")

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf list={currentList} title={'Currently Reading'} handler={this.handler.bind(this)}/>
            <BookShelf list={wantToRead} title={'Want to Read'} handler={this.handler.bind(this)}/>
            <BookShelf list={read} title={'Read'} handler={this.handler.bind(this)}/>
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default RenderBooks;
