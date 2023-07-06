import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import styles from '@/styles/Navbar.module.css'

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
}

const Navbar = (): JSX.Element => {
  const router = useRouter()
  return (
    <motion.nav
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear' }}
      className={styles.nav}
    >
      <a href={router.basePath}>
        <img
          src={`${router.basePath}/assets/logo.png`}
          alt="Ricordati logo"
          className={styles.logo}
        />
      </a>
    </motion.nav>
  )
}

export default Navbar
