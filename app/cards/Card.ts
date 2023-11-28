export interface Card {
  id: string
  lands: Array<string>,
  sprite: string,
  tiles: Array<{
    id: string
    rowIndex: number
    colIndex: number
  }>
}