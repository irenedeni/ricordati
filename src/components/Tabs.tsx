import { useState } from 'react'
import styles from '@/styles/Tabs.module.css'
import Tab from './Tab'

const Toggle = (): React.JSX.Element => {
	const [isActive, setIsActive] = useState(true)

	const pageContent = [
		{
			title: 'Borrowed',
			content: 'List of Borrowed Items'
		},
		{
			title: 'Lent',
			content: 'List of Lent Items'
		}
	]

	const handleTabClick = () => {
    setIsActive(!isActive)
  }

	return (
		<div className={styles.tabs}>
			<Tab
				title={pageContent[0].title} 
        active={isActive} 
        onClick={handleTabClick}
      >
        {pageContent[0].content}
      </Tab>
			<Tab
        title={pageContent[1].title}
        active={!isActive}
        onClick={handleTabClick}
      >
        {pageContent[1].content}
      </Tab>
		</div>
	)
}

export default Toggle
