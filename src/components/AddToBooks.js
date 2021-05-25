import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const AddToBooks = (props) => {
    const { currentBooks } = props
    return (
        <div className='open-search'>
            <Link to={{
                pathname: '/search',
                state: {
                    MainPageBooks: currentBooks
                }
            }} />
        </div>
    )
}

AddToBooks.PropTypes = {
    currentBooks: PropTypes.array.isRequired
}
export default AddToBooks