import * as React from 'react'
import cx from 'classnames'

export const FlipBox = ({
  rowIndex,
  colIndex,
  isSelected,
  isBingo,
  onClick
}: {
  rowIndex: number,
  colIndex: number,
  isSelected: boolean
  isBingo: boolean
  onClick: () => void
}) => {
  return (
    <button
      className={cx('flip-box', `p${colIndex}-${rowIndex}`, {
        'selected': isSelected,
        'bingo': isBingo
      })}
      type='button'
      onClick={onClick}
    >
      <div className="flip-box-inner">
        <div className="flip-box-front">
          <div className='flip-box-img' />
        </div>
        <div className="flip-box-back">
          <div className='flip-box-img' />
          <div className='back-overlay' />
          <div className="selected-check"><div></div></div>
        </div>
        <div className="flip-box-win"></div>
      </div>
    </button>
  )
}
