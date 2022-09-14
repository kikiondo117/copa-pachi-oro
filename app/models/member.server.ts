import type { TeamMemberInterface } from '../types/types.user'
import { prisma } from '../utils/prisma.server'
import  { Member  } from '@prisma/client'
import { json } from '@remix-run/node';



export const addTeamMember = async (email: string, member: Pick<Member, 'name'| 'rango'| 'rol' | 'capitan' | 'img'>) => {

  const user = await prisma.user.findUnique({
    where: { email }
  })


  if (user) {
    const updateUser = await prisma.member.create({
      data: { ...member, userId: user.id }
    })
    return updateUser
  }

  return json({ error: 'user invalid' })
}

export const updateTeamMember = async (memberId: string, member: TeamMemberInterface) => {
  const userUpdated = await prisma.member.update({
    where: { id: memberId }, data: { ...member }
  })

  if (userUpdated) return userUpdated

  return json({ error: 'Update User Error' })
}