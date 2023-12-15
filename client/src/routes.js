import Account from './pages/account/Account'
import Auth from './pages/auth/Auth'
import Main from './pages/dataPage/dataPage'

export const publicRoutes = [
    {
        path:  '/account',
        Component: Account
    },
    {
        path:  '/',
        Component: Main
    },
    {
        path:  '/login',
        Component: Auth
    },
    {
        path:  '/registration',
        Component: Auth
    },
]

