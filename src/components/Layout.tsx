import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
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

const Layout = ({ children, className }: Props): JSX.Element => {
  const router = useRouter()
  return (
    <>
      <Navbar />
      <motion.main
        variants={variants} 
        initial="hidden" 
        animate="enter" 
        exit="exit" 
        transition={{ type: 'linear' }}
        className={className}
      >
        {children}
      </motion.main>
    </>
  )
}

export default Layout
