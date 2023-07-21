import Link from 'next/link'
import styles from '@/styles/Button.module.css'

type Props = {
  text: string
  action?: () => void
  className?: string
  fullwidth?: boolean
  primary?: boolean
  secondary?: boolean
  warning?: boolean
  href?: string
}

const Button = ({
  text,
  className,
  action,
  fullwidth,
  primary,
  secondary,
  warning,
  href,
}: Props): React.JSX.Element => {
  const ButtonElement = (
    <button
      className={`${className} 
        ${fullwidth && styles.fullwidth} 
        ${primary && styles.primary} 
        ${secondary && styles.secondary} 
        ${warning && styles.warning}
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
