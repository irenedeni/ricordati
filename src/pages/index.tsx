import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Layout, Tabs } from '@/components/index'
import { getItems } from '../lib/prisma'

type Item = {
  id: string
  name: string
  person: string
  createdAt: Date | string
  updatedAt?: Date | string
}

type TabItems = {
  lent: Item[]
  borrowed: Item[]
}

export default function Home({ lent, borrowed }: TabItems) {
  const { data: session, status } = useSession()
  const allowedUser = 'irene.denicolo89@gmail.com'

  return (
    <>
      <Head>
        <title>Ricordati - an app to track lended and borrowed items</title>
        <meta
          name="description"
          content="Ricordati - an app to track lended and borrowed items"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : status === 'unauthenticated' ? (
          <p>Unauthenticated</p>
        ) : null}
        {session &&
        status === 'authenticated' &&
        session?.user?.email === allowedUser ? (
          <>
            <button onClick={() => signOut()}>
              <a>Log out</a>
            </button>
            <Tabs tabs={{ lent, borrowed }} />
          </>
        ) : (
          <Link href="/api/auth/signin">Log in</Link>
        )}
      </Layout>
    </>
  )
}

const formattedItem = (item: Item) => ({
  id: item.id,
  name: item.name,
  createdAt: item.createdAt.toString(),
  person: item.person,
  updatedAt: item.updatedAt ? item.updatedAt.toString() : undefined,
})

export const getStaticProps: GetStaticProps<TabItems> = async () => {
  const lent: Item[] = await getItems(true)
  const borrowed: Item[] = await getItems(false)

  const formattedLentItems: Item[] = lent.map((item: Item) =>
    formattedItem(item),
  )
  const formattedBorrowedItems: Item[] = borrowed.map((item: Item) =>
    formattedItem(item),
  )

  return {
    props: {
      lent: formattedLentItems,
      borrowed: formattedBorrowedItems,
    },
    revalidate: 10,
  }
}
