import { useMemo, useState } from 'react'
import Article from './article'
import SearchInput from './SearchInput'
import useGetArticle from './useGetArticle'
import type { ArticleDto } from '@t/ArticleDto'
import useGetRandomArticle from './useGetRandomArticle'
import useGetRandomArticle2 from './useGetRandomArticle2'

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export default function Page() {
  const titles = ['Star Wars']

  const randomTitle = useMemo(() => {
    const index = randomIntFromInterval(0, titles.length - 1)
    return titles[index]
  }, [])

  const { article, isLoading, error } = useGetArticle(randomTitle)

  const [myArticle, setArticle] = useState<ArticleDto | null>()

  if (isLoading) return <p>Loading random article…</p>
  if (error) return <p>Error loading article.</p>
  console.log('article', article)
  console.log('myArticle', myArticle)
  return (
    <div style={{ padding: '20px' }}>
      {article && (
        <SearchInput
          onChange={(a: ArticleDto) => setArticle(a)}
          article={myArticle ? myArticle : article}
        />
      )}
      <Article value={myArticle? myArticle : article} />
    </div>
  )
}
