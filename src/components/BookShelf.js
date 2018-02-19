import React, {Component} from 'react';
import '../App.css'
import PropTypes from 'prop-types';
import Book from './Book'

class BookShelf extends Component{
  static propTypes = {
    list: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
  }
  render(){
    const list=this.props.list
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {list.map((book) => (
              <li key={book.id} >
                <Book book={book} handler={this.props.handler}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
