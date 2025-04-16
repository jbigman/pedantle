import Words from './words'

const Article = (props: { value: any }) => {
  if (!props.value) return <p>No article found.</p>

  return (
    <div>
      <h2>
        <Words value={props.value.title} />
      </h2>
      <p style={{ whiteSpace: 'pre-line' }}>
        <Words value={props.value.extract} />
      </p>
    </div>
  )
}

export default Article
