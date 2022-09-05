import type { RegisterForm } from '../types/types.server'
import bcrypt from 'bcryptjs'
import { prisma } from '../utils/prisma.server'

export const createUser = async (user: RegisterForm) => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: passwordHash,
        team: {
          name: user.team,
          region: user.region,
          plataforma: user.plataforma,
          img: 'img-url',
        },
        isApproved: false,
        admin: false
      },
    })
    return { id: newUser.id, email: user.email }
  }

  
export const getOwner = async (id: string) => {
  return prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true, email: true,
        team: true,
        members: true, subs: true,
        isApproved: true, admin: true,
      },
  })
}
