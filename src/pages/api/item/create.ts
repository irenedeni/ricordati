import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// POST /api/item/create
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, person, ownedByMe } = req.body

  const result = await prisma.item.create({
    data: {
      name: capitalize(name),
      person: capitalize(person),
      ownedByMe,
    },
  })
  res.json(result)
}
