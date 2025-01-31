import React from 'react'

const Welcome = () => {
  const firmName=localStorage.getItem("firmName")

  return (
    <div className='welcomeSec'>
      <h2>Welcome {firmName}</h2>
      <div className="landingimg">
        <img src="/assets/chef.jpg" alt='welcome'/>
      </div>
    </div>
  )
}

export default Welcome
