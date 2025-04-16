import { cleanExtract } from './cleanExtract'
import { Delimiters } from './delimiters'

export const inProgressExtract = (text: string): ArticleWord[] => {
  const extract = cleanExtract(text)

  // Build delimiter pattern from Delimiters enum
  const delimiterPattern = `[${Object.values(Delimiters)
    .map((d) => {
      if (d === ' ') return '\\s' // Escape space as \s
      return d.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') // Escape special characters
    })
    .join('')}]`

  const tokens =
    extract.match(new RegExp(`([\\p{L}\\p{N}']+|${delimiterPattern})`, 'gu')) ||
    []

  const delimiters = new Set(Object.values(Delimiters))

  let idCounter = 0 // Initialize idCounter outside the map function
  return tokens.map((token) => ({
    id: `${idCounter++}`,
    o: token,
    guess: undefined,
    score: delimiters.has(token as Delimiters) ? 1 : 0, // Set score to 1 if token is a delimiter
  }))
}
