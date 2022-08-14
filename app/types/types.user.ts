
export type TeamMemberInterface = {
  img: string
  name: string
  rango: string
  rol: string
  capitan: boolean
}

export type Team = {
  name: string
  region: string
  plataforma: string
  img: string
}

export type User = {
  id: string
  email: string
  password: string
  team: Team
  members: TeamMember[]
  subs: TeamMember[]
}