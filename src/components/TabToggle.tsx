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
  elementsCount?: number
}

const TabToggle = ({
  title,
  active,
  onClick,
  children,
  elementsCount,
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
          className={styles.tabTitle}
        >
          {title}
          {elementsCount && (
            <span
              className={`${styles.elementsCount} ${
                active
                  ? styles.activeElementsCount
                  : styles.disabledElementsCount
              }`}
            >
              {elementsCount}
            </span>
          )}
        </motion.div>
      </div>
      <div
        style={{ display: active ? 'block' : 'none' }}
        className={styles.tabToggle}
      >
        {children}
      </div>
    </>
  )
}

export default TabToggle
