import React from 'react';

const HorarioRoutes = [
    {
        path: '/horario',
        component: React.lazy(() => import('./Horario')),
    },
]

export default HorarioRoutes;
