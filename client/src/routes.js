import Account from './pages/account/Account'
import Auth from './pages/auth/Auth'
import Main from './pages/dataPage/dataPage'
import {LOGIN_ROUTE, ACCOUNT_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE} from "./utils/consts";

export const authRoutes = [
    {
        path:  ACCOUNT_ROUTE,
        Component: Account
    },
]
export const publicRoutes = [
    {
        path:  MAIN_ROUTE,
        Component: Main
    },
    {
        path:  LOGIN_ROUTE,
        Component: Auth
    },
    {
        path:  REGISTRATION_ROUTE,
        Component: Auth
    },
]

