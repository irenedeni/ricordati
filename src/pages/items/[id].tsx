import { useState } from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import { getItem } from '../../lib/prisma'
import { Layout } from '@/components'

type Item = {
  item: {
    id: string
    name: string
    person: string
    ownedByMe: boolean
  }
}

export default function Update(item: Item): React.JSX.Element {
  const { id, name, person, ownedByMe } = item.item
  const [formName, setFormName] = useState(name)
  const [formPerson, setFormPerson] = useState(person)
  const [formOwnedByMe, setFormOwnedByMe] = useState(ownedByMe)

  const updateItem = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = {
        name: formName,
        person: formPerson,
        ownedByMe: formOwnedByMe,
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

  async function deleteItem(itemId: string): Promise<void> {
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
          <label htmlFor="ownership">Owned by me:</label>
          <select
            name="ownership"
            id="ownership"
            onChange={(e) =>
              setFormOwnedByMe(e.target.value === 'Yes' ? true : false)
            }
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <input disabled={!formName || !formPerson} type="submit" value="Edit item" />
          <button onClick={() => deleteItem(id)}>Delete item</button>
        </form>
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
