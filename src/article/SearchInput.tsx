import { useDebouncedValue } from '@mantine/hooks'
import type { ArticleDto } from '@t/ArticleDto'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const SearchInput = (props: {
  article: ArticleDto
  onChange: (a: ArticleDto) => void
}) => {
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')

  const fetcher = (url: string) =>
    axios
      .post(url, { w: query, article: props.article })
      .then((res) => res.data)

  const {
    data: results,
    error,
    isValidating,
  } = useSWR(
    query ? `/api/searchWord?query=${query}` : null, // Appel à l'API locale
    fetcher
  )
  // Call props.onChange whenever results are updated
  useEffect(() => {
    if (results) {
      console.log('results', results)
      props.onChange(results.article) // Pass the fetched results to the parent
    }
  }, [results, props])

  const handleSearch = () => {
    if (!input.trim()) return
    setQuery(input) // Déclenche la requête SWR
    setInput('') // Réinitialise le champ de recherche
  }

  return (
    <div>
      <h1>Pedantle</h1>
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          } // Appel handleSearch si la touche "Entrée" est pressée
        }}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a word..."
        style={{ padding: '10px', width: '300px', marginRight: '10px' }}
      />
      <button type="button" onClick={handleSearch} style={{ padding: '10px' }}>
        Search
      </button>

      {isValidating && <p>Loading...</p>}
      {error && (
        <p style={{ color: 'red' }}>
          An error occurred while fetching results.
        </p>
      )}

      <ul>
        {results?.count}
      </ul>
    </div>
  )
}

export default SearchInput
