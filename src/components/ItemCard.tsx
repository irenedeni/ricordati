import styles from '@/styles/ItemCard.module.css'
import Button from './Button'
import { capitalize } from '@/lib/functions'

type Props = {
  id: string
  name: string
  person: string
  createdAt: Date | string
  image?: string | null
  type: string
}

const formatDate = (date: Date | string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  const formattedDate = new Date(date).toLocaleDateString('en-GB', options)
  const [day, month, year] = formattedDate.split(' ')
  return `${day} ${month} ${year}`
}

const ItemCard = ({
  name,
  person,
  id,
  createdAt,
  image,
  type,
}: Props): React.JSX.Element => {
  const subtitle = type === 'lent' ? 'To: ' : 'From: '
  return (
    <div className={styles.itemCard}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <div className={styles.title}>{capitalize(name)}</div>
          <div className={styles.subtitle}>{subtitle}{capitalize(person)}</div>
        </div>
        {image ? (
          <img
            src={image}
            alt={name}
            width={80}
            height={80}
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder}>Image Placeholder</div>
        )
      }
      </div>
      <div className={styles.footer}>
        <div className={styles.date}>{formatDate(createdAt)}</div>
        <Button text="Edit item" href={`/items/${id}`} secondary small hasIcon/>
      </div>
    </div>
  )
}

export default ItemCard
