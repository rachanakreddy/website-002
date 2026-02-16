import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function resetPassword() {
  const payload = await getPayload({ config })

  // Find the user
  const users = await payload.find({
    collection: 'users',
    where: {
      email: {
        contains: 'rach',
      },
    },
  })

  if (users.docs.length === 0) {
    console.log('No user found with "rach" in email')
    process.exit(1)
  }

  for (const user of users.docs) {
    console.log(`Resetting password for user: ${user.email}`)

    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: 'website002-scrambledeggs',
        lockUntil: null,
        loginAttempts: 0,
      } as any,
    })

    console.log(`Password reset for ${user.email}!`)
  }

  process.exit(0)
}

resetPassword().catch((err) => {
  console.error('Error resetting password:', err)
  process.exit(1)
})
