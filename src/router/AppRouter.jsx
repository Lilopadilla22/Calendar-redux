import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../auth/pages/Login'
import { CalendarPage } from '../calendar/pages/Calendar'
import { useAuthStore } from '../hooks/useAuthStore'
import { useEffect } from 'react'

export const AppRouter = () => {

    // const authState= 'not-authenticated'
    const {status, checkAuthToken} = useAuthStore()

    useEffect(() => {
        checkAuthToken()
    }, [])    

    if(status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            {
                (status=== 'not-authenticated')
                    ? 
                    (
                        <>
                            <Route path='/auth/*' element={<Login/>} />
                            <Route path='/*' element={<Navigate to='/auth/login' />} />
                        </>
                    )
                    : 
                    (
                        <>
                            <Route path='/' element={<CalendarPage/>} />
                            <Route path='/*' element={<Navigate to='/' />} />
                        </>
                    )
            }       
            
        </Routes>
    )
}
