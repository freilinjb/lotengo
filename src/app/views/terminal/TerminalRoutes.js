import React from 'react';

const TerminalRoutes = [
    {
        path: '/terminal',
        component: React.lazy(() => import('./Terminal')),
    },
]

export default TerminalRoutes;
