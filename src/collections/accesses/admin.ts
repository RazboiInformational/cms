import type { Access } from 'payload'

export const adminAccess: Access = ({ req: { user } }) => Boolean(user) && user!.role === 'admin'
