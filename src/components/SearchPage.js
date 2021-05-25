import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends Component {

    state = {
        books: [],
        searchRes: [],
        isErr: false
    }

    componentDidMount() {
        this.setState({
            books: this.props.location.state.MainPageBooks
        })
    }

    onSearch = (event) => {
        const searchQueue = event.target.value
        if (searchQueue) {
            BooksAPI.search(searchQueue).then((resultBooks) => {
                if (!resultBooks || resultBooks.hasOwnProperty('error')) {
                    this.setState({ searchRes: [], isErr: true })
                } else {
                    this.setState({ searchRes: resultBooks, isErr: false })
                    this.syncBoShelf()
                }
            })
        } else {
            this.setState({ searchRes: [] })
        }
    }

    syncBoShelf = () => {
        const books = this.state.books
        const searchRes = this.state.searchRes
        if (searchRes.length > 0) {
            books.forEach((book) => {
                searchRes.forEach((searchResBook) => {
                    if (book.id === searchResBook.id) {
                        searchResBook.shelf = book.shelf
                    }
                })
            })
        }
        this.setState({ searchRes: searchRes })
    }

    onChngSh = (book, shelf) => {
        BooksAPI.update(book, shelf).then((result) => {
            book.shelf = shelf
            var changedList = this.state.books.filter((resultBook) => resultBook.id !== book.id)
            changedList.push(book)
            this.setState({ books: changedList })
        })

    }

    render() {
        const searchRes = this.state.searchRes
        const isErr = this.state.isErr
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            onChange={this.onSearch}
                            placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    {searchRes.length > 0 && (
                        <div>
                            <div>
                                <h3>Search Returned {searchRes.length} books</h3>
                            </div>
                            <ol className="books-grid">
                                {searchRes.map((book) => (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        onChngSh={this.onChngSh}
                                    />
                                ))}
                            </ol>
                        </div>
                    )}
                    {isErr && (
                        <div>
                            <h3>Search returned no books. Please try again !</h3>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default SearchPage