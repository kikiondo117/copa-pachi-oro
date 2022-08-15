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
      members: user.members,
      subs: user.subs,
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

export const addSub = async (email: string, member: TeamMemberInterface) => {

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (user) {
    const subs = [...user.subs, member]
    const updateUser = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        subs: subs
      }
    })
    return updateUser
  }
  return json({ error: 'user invalid' })
}

export const getTeams = async () => {
  const teams = await prisma.user.findMany()
  if (teams) {
    return teams
  }

  return []
}

export const getTeam = async (id: string) => {
  const team = await prisma.user.findUnique({
    where: { id: id }
  })

  return team
}

export const approveTeam = async (id: string) => {
  const team = await prisma.user.update({
    where: { id: id }, data: { isApproved: true }
  })

  return team
}