import type Immutable from 'immutable'

export interface BingoCardState {
  selectedIndexes: Immutable.Set<number>
  bingoIndexes: Immutable.Set<number>
}

export interface GameState {
  activeGame: number
  games: GameId[]
}

export interface GameId {
  cardId: string
  name?: string
  seed: string
}
