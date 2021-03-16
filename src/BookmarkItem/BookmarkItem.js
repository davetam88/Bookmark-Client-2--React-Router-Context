import React from 'react';
import Rating from '../Rating/Rating';
import config from '../config';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import BookmarksContext from '../BookmarksContext';
import './BookmarkItem.css';


function deleteBookmarkRequest(bookmarkId, callback) {

  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    }
  })
    .then(res => {
      if (!res.ok)
      {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      let tempx = res.json;
      callback(bookmarkId)
    })
    .catch(error => {
      console.error(error)
    })
}


export default function BookmarkItem(props) {
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

            <button>
              <Link to={`/edit/${props.id}`}>
                Update
            </Link>
            </button>


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
        </li >
      )
      }
    </BookmarksContext.Consumer >
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => { },
}
