import axios, { type RawAxiosRequestHeaders } from 'axios'
import useSWR from 'swr'

interface GetRandomArticleParams {
  theme: string
}

const useGetRandomTitle = (params?: Partial<GetRandomArticleParams>) => {
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
    ).data.query.pages[0].title

  const { data, error, isLoading, mutate } = useSWR<string>(
    'https://fr.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=random&rnnamespace=0&rnlimit=1',
    fetcher
  )

  const title = data ? data : ''
  return { title, error, isLoading, mutate }
}

export default useGetRandomTitle
