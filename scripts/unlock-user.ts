import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function unlockUser() {
  const payload = await getPayload({ config })

  // Find and update the user to unlock them
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
    console.log(`Unlocking user: ${user.email}`)

    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        lockUntil: null,
        loginAttempts: 0,
      } as any,
    })

    console.log(`User ${user.email} has been unlocked!`)
  }

  process.exit(0)
}

unlockUser().catch((err) => {
  console.error('Error unlocking user:', err)
  process.exit(1)
})
