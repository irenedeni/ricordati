import Head from 'next/head'
import { Layout, Tabs } from '@/components/index'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next/types'

type Item = {
  name: string
  person: string
}

type TabItems = {
  lent: Item[]
  borrowed: Item[]
}

export default function Home(items: TabItems) {
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
      <Layout>
        <Tabs tabs={items} />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const lent = await prisma.item.findMany({
    where: { ownedByMe: true },
    orderBy: { createdAt: 'desc' },
  })
  const borrowed = await prisma.item.findMany({
    where: { ownedByMe: false },
    orderBy: { createdAt: 'desc' },
  })

  const formattedLentItems: Item[] = lent.map((item) => ({
    name: item.name,
    createdAt: item.createdAt.toISOString(),
    ownedByMe: item.ownedByMe,
    person: item.person,
  }))
  const formattedBorrowedItems: Item[] = borrowed.map((item) => ({
    name: item.name,
    createdAt: item.createdAt.toISOString(),
    ownedByMe: item.ownedByMe,
    person: item.person,
  }))

  return {
    props: {
      lent: formattedLentItems,
      borrowed: formattedBorrowedItems,
    },
    revalidate: 10,
  }
}
