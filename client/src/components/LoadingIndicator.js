import React from 'react';

function LoadingIndicator() {
  return (
    <div className='loading-indicator-wrapper'>
      <img className="loading-indicator" alt="now loading..." src="loading.gif" style={{ margin: '1rem' }} /><br />
      <h1>now loading...</h1>
    </div>
  )
  
}

export default LoadingIndicator