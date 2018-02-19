import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import RenderBooks from './components/RenderBooks'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <RenderBooks/>
        )}/>
        <Route path="/search" render={()=>(
          <SearchBooks/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
