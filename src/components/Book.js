import React from 'react'
import PropTypes from 'prop-types'
import noCover from '../icons/No_Image_Cover.png'

const Book = (props) => {
    const { book, onChngSh } = props
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : noCover})`
                        }}
                    >
                    </div>
                    <div className="book-shelf-changer">
                        <select
                            onChange={(event) => onChngSh(book, event.target.value)}
                            value={book.shelf ? book.shelf : 'none'}>
                            <option value="moveTo" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title ? book.title : null}</div>
                {
                    book.authors &&
                    book.authors.map((author, index) => (
                        <div className="book-authors" key={index}>{author}</div>
                    ))}
            </div>
        </li>
    )
}

Book.PropTypes = {
    book: PropTypes.object.isRequired,
    onChngSh: PropTypes.func.isRequired
}

export default Book