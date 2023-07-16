import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { name, person, ownedByMe } = req.body

    const result = await prisma.item.create({
        data: {
            name,
            person,
            ownedByMe,
        },
    })
    res.json(result)
    console.log('result', result)
}