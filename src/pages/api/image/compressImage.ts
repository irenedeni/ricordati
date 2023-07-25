// api/image/compressImage
import Jimp from 'jimp'
import { NextApiRequest, NextApiResponse } from 'next'
import dataUriToBuffer from 'data-uri-to-buffer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { imageData } = req.body

  try {
    const imageBuffer = dataUriToBuffer(imageData)
    const resizedImage = await Jimp.read(imageBuffer)
    resizedImage.resize(160, 160)
    const resizedImageData = await resizedImage.getBase64Async(Jimp.MIME_PNG)
    res.status(200).json({ resizedImageData })
  } catch (error) {
    console.error('Error while processing the image:', error)
    res.status(500).json({ error: 'Error while processing the image' })
  }
}
