import * as React from 'react'

export const LoadingSlide = () => {
  return (
    <div className='grid-container'>
      <div className='loading-game-slide'>
        <div style={{ height: '80px' }}></div>
        <div className='loading-game' />
        <div className='loading-game-card'>
          Loading...
        </div>
      </div>
    </div>
  )
}