import React from 'react'
import BookShelf from './BookShelf'

const MainPage = () => {
    return (
        <div className="list-books">
            <div className='list-books-title'>
                <h1>MyReads Project</h1>
            </div>
            <BookShelf />
        </div>
    )
}

export default MainPage