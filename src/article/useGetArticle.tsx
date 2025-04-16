import axios, { type RawAxiosRequestHeaders } from 'axios'
import useSWR from 'swr'
import { inProgressExtract } from './inProgressExtract'
import type { ArticleDto } from '@t/ArticleDto'

export interface WikipediaPage {
  pageid: number
  ns: number
  title: string
  extract: string
}

export interface WikipediaQuery {
  pages: {
    [key: string]: WikipediaPage
  }
}

export interface WikipediaRandomParseResponse {
  batchcomplete: string
  query: WikipediaQuery
}

const useGetArticle = (title: string) => {
  const shouldFetch = !!title

  const headers: RawAxiosRequestHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'User-Agent': process.env.NEXT_PUBLIC_USER_AGENT,
  }

  const fetcher = async (url: string) =>
    (
      await axios.get(url, {
        headers,
      })
    ).data

  const { data, error, isLoading, mutate } =
    useSWR<WikipediaRandomParseResponse>(
      shouldFetch
        ? `https://fr.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&explaintext=1r&titles=${encodeURIComponent(title)}`
        : null, // ⬅️ ne fait rien si pas de title

      fetcher
    )
  const page = data?.query?.pages ? Object.values(data.query.pages)[0] : null

  if (!page) {
    return { article: null, error, isLoading, mutate }
  }

  const modelArticle: ArticleDto = {
    title: inProgressExtract(page?.title),
    extract: inProgressExtract(page?.extract),
  }
  return { article: modelArticle, error, isLoading, mutate }
}

export default useGetArticle
