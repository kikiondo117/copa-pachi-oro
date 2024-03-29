import type { TeamMemberInterface } from './types.user';

export type RegisterForm = {
  email: string
  password: string
  confirm_password: string
  team: string
  region: string,
  plataforma: string,
  img?: string,
  members: TeamMemberInterface[]
  subs: TeamMemberInterface[]
  isApproved: boolean
}


export type LoginForm = {
  email: string
  password: string
}