import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername: true,
  },
  access: {
    read: ({ req: { user } }) => Boolean(user) && user!.role === 'admin',
    update: ({ req: { user } }) => Boolean(user) && user!.role === 'admin',
    create: ({ req: { user } }) => Boolean(user) && user!.role === 'admin',
    delete: ({ req: { user } }) => Boolean(user) && user!.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      hasMany: false,
      required: true,
      options: [
        {
          value: 'admin',
          label: 'Admin',
        },
        {
          value: 'moderator',
          label: 'Moderator',
        },
      ],
    },
  ],
}
