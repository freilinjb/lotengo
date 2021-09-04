import React from 'react'

const consorcioRoutes = [
    {
        path: '/consorcio',
        component: React.lazy(() => import('./Consorcio')),
    },
    {
        path: '/consorcioPrueba',
        component: React.lazy(() => import('./ConsorcioPrueba')),
    }
]

export default consorcioRoutes
