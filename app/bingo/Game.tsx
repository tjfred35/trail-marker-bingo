
import * as React from 'react'
import cx from 'classnames'
import Immutable from 'immutable'
import type { Card } from '~/cards/Card'
import { useLocalStorage } from '~/useLocalStorage'
import { randomTileSequence } from './randomTileSequence'
import { FlipBox } from './FlipBox'
import { GearIcon } from '~/icons/GearIcon'
import { CloseIcon } from '~/icons/CloseIcon'
import { ChevronLeftIcon } from '~/icons/ChevronLeftIcon'
import { ChevronRightIcon } from '~/icons/ChevronRightIcon'
import { NewGameSlide } from './NewGameSlide'
import { LoadingSlide } from './LoadingSlide'
import { HowToPlayModal } from './HowToPlayModal'
import { SettingsModal } from './SettingsModal'
import type { BingoCardState, GameState } from './types'

const FREE_INDEX = 12

const LOADING_GAME: GameState = {
  activeGame: -2,
  games: []
}
const INITIAL_GAME: GameState = {
  activeGame: -1,
  games: []
}

const INITIAL_CARD: BingoCardState = {
  selectedIndexes: Immutable.Set([FREE_INDEX]),
  bingoIndexes: Immutable.Set()
}

export const TrailMarkerBingo = ({ cards }: { cards: Record<string, Card> }) => {
  const [state, setState] = useLocalStorage<GameState>(
    'games', INITIAL_GAME, LOADING_GAME
  )
  const [isHowToPlay, setHowToPlay] = React.useState(false)
  const [isSettings, setSettings] = React.useState(false)

  return (
    <section>
      <h1>Trail Marker Bingo
        <div className="buttons">
          <button
            className="icon-button help-button no-print"
            onClick={() => setHowToPlay(true)}
          >
            <div>?</div>
          </button>
          <button
            className="icon-button settings-button no-print"
            onClick={() => setSettings(true)}
          >
            <GearIcon />
          </button>
        </div>
      </h1>
      {state === LOADING_GAME ?
        <LoadingSlide /> :
        <CardSlider
          cards={cards}
          state={state}
          setState={setState}
          onHowToPlay={() => setHowToPlay(true)}
        />
      }
      <div style={{ clear: 'both' }}></div>
      {isHowToPlay && (
        <HowToPlayModal
          onRequestClose={() => setHowToPlay(false)}
        />
      )}
      {isSettings && (
        <SettingsModal
          onRequestClose={() => setSettings(false)}
        />
      )}
    </section>
  )
}

const CardSlider = ({ cards, state, setState, onHowToPlay }: {
  cards: Record<string, Card>
  state: GameState
  setState: React.Dispatch<React.SetStateAction<GameState>>,
  onHowToPlay: () => void
}) => {
  const slidesRef = React.useRef<HTMLDivElement>(null)

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (slidesRef.current) {
      const activeIndex = Math.floor(
        (slidesRef.current.offsetWidth / 2 + e.currentTarget.scrollLeft) / slidesRef.current.scrollWidth * (state.games.length + 1)
      )
      if (activeIndex !== state.activeGame) {
        setState({
          activeGame: activeIndex,
          games: state.games,
        })
      }
    }
  }

  const getScrollLeft = (el: HTMLDivElement, index: number) => {
    const slideCount = state.games.length + 1
    const slideWidth = el.scrollWidth / slideCount
    return (index + slideCount) % slideCount * slideWidth
  }

  const scrollTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (slidesRef.current) {
      const left = getScrollLeft(slidesRef.current, index)

      slidesRef.current.scrollTo({
        left,
        behavior
      })
    }
  }

  React.useEffect(() => {
    scrollTo(state.activeGame, 'auto')
  }, [state.games])

  return (
    <div className='grid-container'>
      <div className='slides' id='slides' onScroll={onScroll} ref={slidesRef}>
        {state.games.map((game, index) => {
          return (
            <div className='slide' key={`${game.cardId}-${game.seed}`}>
              {(index === state.activeGame ||
                index === state.activeGame - 1 ||
                index === state.activeGame + 1) &&
                (
                  <BingoCard
                    key={`key.${game.cardId}.${game.seed}`}
                    seed={game.seed}
                    name={game.name}
                    card={cards[game.cardId]}
                    onRemoveCard={() => {
                      setState({
                        activeGame: state.activeGame,
                        games: state.games.filter(
                          (g) => g.cardId !== game.cardId || g.seed !== game.seed
                        )
                      })
                    }}
                  />
                )
              }
            </div>
          )
        })}
        <div className='slide'>
          <NewGameSlide
            games={state.games}
            cards={cards}
            onNewGame={(card, name) => {
              setState({
                activeGame: state.games.length,
                games: [
                  ...state.games,
                  {
                    // TODO: Handle cardId, and avoid duplicates
                    cardId: card.id,
                    name,
                    seed: Math.ceil(Math.random() * 999).toString()
                  }
                ]
              })
            }}
            onHowToPlay={onHowToPlay}
          />
        </div>
      </div>

      {state.games.length > 0 && (
        <div className="pagination no-print" >
          <PagePrev
            onClick={() => {
              scrollTo(state.activeGame - 1)
            }}
          />
          {state.games.map((_, index) => {
            return (
              <PageButton
                key={index}
                isActive={state.activeGame === index}
                onClick={() => {
                  scrollTo(index)
                }}
              />
            )
          })}
          <PageButton
            isActive={state.activeGame === state.games.length}
            onClick={() => {
              scrollTo(state.games.length)
            }}
          />
          <PageNext
            onClick={() => {
              scrollTo(state.activeGame + 1)
            }}
          />
        </div>
      )}
    </div>
  )
}

export const BingoCard = ({ seed: game, name, card, onRemoveCard }: {
  seed: string,
  name?: string,
  card: Card,
  onRemoveCard: () => void
}) => {
  const { lands, tiles, sprite } = card

  const localStorageKey = `gameState.${card.id}.${game}`

  const [gameState, setGameState] = useLocalStorage<BingoCardState>(
    localStorageKey,
    INITIAL_CARD,
    INITIAL_CARD,
    cardSerializer,
    cardDeserializer
  )

  const tileSequence = randomTileSequence(game, tiles.length)

  return (
    <div
      className={cx(sprite, {
        "won": gameState.bingoIndexes.size > 0,
      })}
    >
      <div className='card-header'>
        <div style={{
          background: 'white',
          height: '100%',
          width: '100%',
          display: 'flex'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <div className="lands">{lands.join(" • ")}</div>
            <div className="card">Card #{game} {name && <> • {name}</>}</div>
            <div className="card-header-win no-print">BINGO</div>
          </div>
          <button
            className='icon-button remove-button no-print'
            onClick={() => {
              if (confirm('Remove this bingo card?')) {
                localStorage.removeItem(localStorageKey)
                onRemoveCard()
              }
            }}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
      <div
        className={cx("grid")}
      >
        {tileSequence.map((tileIndex, index) => {
          const tile = tiles[tileIndex]
          const key = `p${tile.rowIndex}-${tile.colIndex}`
          const gridIndex = index > 11 ? index + 1 : index
          const isSelected = gameState.selectedIndexes.has(gridIndex)
          return <React.Fragment key={`${key}-Fragment`}>
            <FlipBox
              rowIndex={tile.rowIndex}
              colIndex={tile.colIndex}
              key={key}
              isSelected={isSelected}
              isBingo={gameState.bingoIndexes.has(gridIndex)}
              onClick={() => {
                let selectedIndexes = gameState.selectedIndexes
                if (isSelected) {
                  selectedIndexes = selectedIndexes.delete(gridIndex)
                } else {
                  selectedIndexes = selectedIndexes.add(gridIndex)
                }
                setGameState({
                  selectedIndexes,
                  bingoIndexes: checkForBingo(selectedIndexes)
                })
              }} />
            {index === FREE_INDEX - 1 && (
              <FreeTile
                isBingo={gameState.bingoIndexes.has(FREE_INDEX)}
              />
            )}
          </React.Fragment>
        })}
      </div>
    </div>
  )
}

const checkForBingo = (selectedIndexes: Immutable.Set<number>): Immutable.Set<number> => {
  let indexesByRow: Record<number, Array<number>> = { 0: [], 1: [], 2: [], 3: [], 4: [] };
  let indexesByCol: Record<number, Array<number>> = { 0: [], 1: [], 2: [], 3: [], 4: [] };
  let backwardDiagonalIndexes: Array<number> = []
  let forwardDiagonalIndexes: Array<number> = []
  let bingoIndexes: Set<number> = new Set<number>()

  selectedIndexes.forEach((index) => {
    const row = Math.floor(index / 5)
    const col = index % 5

    const rowIndexes = indexesByRow[row].concat(index)
    if (rowIndexes.length === 5) {
      rowIndexes.forEach((i) => bingoIndexes.add(i))
    }
    indexesByRow[row] = rowIndexes

    const colIndexes = indexesByCol[col].concat(index)
    if (colIndexes.length === 5) {
      colIndexes.forEach((i) => bingoIndexes.add(i))
    }
    indexesByCol[col] = colIndexes

    if (row === col) {
      backwardDiagonalIndexes.push(index)
      if (backwardDiagonalIndexes.length === 5) {
        backwardDiagonalIndexes.forEach((i) => bingoIndexes.add(i))
      }
    }
    if (row + col === 4) {
      forwardDiagonalIndexes.push(index)
      if (forwardDiagonalIndexes.length === 5) {
        forwardDiagonalIndexes.forEach((i) => bingoIndexes.add(i))
      }
    }
  })

  return Immutable.Set(bingoIndexes)
}

const FreeTile = ({
  isBingo
}: {
  isBingo: boolean
}) => {
  return (
    <div className={cx('free-tile', {
      'bingo': isBingo
    })} key='free-tile'>
      <div>FREE</div>
      <div className="flip-box-win"></div>
    </div>
  )
}

function cardDeserializer(saved: string): BingoCardState {
  const json = JSON.parse(saved)
  return {
    selectedIndexes: Immutable.Set(json.selectedIndexes),
    bingoIndexes: Immutable.Set(json.bingoIndexes)
  }
}

function cardSerializer(gameState: BingoCardState): string {
  return JSON.stringify({
    selectedIndexes: Array.from(gameState.selectedIndexes),
    bingoIndexes: Array.from(gameState.bingoIndexes)
  })
}

const PagePrev = ({ children, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={cx('icon-button page-prev')} {...props}>
      <ChevronLeftIcon />
    </button>
  )
}

const PageNext = ({ children, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={cx('icon-button page-next')} {...props}>
      <ChevronRightIcon />
    </button>
  )
}

const PageButton = ({ isActive, ...props }: React.HTMLAttributes<HTMLButtonElement> & { isActive: boolean }) => {
  return <button className={cx('icon-button page-dot', { 'page-active': isActive })} {...props}><div></div></button>
}
