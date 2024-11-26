import type { CollectionConfig } from 'payload'
import { adminAccess } from './accesses/admin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername: true,
  },
  access: {
    read: adminAccess,
    update: adminAccess,
    create: adminAccess,
    delete: adminAccess,
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
