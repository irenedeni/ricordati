import { ItemCard, Button } from '@/components'
import styles from '@/styles/Tabs.module.css'
import Link from 'next/link'

type TabItem = {
  name: string
  person: string
  id: string
  createdAt: Date | string
  image?: string | null
}

type TabsItems = {
  items: TabItem[]
  itemsType: string
}

const TabContent = ({ items, itemsType }: TabsItems): React.JSX.Element => {
  return (
    <div className={styles.tabContentContainer}>
      <Link
        href={`/create?itemsType=${encodeURIComponent(itemsType)}`}
        className={styles.buttonLink}
      >
        <Button text={`Add ${itemsType} item`} fullwidth />
      </Link>
      <div className={styles.tabContent}>
        {items.map((item: TabItem, i: number) => (
          <ItemCard
            name={item.name}
            person={item.person}
            createdAt={item.createdAt}
            image={item.image ?? null}
            id={item.id}
            type={itemsType}
            key={i}
          />
        ))}
      </div>
    </div>
  )
}

export default TabContent
