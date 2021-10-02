import React from 'react'
import { authRoles } from '../../auth/authRoles'

const dashboardRoutes = [
    {
        path: '/dashboard',
        component: React.lazy(() => import('./Analytics')),
        auth: authRoles.maestro,
    }
]

export default dashboardRoutes
