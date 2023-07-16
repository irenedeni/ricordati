
import styles from '@/styles/ItemCard.module.css'

type Props = {
  name: string
  person?: string
}

const ItemCard = ({ name, person }: Props): React.JSX.Element => {
  return (
    <div className={styles.itemCard}>
      <p>{name}</p>
      <p>{person}</p>
    </div>
  )
}

export default ItemCard
