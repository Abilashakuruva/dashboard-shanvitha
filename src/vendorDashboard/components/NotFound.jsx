import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div className="errorsec">
        <Link to='/' style={{fontSize:'1.5rem',color:'darkblue'}}>
        <p>Go Back</p>
        </Link>
        <h1>404</h1>        
        <div>Page Note Found</div>

    </div>
    </>
  )
}

export default NotFound
