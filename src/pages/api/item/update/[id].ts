import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// PUT /api/item/update/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.body
  const result = await prisma.item.update({
    where: { id: id },
    data: req.body,
  })
  res.setHeader('X-Reload-Page', 'true')
  res.status(200).json(result)
}
