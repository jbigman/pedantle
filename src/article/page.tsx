import Article from './article'
import SearchInput from './SearchInput'

export default function Page() {
  return (
    <div style={{ padding: '20px' }}>
      <SearchInput />
      <Article />
    </div>
  )
}
