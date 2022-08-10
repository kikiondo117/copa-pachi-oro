export type RegisterForm = {
  email: string
  password: string
  confirm_password: string
  team: string
  region: string,
  plataforma: string,
  img?: string,
  members: TeamMember[]
}

export type TeamMember = {
  img: string
  name: string
  rango: string
  rol: string
  capitan: string
}

export type LoginForm = {
  email: string
  password: string
}