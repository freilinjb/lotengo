import { authRoles } from './auth/authRoles';

export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
        auth: authRoles.maestro,
    },
    {
        label: 'Configuracion',
        type: 'label',
        auth: authRoles.maestro,
    },
    {
        name: 'Mantenimientos',
        icon: 'security',
        auth: authRoles.maestro,
        children: [
            {
                name: 'Usuarios',
                iconText: 'SI',
                path: '/usuario/admin',
                auth: authRoles.maestro
            },
            {
                name: 'Consorcios',
                iconText: 'SU',
                path: '/consorcio/admin',
                auth: authRoles.maestro,
            },
            {
                name: 'Terminal',
                iconText: 'assign',
                path: '/terminal/admin',
                auth: authRoles.maestro,
            },
            {
                name: 'Equipos',
                iconText: '404',
                path: '/usuario/admin',
                auth: authRoles.maestro,
            },
            {
                name: 'Asignacion',
                iconText: '404',
                path: '/usuario/admin',
                auth: authRoles.maestro,
            },
            {
                name: 'Horarios',
                icon: 'security',
                path: '/horario',
                auth: authRoles.maestro,
            },
        ],
    },
    {
        name: 'Ventas',
        icon: 'security',
        auth: authRoles.maestro,
        children: [
            {
                name: 'Loteria POS',
                iconText: 'SI',
                path: '/loteria/pos',
                auth: authRoles.maestro
            },
        ],
    },
    {
        name: 'Monitoreo',
        icon: 'security',
        auth: authRoles.maestro,
        children: [
            {
                name: 'Usuarios',
                iconText: 'SI',
                path: '/usuario/admin',
                auth: authRoles.maestro
            },
        ],
    },
    {
        name: 'Reportes',
        icon: 'security',
        auth: authRoles.maestro,
        children: [
            {
                name: 'Usuarios',
                iconText: 'SI',
                path: '/usuario/admin',
                auth: authRoles.maestro
            },
        ],
    },
    {
        label: 'Pages',
        type: 'label',
        auth: authRoles.maestro,

    },
    {
        name: 'Session/Auth',
        icon: 'security',
        auth: authRoles.maestro,

        children: [
            {
                name: 'Sign in',
                iconText: 'SI',
                path: '/session/signin',
                auth: authRoles.maestro,

            },
            {
                name: 'Sign up',
                iconText: 'SU',
                path: '/session/signup',
                auth: authRoles.maestro,

            },
            {
                name: 'Forgot Password',
                iconText: 'FP',
                path: '/session/forgot-password',
                auth: authRoles.maestro,

            },
            {
                name: 'Error',
                iconText: '404',
                path: '/session/404',
                auth: authRoles.maestro,

            },
        ],
    },
    
    {
        label: 'Components',
        type: 'label',
        auth: authRoles.maestro,

    },
    {
        name: 'Components',
        icon: 'favorite',
        badge: { value: '30+', color: 'secondary' },
        auth: authRoles.maestro,

        children: [
            {
                name: 'Auto Complete',
                path: '/material/autocomplete',
                iconText: 'A',
                auth: authRoles.maestro,
            },
            {
                name: 'Buttons',
                path: '/material/buttons',
                iconText: 'B',
                auth: authRoles.maestro,

            },
            {
                name: 'Checkbox',
                path: '/material/checkbox',
                iconText: 'C',
                auth: authRoles.maestro,

            },
            {
                name: 'Dialog',
                path: '/material/dialog',
                iconText: 'D',
                auth: authRoles.maestro,

            },
            {
                name: 'Drag and Drop',
                iconText: 'D',
                path: '/others/drag-and-drop',
                auth: authRoles.maestro,

            },
            {
                name: 'Expansion Panel',
                path: '/material/expansion-panel',
                iconText: 'E',
                auth: authRoles.maestro,

            },
            {
                name: 'Form',
                path: '/material/form',
                iconText: 'F',
                auth: authRoles.maestro,

            },
            {
                name: 'Icons',
                path: '/material/icons',
                iconText: 'I',
                auth: authRoles.maestro,

            },
            {
                name: 'Menu',
                path: '/material/menu',
                iconText: 'M',
                auth: authRoles.maestro,

            },
            {
                name: 'Progress',
                path: '/material/progress',
                iconText: 'P',
                auth: authRoles.maestro,

            },
            {
                name: 'Radio',
                path: '/material/radio',
                iconText: 'R',
                auth: authRoles.maestro,

            },
            {
                name: 'Switch',
                path: '/material/switch',
                iconText: 'S',
                auth: authRoles.maestro,

            },
            {
                name: 'Slider',
                path: '/material/slider',
                iconText: 'S',
                auth: authRoles.maestro,

            },
            {
                name: 'Snackbar',
                path: '/material/snackbar',
                iconText: 'S',
                auth: authRoles.maestro,

            },
            {
                name: 'Table',
                path: '/material/table',
                iconText: 'T',
                auth: authRoles.maestro,

            },
        ],
    },
    {
        name: 'Utilities',
        icon: 'format_list_bulleted',
        auth: authRoles.maestro,

        children: [
            {
                name: 'Color',
                path: '/utilities/color',
                iconText: 'C',
                auth: authRoles.admin,
            },
            {
                name: 'Spacing',
                path: '/utilities/spacing',
                iconText: 'S',
                auth: authRoles.admin,
            },
            {
                name: 'Typography',
                path: '/utilities/typography',
                iconText: 'T',
                auth: authRoles.maestro,

            },
            {
                name: 'Display',
                path: '/utilities/display',
                iconText: 'D',
                auth: authRoles.maestro,

            },
            {
                name: 'Position',
                path: '/utilities/position',
                iconText: 'P',
                auth: authRoles.maestro,

            },
            {
                name: 'Shadow',
                path: '/utilities/shadow',
                iconText: 'S',
                auth: authRoles.maestro,

            },
        ],
    },
    {
        name: 'Charts',
        icon: 'trending_up',
        auth: authRoles.maestro,

        children: [
            {
                name: 'Echarts',
                path: '/charts/echarts',
                iconText: 'E',
                auth: authRoles.maestro,

            }
        ],
    },
    {
        name: 'Usuarios',
        icon: 'trending_up',
        auth: authRoles.maestro,

        children: [
            {
                name: 'Usuario',
                path: '/usuario/admin',
                iconText: 'E',
                auth: authRoles.maestro,

            }
        ],
    },
    {
        name: 'Documentation',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/',
        auth: authRoles.maestro,

    },
]
