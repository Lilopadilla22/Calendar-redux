import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"


export const useAuthStore = () => {

  const dispatch = useDispatch()
  const { status, user, errorMessage } = useSelector(state => state.auth)

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking())
    try {
      const res = await calendarApi.post('/auth', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name: res.data.name, uid: res.data.uid }))

    } catch (error) {
      console.log({ error })
      dispatch(onLogout('credenciales incorrectas'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 100);
    }
  }

  const startRegister = async({name, email, password}) => {
    dispatch(onChecking())
    try {
      const {data} = await calendarApi.post('/auth/new', { name, email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name: data.name, uid: data.uid }))

    } catch (error) {
      console.log({error})
      dispatch(onLogout(error.response.data?.msg || 'usuario ya existe'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 100);
    }
  }

  const checkAuthToken = async () => {

    const token = localStorage.getItem('token')
    if(!token) return dispatch(onLogout())

    try {
      const {data} = await calendarApi.get('/auth/renew')
      
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name: data.name, uid: data.uid }))
      
    } catch (error) {
      console.log({error})
      localStorage.clear()
      dispatch(onLogout())
      
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout())
  }


  return { status, user, errorMessage, startLogin, startRegister, checkAuthToken, startLogout }
}
