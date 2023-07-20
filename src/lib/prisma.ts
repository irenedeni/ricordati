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

export const getItem = async (id: string) => {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: String(id),
      },
    })
    if (item) {
      return {
        ...item,
        createdAt: item.createdAt.toString(),
        updatedAt: item.updatedAt.toString(),
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error retrieving item from Prisma:', error)
    return null
  }
}

export default prisma
