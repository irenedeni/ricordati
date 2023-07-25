import Link from 'next/link'
import styles from '@/styles/Button.module.css'

type Props = {
  text: string
  action?: () => void
  className?: string
  fullwidth?: boolean
  primary?: boolean
  hasIcon?: boolean
  small?: boolean
  large?: boolean
  secondary?: boolean
  warning?: boolean
  href?: string
}

const Button = (button: Props): React.JSX.Element => {
  const {
    text,
    action,
    className,
    fullwidth,
    primary,
    small,
    large,
    hasIcon,
    secondary,
    warning,
    href,
  } = button
  const ButtonElement = (
    <button
      className={`${className ? className : ''} 
        ${fullwidth ? styles.fullwidth : ''} 
        ${small ? styles.small : ''} 
        ${large ? styles.large : ''} 
        ${primary ? styles.primary : ''} 
        ${secondary ? styles.secondary : ''} 
        ${warning ? styles.warning : ''}
        ${hasIcon ? styles.hasIcon : ''}
      `}
      onClick={action ?? undefined}
    >
      {text}
    </button>
  )
  return href !== undefined ? (
    <Link href={href} style={{ width: fullwidth ? '100%' : 'auto' }}>
      {ButtonElement}
    </Link>
  ) : (
    ButtonElement
  )
}

export default Button
