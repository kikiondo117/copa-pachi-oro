import type { RegisterForm, LoginForm } from './types.server';
import { prisma } from './prisma.server';
import { redirect, createCookieSessionStorage, json } from '@remix-run/node';
import { createUser } from './user.server';
import bcrypt from 'bcryptjs';

export async function register(user: RegisterForm) {
  const exist = await prisma.user.count({ where: { email: user.email } })


  if (exist) {
    return json({ error: `User already exists with that email` }, { status: 400 })
  }

  const newUser = await createUser(user)

  if (!newUser) {
    return json(
      {
        error: `Something went wrong trying to create a new user.`,
        fields: { email: user.email, password: user.password },
      },
      { status: 400 },
    )
  }

  return createUserSession(newUser.id, '/team')
}

export async function login({ email, password }: LoginForm) {

  const user = await prisma.user.findUnique({ where: { email } })

  console.log('USER', user)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return json({ error: `Incorrect login` }, { status: 400 })
  }

  return createUserSession(user.id, '/team')
}

// Function to handle sessions in Remix 
const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

/**
 * secure: If true, only allows the cookie to be sent over HTTPS.
 * secrets: The session's secret.
 * sameSite: Specifies whether or not the cookie may be sent over cross-site requests.
 * path: A path that must exist in the URL to send a cookie.
 * httpOnly: If true, does not allow JavaScript to access the cookie.
 */
const storage = createCookieSessionStorage({
  cookie: {
    name: 'session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  }
})

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession()
  session.set('userId', userId)

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    }
  })
}

export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const session = await getUserSession(request)
  const userId = session.get('userId')

  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }

  return userId
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

async function getUserId(request: Request) {
  const session = await getUserSession(request)
  const userId = session.get('userId')

  if (!userId || typeof userId !== 'string') return null

  return userId
}

export async function getUser(request: Request) {
  const userId = await getUserId(request)

  if (typeof userId !== 'string') return null

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, profile: true },
    })
    return user

  } catch {
    throw logout(request)
  }

}

export async function logout(request: Request) {
  const session = await getUserSession(request)
  return redirect('/login', {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  })
}
