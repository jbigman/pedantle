import { useMemo } from 'react'
import useGetArticle from './useGetArticle'
import Extract from './extract'

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default function RandomWikiInfo() {
  const titles = [
    'Star Wars',
  ]

  const randomTitle = useMemo(() => {
    const index = randomIntFromInterval(0, titles.length - 1)
    return titles[index]
  }, [])

  const { article, isLoading, error } = useGetArticle(randomTitle)

  if (isLoading) return <p>Loading random article…</p>
  if (error) return <p>Error loading article.</p>

  return (
    <div>
      {article ? (
        <>
          <h2>
            <Extract value={article.title} />
          </h2>
          <p style={{ whiteSpace: 'pre-line' }}>
            <Extract value={article.extract} />
          </p>
        </>
      ) : (
        <p>No article found.</p>
      )}
    </div>
  )
}
