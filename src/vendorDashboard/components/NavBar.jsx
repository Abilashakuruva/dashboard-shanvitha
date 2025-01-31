import React from 'react'

const NavBar = ({showLoginHandler,showRegisterHandler,showLogout,showLogoutHandler}) => {
  const firmName=localStorage.getItem('firmName')
  
  return (
    <div className="navsec">

        <div className="company">
            Vendor Dashboard
        </div>
        <div className="firmname">
          <h4>FirmName: {firmName}</h4>
        </div>

        <div className="userAuth">
          {!showLogout?
          <>
          <span onClick={showLoginHandler}>Login / </span>
            <span onClick={showRegisterHandler}>Register</span>
            </> : <span onClick={showLogoutHandler} className='logout' >Logout</span>

          }
            
        </div>
    </div>
   
  )
}

export default NavBar
