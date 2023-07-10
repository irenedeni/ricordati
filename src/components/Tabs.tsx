import { useState } from 'react'
import styles from '@/styles/Tabs.module.css'
import Tab from './Tab'

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
        {borrowed.map((item) => (
          <div key={item.name}>
            <p>{item.name}</p>
            <p>{item.person}</p>
          </div>
        ))}
      </Tab>
      <Tab title="Lent out" active={!isActive} onClick={handleTabClick}>
        {lent.map((item) => (
          <div key={item.name}>
            <p>{item.name}</p>
            <p>{item.person}</p>
          </div>
        ))}
      </Tab>
    </div>
  )
}

export default Tabs
