import { motion } from 'framer-motion'
import styles from '@/styles/Tabs.module.css'

const variants = {
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
}

type Props = {
  title: string
  active?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const TabToggle = ({
  title,
  active,
  onClick,
  children,
}: Props): React.JSX.Element => {
  return (
    <>
      <div
        className={`${styles.toggle} ${
          active ? styles.active : styles.disabled
        }`}
        onClick={onClick}
      >
        <motion.div
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ type: 'linear' }}
        >
          {title}
        </motion.div>
      </div>
      <div
        style={{ display: active ? 'flex' : 'none' }}
        className={styles.tabToggle}
      >
        {children}
      </div>
    </>
  )
}

export default TabToggle
