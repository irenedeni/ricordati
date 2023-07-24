import { useState } from 'react'
import Router from 'next/router'
import { Layout } from '@/components'
import Image from 'next/image'

export default function Create() {
  const [name, setName] = useState('')
  const [person, setPerson] = useState('')
  const [ownedByMe, setOwnedByMe] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null as any)

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { name, person, ownedByMe, image: selectedImage }
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

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
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
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            capture={true} // Enables the camera on mobile devices
            onChange={handleImageChange}
          />
          {selectedImage && <Image src={selectedImage} alt="Uploaded" width={80} height={80} />}
          <label htmlFor="ownership">Owned by me:</label>
          <input
            type="checkbox"
            checked={ownedByMe}
            onChange={() => setOwnedByMe(!ownedByMe)}
          />
          <input disabled={!name || !person} type="submit" value="Create" />
          <a onClick={() => Router.push('/')}>or Cancel</a>
        </form>
      </Layout>
    </>
  )
}