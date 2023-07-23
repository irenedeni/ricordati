import { useState } from 'react'
import { Layout } from '@/components'
import Router from 'next/router'

export default function Create() {
  const [name, setName] = useState('')
  const [person, setPerson] = useState('')
  const [image, setImage] = useState('')
  const [ownedByMe, setOwnedByMe] = useState(false)

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { name, person, ownedByMe, image }
      await fetch('/api/item/create', {
        method: 'POST',
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
        <h1>Add item</h1>
        <form onSubmit={submitData}>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            type="text"
            value={name}
          />
          <input
            autoFocus
            onChange={(e) => setPerson(e.target.value)}
            placeholder="person"
            type="text"
            value={person}
          />
          <input
            autoFocus
            onChange={(e) => setImage(e.target.value)}
            placeholder="image"
            type="text"
            value={image}
          />
          <label htmlFor="ownership">Owned by me:</label>
          <input type="checkbox" checked={ownedByMe} onChange={() => setOwnedByMe(!ownedByMe)} />
          <input disabled={!name || !person} type="submit" value="Create" />
          <a onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </Layout>
    </>
  )
}
