import React from 'react';
import { authRoles } from '../../auth/authRoles';

const usuarioRoutes = [
    {
        path: '/loteria/pos',
        component: React.lazy(() => import('./LoteriaPos')),
        auth: authRoles.banquero,
    }
]

export default usuarioRoutes
