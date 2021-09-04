import React from 'react'

const usuarioRoutes = [
    {
        path: '/usuario/admin',
        component: React.lazy(() => import('./Usuario')),
    }
]

export default usuarioRoutes
