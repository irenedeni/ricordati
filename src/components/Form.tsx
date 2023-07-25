import { useState } from 'react'
import Router from 'next/router'
import Image from 'next/image'

type Props = {
  update?: boolean
  item?: {
    id: string
    name: string
    person: string
    ownedByMe: boolean
    image?: string | null
  }
}

export default function Form({ update, item }: Props): React.JSX.Element {
  const [name, setName] = useState(item?.name ?? '')
  const [person, setPerson] = useState(item?.person ?? '')
  const [ownedByMe, setOwnedByMe] = useState(item?.ownedByMe ?? false)
  const [selectedImage, setSelectedImage] = useState(
    item?.image ?? (null as any),
  )

  const submitData = async (e: any) => {
    e.preventDefault()
    if (selectedImage) {
      let resizedImage
      try {
        if (selectedImage.includes('data:image')) {
          const response = await fetch('/api/image/compressImage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageData: selectedImage }),
          })

          const { resizedImageData } = await response.json()
          resizedImage = resizedImageData
        }

        const body = {
          id: item?.id ?? null,
          name,
          person,
          ownedByMe,
          image: resizedImage ?? selectedImage,
        }
        const url = update ? `/api/item/update/${item?.id}` : '/api/item/create'

        await fetch(url, {
          method: update ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        await Router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateImage = async () => {
    if (name) {
      try {
        const response = await fetch(
          `/api/image/unsplash?name=${encodeURIComponent(name)}`,
        )
        if (!response.ok) {
          throw new Error('Failed to fetch data from Unsplash API')
        }

        const data = await response.json()
        setSelectedImage(data.urls.small)
      } catch (error) {
        console.error('Error while fetching data from Unsplash:', error)
      }
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
        {selectedImage && (
          <Image src={selectedImage} alt="Uploaded" width={80} height={80} />
        )}
        <label htmlFor="ownership">Owned by me:</label>
        <input
          type="checkbox"
          checked={ownedByMe}
          onChange={() => setOwnedByMe(!ownedByMe)}
        />
        <input disabled={!name || !person} type="submit" value={update ? 'Edit' : 'Create'} />
        <a onClick={() => Router.push('/')}>or Cancel</a>
      </form>
      {update && item?.id && (
        <button onClick={() => deleteItem(item?.id)}>Delete item</button>
      )}
      <div>OR:</div>
      <button onClick={generateImage} disabled={!name}>
        Generate image
      </button>
    </>
  )
}
