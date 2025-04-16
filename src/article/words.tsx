import Word from './word'

export default function Words({ value }: { value: ArticleWord[] }) {
  return (
    <div>
      {value.map((word) => {
        return <Word key={word.id} word={word} />
      })}
    </div>
  )
}
