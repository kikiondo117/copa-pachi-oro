import { prisma } from '../utils/prisma.server'
import { json } from '@remix-run/node';

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

  return json({teams: null})
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


