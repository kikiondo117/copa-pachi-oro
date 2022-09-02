import type { TeamMemberInterface } from '../types/types.user'
import { prisma } from '../utils/prisma.server'
import { json } from '@remix-run/node';

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
  const teams = await prisma.user.findMany({
    select: {
      id: true, email: true,
      team: true, members: true,
      isApproved: true, admin: true,
      subs: true
    }
  })

  if (teams) {
    return teams
  }

  return []
}

export const getTeamsApproved = async () => {
  const teams = await prisma.user.findMany({
    where: {
      isApproved: true
    },
    select: {
      id: true, email: true,
      team: true,
      members: true, subs: true,
      isApproved: true, admin: true,
    }
  })

  if (teams) {
    return teams
  }

  return []
}

export const getOwner = async (id: string) => {
  const owner = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true, email: true,
      team: true,
      members: true, subs: true,
      isApproved: true, admin: true,
    },
  })

  return owner
}

export const approveTeam = async (email: string) => {
  const approvedStatus = await prisma.user.findFirst({ where: { email } })

  const team = await prisma.user.update({
    where: { email }, data: { isApproved: !approvedStatus?.isApproved }
  })

  return team
}

export const deleteTeam = async ({ id }: { id: string }) => {
  await prisma.sub.deleteMany({ where: { userId: id } })
  await prisma.member.deleteMany({ where: { userId: id } })
  const deleteUser = await prisma.user.delete({ where: { id } })

  return deleteUser
}

export const getCapitan = async ({id}: {id:string}) => {

  const member  = await prisma.member.findMany({
    where: {userId: id, capitan: true}
  })

  const sub = await prisma.sub.findMany({
    where: {userId: id, capitan: true}
  })

  if(member.length > 0){
    return member
  }

  if(sub.length > 0){
    return sub
  }

  return null
}

export const saveTeam =async ({id, body}: {
  id:string, body: {team: string, region: string, plataforma: string}
}) => {

  if(body.team !== undefined && body.region !== undefined && body.plataforma !== undefined ){
    const teamUpdated = await prisma.user.update( 
      {
        where: { id }, 
        data: { 
          team: {
            name: body.team,
            region: body.region,
            plataforma: body.plataforma,
            img: ''
          }  
        }
      }
    )

    return teamUpdated
  }


}


