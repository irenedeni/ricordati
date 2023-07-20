import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

// DELETE /api/item/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query as { id: string }
  if (req.method === 'DELETE') {
    const item = await prisma.item.delete({
      where: { id: id },
    })
    res.json(item)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    )
  }
}
