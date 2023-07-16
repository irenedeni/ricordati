import { useState } from 'react'
import styles from '@/styles/Tabs.module.css'
import { TabToggle, TabContent } from '@/components'

type TabItem = {
  name: string
  person: string
  id: string
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
      <TabToggle title="Borrowed" active={isActive} onClick={handleTabClick}>
        <TabContent items={borrowed} />
      </TabToggle>
      <TabToggle title="Lent out" active={!isActive} onClick={handleTabClick}>
        <TabContent items={lent} />
      </TabToggle>
    </div>
  )
}

export default Tabs
