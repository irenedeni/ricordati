// api/image/unsplash
import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  const name = req.query.name as string
  if (!name) {
    return res
      .status(400)
      .json({ error: 'You must provide a search query (item name).' })
  }

  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&query=${encodeURIComponent(
    name,
  )}`

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch data from Unsplash API')
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error while fetching data from Unsplash:', error)
    res.status(500).json({ error: 'Failed to fetch data from Unsplash API' })
  }
}
