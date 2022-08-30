import type { RegisterForm } from '../types/types.server'
import type { TeamMemberInterface } from '../types/types.user'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma.server'
import { json } from '@remix-run/node';


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

export const addTeamMember = async (email: string, member: TeamMemberInterface) => {

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

export const updateTeamMember = async (memberId: string, member: TeamMemberInterface) => {
  const userUpdated = await prisma.member.update({
    where: { id: memberId }, data: { ...member }
  })

  if (userUpdated) return userUpdated

  return json({ error: 'Update User Error' })
}

export const updatedSub = async (subId: string, member: TeamMemberInterface) => {

  const subUpdated = await prisma.sub.update({
    where: { id: subId }, data: { ...member }
  })

  if (subUpdated) return subUpdated

  return json({ error: 'Sub update error' })
}

export const getTeams = async () => {
  const teams = await prisma.user.findMany()
  if (teams) {
    return teams
  }

  return []
}

export const getTeamsApproved = async () => {
  const teams = await prisma.user.findMany({
    where: {
      isApproved: true
    }
  })

  if (teams) {
    return teams
  }

  return []
}

export const getTeam = async (id: string) => {
  const team = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true, email: true,
      team: true,
      members: true, subs: true,
      isApproved: true, admin: true,
    },
  })

  return team
}

export const approveTeam = async (id: string) => {
  const team = await prisma.user.update({
    where: { id: id }, data: { isApproved: true }
  })

  return team
}