import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '@/styles/Navbar.module.css'
import Link from 'next/link'

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
}

type NavbarProps = {
  button?: {
    text?: string
    action?: () => void
    icon?: string
  }
}

const Navbar = ({ button }: NavbarProps): React.JSX.Element => {
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
      <Link href={router.basePath}>
        <Image
          src={`${router.basePath}/assets/logo.png`}
          alt="Ricordati logo"
          width={130}
          height={30}
        />
      </Link>
      {button && (
        <div onClick={button?.action}>
          {button?.text ?? '' }
          {button?.icon && (
            <Image src={button?.icon} alt="Icon" width={20} height={20} />
          )}
        </div>
      )}
    </motion.nav>
  )
}

export default Navbar
