import { Fragment } from 'react'
import articleStyles from './article.module.scss'
import { Delimiters } from './delimiters';

export default function Word(props: {
  word: { word: string; guess: string | null; score: number }
}) {
  const { word } = props

  if(Object.values(Delimiters).includes(word.word as Delimiters)) {
    return (
      <span className={articleStyles.delimiter}>
        {word.word}
      </span>
    )
  }

  return (
    <>
      {word.word === ' ' ? (
        <span className={articleStyles.space}> </span>
      ) : word.word === '\n' ? (
        <br />
      ) : (
        <span
          className={`${word.score === 1 ? articleStyles.valid : articleStyles.unknown} ${word.score > 0 ? articleStyles.green : articleStyles.red}`}
        >
          {word.word.replace(/ /g, '\u00A0')}
        </span>
      )}
    </>
  )
}
