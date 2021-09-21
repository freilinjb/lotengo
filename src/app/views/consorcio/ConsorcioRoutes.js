import React from 'react'
import { authRoles } from 'app/auth/authRoles';

const consorcioRoutes = [
    {
        path: '/consorcio',
        component: React.lazy(() => import('./Consorcio')),
    },
    {
        path: '/consorcioPrueba',
        component: React.lazy(() => import('./ConsorcioPrueba')),
        auth: "mensajero"
    }
]

export default consorcioRoutes
