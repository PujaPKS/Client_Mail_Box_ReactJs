import React, { useState } from 'react'
import './HomePage.css'
import ComposeMail from '../mail/ComposeMail';

const HomePage = () => {

  const [composeMail, setIsComposeVisible] = useState(false);

  const handleComposeMail = () => {
    setIsComposeVisible(true); // shows compose mail when clicked
  }

  const handleCancelCompose = () => {
    setIsComposeVisible(false); // hides compose mail when clicked
  }

  return (
    <div>
        {/* <h2 className='home-header'>Welcome to your mail box</h2> */}
        <div className='home-container'>
          <div className='home-left'>
            <div className='home-left-top'>
              <button className='home-left-top-button' onClick={handleComposeMail}>Compose</button>
            </div>
          </div>
          <div className='home-right'>
            <div className='home-right-top'>
              {/* ✅ Conditionally render ComposeMail */}
              {composeMail && (
                <ComposeMail onCancel={handleCancelCompose}/>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}

export default HomePage;