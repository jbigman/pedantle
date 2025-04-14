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

const useGetRandomArticle2 = () => {
  const {
    data: articleData,
    error,
    isLoading,
  } = useSWR<WikipediaQueryResponse>(
    'https://fr.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=random&grnnamespace=0&prop=extracts&explaintext=1&exintro=0&uselang=f',
    fetcher
  )

  const page = articleData?.query?.pages
    ? Object.values(articleData.query.pages)[0]
    : null

  return {
    article: page,
    isLoading,
    error,
  }
}

export default useGetRandomArticle2
