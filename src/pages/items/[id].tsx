import { useState } from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { getItem } from '../../lib/prisma'
import { Layout, Form } from '@/components'

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
  return (
    <>
      <Layout>
        <h1>Edit item</h1>
        <Form update item={item.item} />
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
