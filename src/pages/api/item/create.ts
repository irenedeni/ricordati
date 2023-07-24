import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { capitalize } from '../../../lib/functions'

// POST /api/item/create
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, person, ownedByMe, image } = req.body
  const result = await prisma.item.create({
    data: {
      name: capitalize(name),
      person: capitalize(person),
      ownedByMe,
      image,
    },
  })
  res.status(200).json(result) 
}
