import { signOut, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Layout, Tabs, Button, Divider } from '@/components/index'
import { getItems } from '../lib/prisma'

type Item = {
  id: string
  name: string
  person: string
  createdAt: Date | string
  updatedAt?: Date | string
  image?: string | null
}

type TabItems = {
  lent: Item[]
  borrowed: Item[]
}

export default function Home(props: TabItems) {
  const { data: session, status } = useSession()
  const { lent, borrowed } = props
  const navProps = {
    button: {
      action: () => signOut(),
      icon: '/assets/logout.png',
    },
  }

  return (
    <>
      <Head>
        <title>Ricordati - an app to track lended and borrowed items</title>
        <meta
          name="description"
          content="Ricordati - an app to track lended and borrowed items"
        />
        <meta
          name="viewport"
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <Layout button={status === 'authenticated' ? navProps.button : undefined}>
        {status === 'loading' ? (
          <div>Loading...</div>
        ) : status === 'unauthenticated' ? (
          <>
            <Divider />
            <Button href="/api/auth/signin" text="Log in" primary fullwidth/>
          </>
        ) : null}
        {session &&
          status === 'authenticated' &&
          session?.user?.email === process.env.NEXT_PUBLIC_ALLOWED_USER && (
            <Tabs tabs={{ lent, borrowed }} />
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
  image: item.image ?? null,
  updatedAt: item.updatedAt ? item.updatedAt.toString() : undefined,
})
export const getServerSideProps: GetServerSideProps<TabItems> = async () => {
  const lent: Item[] = await getItems(true)
  const borrowed: Item[] = await getItems(false)

  const formattedLentItems: Item[] = lent?.map((item: Item) =>
    formattedItem(item),
  )
  const formattedBorrowedItems: Item[] = borrowed?.map((item: Item) =>
    formattedItem(item),
  )

  return {
    props: {
      lent: formattedLentItems,
      borrowed: formattedBorrowedItems,
    }
  }
}
