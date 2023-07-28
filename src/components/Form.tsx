import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '@/styles/Form.module.css'
import Button from './Button'

type Props = {
  update?: boolean
  itemsType: string
  item?: {
    id: string
    name: string
    person: string
    ownedByMe: boolean
    image?: string | null
  }
}

export default function Form({
  update,
  item,
  itemsType,
}: Props): React.JSX.Element {
  const mine = itemsType === 'lent' ? true : false
  const [name, setName] = useState(item?.name ?? '')
  const [person, setPerson] = useState(item?.person ?? '')
  const [ownedByMe, setOwnedByMe] = useState(item?.ownedByMe ?? mine)
  const [selectedImage, setSelectedImage] = useState(
    item?.image ?? (null as any),
  )
  const router = useRouter()

  const submitData = async (e: any) => {
    e.preventDefault()
    let resizedImage
    try {
      if (selectedImage && selectedImage.includes('data:image')) {
        const response = await fetch('/api/image/compressImage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageData: selectedImage }),
        })

        const { resizedImageData } = await response.json()
        resizedImage = resizedImageData
      }

      const image = resizedImage
        ? resizedImage
        : selectedImage
        ? selectedImage
        : null

      const body = {
        id: item?.id ?? null,
        name,
        person,
        ownedByMe,
        image: image,
      }
      const url = update ? `/api/item/update/${item?.id}` : '/api/item/create'

      await fetch(url, {
        method: update ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
    router.push('/', undefined, { shallow: false })
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
    } else return alert('Enter an item to generate an image')
  }

  const deleteItem = async (itemId: string): Promise<void> => {
    await fetch(`/api/item/${itemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    router.push('/', undefined, { shallow: false })
  }

  const nameLabel = mine ? "I'm lending out my..." : 'I am borrowing...'
  const personLabel = mine ? 'To...' : 'From...'

  return (
    <div className={styles.formContainer}>
      <form onSubmit={submitData} className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          {nameLabel}
        </label>
        <input
          autoFocus
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
        />
        <label htmlFor="person" className={styles.label}>
          {personLabel}
        </label>
        <input
          autoFocus
          onChange={(e) => setPerson(e.target.value)}
          type="text"
          value={person}
        />
        {update && (
          <div className={styles.ownership}>
            <label htmlFor="ownership" className={styles.label}>
              Mine?:
            </label>
            <input
              type="checkbox"
              checked={ownedByMe}
              onChange={() => setOwnedByMe(!ownedByMe)}
            />
            <div className={styles.outer}></div>
            <div className={styles.inner}></div>
          </div>
        )}
        <div className={styles.imageContainer}>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Uploaded"
              width={80}
              height={80}
              quality={75}
              className={styles.previewImage}
            />
          )}
          <label
            htmlFor="image"
            className={`${styles.label} ${styles.generateButton}`}
          >
            Upload image ⬆️
            <input
              type="file"
              id="image"
              accept="image/*"
              capture={false}
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className={styles.buttonsContainer}>
          {update && item?.id && (
            <Button
              action={() => deleteItem(item?.id)}
              text="Delete item"
              warning
              secondary
              className={styles.btn}
            />
          )}
          <input
            disabled={!name || !person}
            type="submit"
            value={update ? 'Save changes' : 'Save item'}
            className={styles.btn}
          />
          <Button
            action={() => router.push('/', undefined, { shallow: false })}
            text="Cancel"
            secondary
            className={styles.btn}
          />
        </div>
      </form>
      <div
        className={`${styles.generateButtonContainer} ${
          update ? styles.update : styles.create
        }`}
      >
        or
        <div onClick={generateImage} className={styles.generateButton}>
          Generate image 🔄
        </div>
      </div>
    </div>
  )
}
