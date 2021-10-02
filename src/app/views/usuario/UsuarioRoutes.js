import React from 'react';
import { authRoles } from '../../auth/authRoles';

const usuarioRoutes = [
    {
        path: '/usuario/admin',
        component: React.lazy(() => import('./Usuario')),
        auth: authRoles.maestro,
    }
]

export default usuarioRoutes
