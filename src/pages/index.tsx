import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Layout.module.css'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ricordati - an app to track lended and borrowed items</title>
        <meta
          name="description"
          content="Ricordati - an app to track lended and borrowed items"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Layout className={styles.layout}>
        <div className={styles.description}>ciao</div>
      </Layout>
    </>
  )
}
