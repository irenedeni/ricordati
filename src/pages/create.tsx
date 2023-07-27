import { useRouter } from 'next/router'
import { Layout, Form } from '@/components'
import styles from '@/styles/Form.module.css'

export default function Create() {
  const router = useRouter()
  const { itemsType } = router.query
  return (
    <>
      <Layout>
        <h1 className={styles.formTitle}>Add {itemsType ?? ''} item</h1>
        <Form itemsType={itemsType as string}/>
      </Layout>
    </>
  )
}
