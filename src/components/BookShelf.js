import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import ShelfSection from './ShelfSection'
import AddToBooks from './AddToBooks'

class BookShelf extends Component {
    state = {
        books: []
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            })
        })
    }

    onChngSh = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then((result) => {
            console.log('Update has Been Made!', result)
            book.shelf = newShelf
            var changedList = this.state.books.filter((resultBook) => resultBook.id !== book.id)
            changedList.push(book)
            // Set the new state with Updated Books array
            this.setState({ books: changedList })
        })
    }

    render() {
        const Sections = [
            { type: 'currentlyReading', title: 'Currently Reading' },
            { type: 'wantToRead', title: 'Want to Read' },
            { type: 'read', title: 'Read' }
        ]
        return (
            <div>
                <div className='list-books-content'>
                    {this.state.books.length > 0 &&
                        <div>
                            {Sections.map((Section, index) => {
                                const SectionBooks = this.state.books.filter((book) =>
                                    book.shelf === Section.type
                                )
                                return (
                                    <div className="bookshelf" key={index}>
                                        <h2 className="bookshelf-title">{Section.title}</h2>
                                        <ShelfSection
                                            key={index}
                                            books={SectionBooks}
                                            SectionsList={Sections}
                                            onChngSh={this.onChngSh}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                <AddToBooks
                    currentBooks={this.state.books}
                />
            </div>
        )
    }
}
export default BookShelf