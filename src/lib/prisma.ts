import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getItems = async (ownedByMe: boolean) => {
  try {
    return await prisma.item.findMany({
      where: { ownedByMe },
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error retrieving items from Prisma:', error)
    return []
  }
}

export default prisma
