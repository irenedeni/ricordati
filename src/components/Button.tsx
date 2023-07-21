import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  text: string
  action?: () => void
  className?: string
  children?: ReactNode
  href?: string
}

const Button = ({
  text,
  className,
  action,
  children,
  href,
}: Props): React.JSX.Element => {
  const Button = (
    <button className={className} onClick={action ?? undefined}>
      {text}
    </button>
  )
  return (
    href !== undefined ? <Link href={href}>{Button}</Link> : Button
  )
}

export default Button
