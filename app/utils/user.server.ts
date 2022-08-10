import type { RegisterForm, TeamMember } from '../types/types.server'
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
        members: []
      },
    },
  })
  return { id: newUser.id, email: user.email }
}


export const updateUser = async (email: string, member: any) => {

  // Al inicio no hay team members
  // const updateUser = await prisma.user.update({
  //   where: {
  //     email: email
  //   },
  //   data: {
  //     team: {
  //       members: []
  //     }
  //   }
  // })
  // 

  return { saludo: 'hola' }
}