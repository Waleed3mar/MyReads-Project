import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const ShelfSection = (props) => {
    const { SectionIndex, books, onChngSh } = props
    return (
        <div>
            <div className="bookshelf-books" key={SectionIndex}>
                <ol className="books-grid">
                    {books.map((book) => (
                        <Book
                            key={book.id}
                            book={book}
                            onChngSh={onChngSh}
                        />
                    ))}
                </ol>
            </div>
        </div>
    )
}

ShelfSection.PropTypes = {
    SectionIndex: PropTypes.number.isRequired,
    books: PropTypes.array.isRequired,
    onChngSh: PropTypes.func.isRequired
}

export default ShelfSection