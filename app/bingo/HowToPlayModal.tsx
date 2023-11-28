import * as React from 'react'
import type { ModalProps } from '~/Modal';
import { Modal } from '~/Modal'

export const HowToPlayModal = (props: Omit<ModalProps, 'children'>) => {
  return (
    <Modal
      onRequestClose={props.onRequestClose}
    >
      <h1>How to play</h1>
      <p>
        To start, click the "Add bingo card" button.
      </p>
      <p>
        Each bingo card contains the artwork that is posted
        on trail intersection markers for 2 or 3 areas in Carlisle, MA.
      </p>
      <p>
        You'll need to walk at least 2 of the areas listed on the
        top of the bingo card.
      </p>
      <p>
        As you pass the artful trail intersection markers,
        check them off on your bingo card.
      </p>
      <p>
        You win when you get 5 in a row: across, down, or diagonal.
      </p>
      <p>
        You can add as many bingo cards as you want. For example, if
        multiple players are sharing one phone, you could add one bingo
        card for each player.
      </p>
      <p>
        Swipe left and right or use the pagination controls below the cards
        to navigate between cards.
      </p>
      <p>
        The trail markers feature nature-themed artwork created by students in the Carlisle Public School's Middle School Art Club under the direction of teacher Rachel Levy.
      </p>
      {/* <div style={{
        marginTop: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        <button className='button'>Add bingo card</button>
        <button className='button secondary'>View trail maps</button>
      </div> */}
    </Modal>
  )
}