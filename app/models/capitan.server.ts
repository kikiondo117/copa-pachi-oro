import { prisma } from '../utils/prisma.server'
import { json } from '@remix-run/node';

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

  return json({capitan: null})
}
