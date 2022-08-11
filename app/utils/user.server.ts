import type { RegisterForm } from '../types/types.server'
import type { TeamMember } from '../types/types.user'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma.server'


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
      members: []
    },
  })
  return { id: newUser.id, email: user.email }
}


export const addTeamMember = async (email: string, member: TeamMember) => {

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (user) {

    const players = [...user.members, member]

    const updateUser = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        members: players
      }
    })

    return updateUser
  }






  return 'nani'
}