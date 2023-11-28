import Alea from 'alea'

export const randomTileSequence = (seed: string, tiles: number): number[] => {
  var prng = Alea(seed)

  const sequence = [...Array(tiles).keys()]

  const randomSeq = []

  // Pick 24 tiles
  while (randomSeq.length < 24) {
    const el = sequence.splice(Math.floor(prng.next() * sequence.length), 1)[0]
    randomSeq.push(el)
  }
  return randomSeq
}
