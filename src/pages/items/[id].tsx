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

export default function Update(item:Item): React.JSX.Element {
  const { id, name, person, ownedByMe } = item.item
  const [formName, setFormName] = useState(name)
  const [formPerson, setFormPerson] = useState(person)
  const [formOwnedByMe, setFormOwnedByMe] = useState(ownedByMe)

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { name: formName, person: formPerson, ownedByMe: formOwnedByMe, id }
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
  return (
    <>
     <Layout>
        <h1>Edit item</h1>
        <form onSubmit={submitData}>
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
            onChange={(e) => setFormOwnedByMe(e.target.value === 'Yes' ? true : false)}
          >
            <option value='No'>No</option>
            <option value='Yes'>Yes</option>
          </select>
          <input type="submit" value="Edit" />
          <a className="back" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (props:any) => {
  const { id } = props.query
  const itemID = id
  const item = await getItem(itemID)
  return {
    props: {
      item,
    },
  }
}
