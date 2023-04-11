import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'

import { auth } from '$lib/server/auth'
import { authSchema } from '$lib/zod/schema'

export const load = async ({ locals }) => {
	const session = await locals.validate()
	if (session) throw redirect(302, '/')

	const form = await superValidate(null, authSchema)
	return { form }
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData()
		const form = await superValidate(data, authSchema)

		if (!form.valid) {
			return fail(400, { form })
		}

		try {
			const key = await auth.useKey(
				'username',
				form.data.username,
				form.data.password
			)
			const session = await auth.createSession(key.userId)
			locals.setSession(session)
		} catch (error) {
			return fail(400, { form })
		}
	},
}
