import React from 'react'
import { authRoles } from '../../auth/authRoles'

const dashboardRoutes = [
    {
        path: '/dashboard',
        component: React.lazy(() => import('./Analytics')),
        auth: "MASTER",
    }
]

export default dashboardRoutes
