import { useState } from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import { getItem } from '../../lib/prisma'
import { Layout } from '@/components'

type Item = {
  id: string
}

export default function Update(item:Item): React.JSX.Element {
  console.log('item', item)
  return (
    <>
      <Layout>
        ciao
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (props:any) => {
  const { id } = props.query
  console.log('ID!!', id)
  const itemID = id
  const item = await getItem(itemID)
  return {
    props: {
      item,
    },
  }
}
