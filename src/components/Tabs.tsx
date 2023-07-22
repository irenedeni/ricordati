import { useState } from 'react'
import styles from '@/styles/Tabs.module.css'
import { TabToggle, TabContent } from '@/components'

type TabItem = {
  name: string
  person: string
  id: string
  createdAt: Date | string
  image?: string | null
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
      <TabToggle title="Lent out" active={isActive} onClick={handleTabClick} elementsCount={lent.length}>
        <TabContent items={lent} itemsType="lent"/>
      </TabToggle>
      <TabToggle title="Borrowed" active={!isActive} onClick={handleTabClick} elementsCount={borrowed.length}>
        <TabContent items={borrowed} itemsType="borrowed"/>
      </TabToggle>
    </div>
  )
}

export default Tabs
