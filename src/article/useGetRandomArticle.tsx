import useSWR from 'swr'
import axios from 'axios'

interface WikipediaPage {
  pageid: number
  ns: number
  title: string
  extract: string
}

interface WikipediaQueryResponse {
  query: {
    pages: {
      [key: string]: WikipediaPage
    }
  }
}

const fetcher = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

const useGetRandomArticle = () => {
  const {
    data: titleData,
    error: titleError,
    isLoading: titleLoading,
  } = useSWR('random-title', async () => {
    const res = await fetcher(
      'https://fr.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=random&rnnamespace=0&rnlimit=1'
    )
    return res.query.random[0].title
  })

  const {
    data: articleData,
    error: articleError,
    isLoading: articleLoading,
  } = useSWR<WikipediaQueryResponse>(
    titleData
      ? `https://fr.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&explaintext=1&titles=${encodeURIComponent('révolution')}`
      : null,
    fetcher
  )

  const page = articleData?.query?.pages
    ? Object.values(articleData.query.pages)[0]
    : null

  return {
    article: page,
    isLoading: titleLoading || articleLoading,
    error: titleError || articleError,
  }
}

export default useGetRandomArticle
