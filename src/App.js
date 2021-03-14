import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import './App.css';
import BookmarkList from './BookmarkList/BookmarkList';
import BookmarksContext from './BookmarksContext';
import config from './config';
import Nav from './Nav/Nav';

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
    })

  }

  deleteBookmark = bookmarkId => {
    const newBookmarks = this.state.bookmarks.filter(bm =>
      bm.id !== bookmarkId
    )
    this.setState({
      bookmarks: newBookmarks
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok)
          throw new Error(res.status)
        return res.json()
      })
      // bookmark response from api
      // .then(this.setBookmarks)
      .then(res => {
        this.setBookmarks(res)
      })

      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
    }

    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            {/* for /add-bookmark */}
            <Route
              path='/add-bookmark'
              component={AddBookmark}
            // onClickCancel={() => {/* what here? */ }}
            />

            {/* for / */}
            <Route
              exact
              path='/'
              component={BookmarkList}
            />
          </div>
        </BookmarksContext.Provider>
      </main >
    );
  }
}

export default App;

{/* <BookmarkList bookmarks={[{ a: 2, b: 4 }, { a: 3, b: 4 }]} /> */ }
{/* <Rating value={9} /> */ }
