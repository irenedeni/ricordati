import { useState } from 'react'
import styles from '@/styles/Tabs.module.css'
import { Tab, ItemCard, Button } from '@/components'

type TabItem = {
  name: string
  person: string
}

type TabsItems = {
  tabs: {
    lent: TabItem[]
    borrowed: TabItem[]
  }
}

const Tabs = (tabs: TabsItems): React.JSX.Element => {
  const { lent, borrowed } = tabs.tabs
  const [isActive, setIsActive] = useState(true)

  const handleTabClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div className={styles.tabs}>
      <Tab title="Borrowed" active={isActive} onClick={handleTabClick}>
        {borrowed.map((item, i) => (
          <div key={i}>
            <ItemCard name={item.name} person={item.person} />
            <Button text="Add item" href="/create" />
          </div>
        ))}
      </Tab>
      <Tab title="Lent out" active={!isActive} onClick={handleTabClick}>
        {lent.map((item, i) => (
          <div key={i}>
            <ItemCard name={item.name} person={item.person} />
            <Button text="Add item" href="/create" />
          </div>
        ))}
      </Tab>
    </div>
  )
}

export default Tabs
