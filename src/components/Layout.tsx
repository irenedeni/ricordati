import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import styles from '@/styles/Layout.module.css'

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
}

type Props = {
  children: ReactNode
  className?: string
}

const Layout = ({ children, className }: Props): React.JSX.Element => {
  return (
    <>
      <Navbar />
      <motion.main
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear' }}
        className={`${styles.layout} ${className}`}
      >
        {children}
      </motion.main>
    </>
  )
}

export default Layout
