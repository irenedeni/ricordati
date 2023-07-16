
import styles from '@/styles/ItemCard.module.css'
import Button from './Button'

type Props = {
  id: string
  name: string
  person: string
}

const ItemCard = ({ name, person, id }: Props): React.JSX.Element => {
  return (
    <div className={styles.itemCard}>
      <p>{name}</p>
      <p>{person}</p>
      <Button text="Edit item" href={`/items/${id}`} />
    </div>
  )
}

export default ItemCard
