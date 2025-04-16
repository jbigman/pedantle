import { cleanExtract } from './cleanExtract'

export const inProgressExtract = (text: string) : ArticleWord[] => {
  const extract = cleanExtract(text)

  const delimiterPattern = '[-.,;|{}\\[\\] ]' // ← espaces inclus ici
  const tokens =
    extract.match(new RegExp(`([\\p{L}\\p{N}']+|${delimiterPattern})`, 'gu')) ||
    []

  const delimiters = new Set(
    delimiterPattern.replace(/[\[\]\\]/g, '').split('')
  )
  let idCounter = 0 // Initialize idCounter outside the map function
  return tokens.map((token) => ({
    id: `${token}-${idCounter++}`,
    o: token,
    guess: undefined,
    score: 0,
  }))
}
