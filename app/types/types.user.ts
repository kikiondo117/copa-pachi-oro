
export type TeamMemberInterface = {
  img: string
  name: string
  rango: string
  rol: string
  capitan: boolean
}

export type TeamInterface = {
  name: string
  region: string
  plataforma: string
  img: string
}

export type UserInterface = {
  id: string
  email: string
  password: string
  team: TeamInterface
  members: TeamMemberInterface[]
  subs: TeamMemberInterface[]
  admin: boolean
  isApproved: boolean
}