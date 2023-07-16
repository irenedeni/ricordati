import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

// PUT /api/update/:id
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { id } = req.body
    const itemId = id.toString()
    console.log('req API', req)
    console.log('res API', res)
    const result = await prisma.item.update({
        where: { id: itemId },
        data: req.body,
    })
    console.log('item API', result)
    res.json(result)
}