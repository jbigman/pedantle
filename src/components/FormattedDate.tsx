import { useFormatter } from 'next-intl'

const FormattedDate = (props: {
  value: number | Date
  dateStyle?: 'full' | 'long' | 'medium' | 'short'
  timeStyle?: 'full' | 'long' | 'medium' | 'short'
}) => {
  const format = useFormatter()

  return (
    <>
      {' '}
      {format.dateTime(props.value, {
        dateStyle: props.dateStyle,
        timeStyle: props.timeStyle,
      })}
    </>
  )
}

export default FormattedDate
