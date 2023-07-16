type Props = {
  name: string
  person?: string
  className?: string
}

const ItemCard = ({ name, person, className }: Props): React.JSX.Element => {
  return (
    <div className={className}>
      <p>{name}</p>
      <p>{person}</p>
    </div>
  )
}

export default ItemCard
