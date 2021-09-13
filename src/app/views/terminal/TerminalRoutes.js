import React from 'react';

const TerminalRoutes = [
    {
        path: '/terminal/admin',
        component: React.lazy(() => import('./Terminal')),
    },{
        path: '/terminal/add',
        component: React.lazy(() => import('./TerminalRegistro')),
    },
]

export default TerminalRoutes;
