// NOTE Hunter has a slightly different setup between prisma and lucia
// REF: https://youtu.be/UMpKaZy0Rpc?t=398
import lucia from 'lucia-auth'
import prisma from '@lucia-auth/adapter-prisma'
import { dev } from '$app/environment'

import prismaClient from './database'

export const auth = lucia({
	adapter: prisma(prismaClient),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: (userData) => {
    // We return what we want our User object looks like
		return {
			userId: userData.id,
			username: userData.username,
		}
	},
})

export type Auth = typeof auth
