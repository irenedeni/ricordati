import { useState } from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import { NextApiRequest, NextApiResponse } from 'next'
import { getItem } from '../../lib/prisma'
import { Layout } from '@/components'

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
  const { id, name, person, ownedByMe, image } = item.item
  const [formName, setFormName] = useState(name)
  const [formImage, setFormImage] = useState(image ?? '')
  const [formPerson, setFormPerson] = useState(person)
  const [formOwnedByMe, setFormOwnedByMe] = useState(ownedByMe)

  const updateItem = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = {
        name: formName,
        person: formPerson,
        ownedByMe: formOwnedByMe,
        image: formImage,
        id,
      }
      await fetch(`/api/item/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const deleteItem = async (itemId: string): Promise<void> => {
    await fetch(`/api/item/${itemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    Router.push('/')
  }

  return (
    <>
      <Layout>
        <h1>Edit item</h1>
        <form onSubmit={updateItem}>
          <input
            autoFocus
            onChange={(e) => setFormName(e.target.value)}
            placeholder="name"
            type="text"
            value={formName}
          />
          <input
            autoFocus
            onChange={(e) => setFormPerson(e.target.value)}
            placeholder="person"
            type="text"
            value={formPerson}
          />
          <input
            autoFocus
            onChange={(e) => setFormImage(e.target.value)}
            placeholder="image"
            type="text"
            value={formImage ?? ''}
          />
          <label htmlFor="ownership">Owned by me:</label>
          <input type="checkbox" id="ownership" checked={formOwnedByMe} onChange={(e) => setFormOwnedByMe(e.target.checked)} />
          <input disabled={!formName || !formPerson} type="submit" value="Edit item" />
        </form>
        <button onClick={() => deleteItem(id)}>Delete item</button>
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
