import styles from '@/styles/Divider.module.css'

type Divider = {
  large?: boolean
}


const Divider = ({ large }: Divider): React.JSX.Element => {
  return (
    <div className={large ? styles.large : styles.small}>
    </div>
  )
}

export default Divider
