import styles from '@/styles/Divider.module.css'

type DividerSize = {
  large?: boolean
}

const Divider = ({ large }: DividerSize): React.JSX.Element => {
  return <div className={large ? styles.large : styles.small}></div>
}

export default Divider
