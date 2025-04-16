import articleStyles from './article.module.scss'
import { Delimiters } from './delimiters'

export default function Word({
  word,
}: {
  word: ArticleWord
}) {
  if (Object.values(Delimiters).includes(word.o as Delimiters)) {
    return <span>{word.o}</span>
  }

  // Word is found, display original
  if (word.guess && word.score === 1) {
    return <span>{word.o}</span>
  }

  // Word is not yet found display closer guess
  if (word.guess) {
    return (
      <span
        className={`${word.score === 1 ? articleStyles.valid : articleStyles.unknown} ${word.score > 0 ? articleStyles.green : articleStyles.red}`}
      >
        {word.guess}
      </span>
    )
  }
  return (
    <>
      {word.o === ' ' ? (
        <span className={articleStyles.space}> </span>
      ) : word.o === '\n' ? (
        <br />
      ) : (
        <span
          className={`${word.score === 1 ? articleStyles.valid : articleStyles.unknown} ${word.score > 0 ? articleStyles.green : articleStyles.red}`}
        >
          {word.o.replace(/ /g, '\u00A0')}
        </span>
      )}
    </>
  )
}
