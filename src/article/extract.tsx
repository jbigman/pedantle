import { inProgressExtract } from './inProgressExtract'
import Word from './word'

export default function Extract({ value }: { value: string }) {
  return (
    <div>
      {inProgressExtract(value).map((word) => {
        return <Word key={word.id} word={word} />
      })}
    </div>
  )
}
