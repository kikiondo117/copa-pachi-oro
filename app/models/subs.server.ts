import type { TeamMemberInterface } from '../types/types.user';
import { prisma } from '../utils/prisma.server'
import { json } from '@remix-run/node';

export const addSub = async (email: string, member: TeamMemberInterface) => {

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (user) {
    const updateUser = await prisma.sub.create({
      data: { ...member, userId: user.id }
    })
    return updateUser
  }
  return json({ error: 'user invalid' })
}

export const updatedSub = async (subId: string, member: TeamMemberInterface) => {

  const subUpdated = await prisma.sub.update({
    where: { id: subId }, data: { ...member }
  })

  if (subUpdated) return subUpdated

  return json({ error: 'Sub update error' })
}