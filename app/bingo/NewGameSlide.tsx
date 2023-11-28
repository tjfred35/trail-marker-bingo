import * as React from 'react'
import cx from 'classnames'
import type { ModalProps } from '~/Modal';
import { Modal } from '~/Modal'
import type { Card } from '~/cards/Card'
import type { GameId } from './types'
import { TextInput } from '~/TextInput'

export const NewGameSlide = ({ games, cards, onNewGame, onHowToPlay }: {
  games: GameId[],
  cards: Record<string, Card>
  onNewGame: (card: Card, name?: string) => void
  onHowToPlay: () => void
}) => {

  const [isOpen, setOpen] = React.useState(false)

  return (
    <div className='new-game-slide'>
      <div style={{ height: '80px' }}></div>
      <div className='new-game' />
      <div className='new-game-card'>
        <button
          className='button'
          onClick={() => {
            setOpen(true)
          }}
        >
          Add bingo card
        </button>
        <button
          className='button secondary'
          onClick={onHowToPlay}
        >
          How to play
        </button>
        <a
          className='button secondary'
          href='https://www.carlislema.gov/562/Trail-Maps'
          target='_blank'
          rel="noreferrer"
        >
          Trail  maps
        </a>
      </div>
      {isOpen && (
        <NewGameModal
          cards={cards}
          onRequestClose={() => setOpen(false)}
          onNewGame={
            (card: Card, name?: string) => {
              setOpen(false)
              onNewGame(card, name)
            }
          }
        />
      )}
    </div>
  )
}


const NewGameModal = ({ cards, onNewGame, ...props }:
  Omit<ModalProps, 'children'> & {
    cards: Record<string, Card>
    onNewGame: (card: Card, name?: string) => void
  }) => {
  const [cardId, setCardId] = React.useState<string>()
  const [showValidationErrors, setShowValidationErrors] = React.useState(false)
  const [name, setName] = React.useState<string>()

  return (
    <Modal {...props}>
      <div style={{
        maxWidth: '420px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h1>Pick a trail set</h1>
        <div className='card-selector-group'>
          {Object.values(cards).map((card) => {
            return <button
              key={card.id}
              className={cx('card-selector', {
                'selected': card.id === cardId
              })}
              onClick={() => {
                setCardId(card.id)
              }}
            >
              {card.lands.join(', ')}
            </button>
          })}
        </div>
        {showValidationErrors && !cardId && (
          <div className='error-text'>Please select a trail set</div>
        )}

        <div style={{ marginTop: '16px' }}>
          <TextInput
            label='Add a hiker name'
            optional
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <button
          style={{ marginTop: '16px' }}
          className='button'
          onClick={() => {
            if (cardId) {
              onNewGame(cards[cardId], name)
            } else {
              setShowValidationErrors(true)
            }
          }}
        >
          Add bingo card
        </button>
      </div>
    </Modal>
  )
}