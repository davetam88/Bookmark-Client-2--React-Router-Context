import React from 'react';
import Rating from '../Rating/Rating';
import config from '../config';
import BookmarksContext from '../BookmarksContext';
import './BookmarkItem.css';

function deleteBookmarkRequest(bookmarkId, callback) {
  console.log('in deleteBookmarkRequest'); // dbg..

  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    }
  })
    .then(res => {
      console.log('res :>> ', res); // dbg..
      if (!res.ok)
      {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      let tempx = res.json;
      console.log('res.json is tempx :>> ', tempx); // dbg..
      return res.json()
      // url: "http://localhost:8000/api/bookmarks/82"
    })
    .then(data => {
      console.log('bookmarkId :>> ', bookmarkId); // dbg..
      console.log('delete bm request data :>> ', data); // dbg..
      console.log('before callback'); // dbg..
      //      callback(bookmarkId)
    })
    .catch(error => {
      console.error(error)
    })
}


export default function BookmarkItem(props) {
  console.log(`in bmkitem props :>> `, props); // dbg..
  return (
    <BookmarksContext.Consumer>
      {(context) => (
        <li className='BookmarkItem'>
          <div className='BookmarkItem__row'>
            {/* book title and rating */}
            <h3 className='BookmarkItem__title'>
              <a
                href={props.url}
                target='_blank'
                rel='noopener noreferrer'>
                {props.title}
              </a>
            </h3>
            <Rating value={props.rating} />
          </div>
          <p className='BookmarkItem__description'>
            {props.description}
          </p>
          <div className='BookmarkItem__buttons'>
            <button
              className='BookmarkItem__description'
              // onClick={() => props.onClickDelete(props.id)}
              onClick={() => {
                deleteBookmarkRequest(
                  props.id,
                  context.deleteBookmark,
                )
              }}
            >
              Delete
        </button>
          </div>
        </li>
      )}
    </BookmarksContext.Consumer>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => { },
}
