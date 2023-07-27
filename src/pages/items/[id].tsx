import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getItem } from '../../lib/prisma'
import { Layout, Form } from '@/components'
import styles from '@/styles/Form.module.css'

type Item = {
  item: {
    id: string
    name: string
    person: string
    ownedByMe: boolean
    image?: string | null
  }
}

export default function Update(item: Item): React.JSX.Element {
  const router = useRouter()
  const { itemsType } = router.query
  return (
    <>
      <Layout>
        <h1 className={styles.formTitle}>Edit {itemsType ?? ''} item</h1>
        <Form update item={item.item} itemsType={itemsType as string}/>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (props: any) => {
  const { id } = props.query
  const itemID = id
  const item = await getItem(itemID)
  return {
    props: {
      item,
    },
  }
}
