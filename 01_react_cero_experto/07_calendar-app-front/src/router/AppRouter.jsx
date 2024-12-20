import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { useAuthStore } from "../hooks/useAuthStore"
import { useEffect } from "react"

export const AppRouter = () => {

  const { status, startCheckAuthToken} = useAuthStore()

  useEffect(() => {
    startCheckAuthToken()
  },[])

  if(status === 'checking'){
     return <p>Cargando ...</p>
  }

  return (
    <Routes>
        {
            (status === 'not-authenticated')
            ?(
              <>
                <Route path="/auth/*" element={ <LoginPage />}/>
                <Route path="/*" element={ <Navigate to='/auth/login' />}/>
              </>
            ):(
              <>
                <Route path="/" element={ <CalendarPage />}/>
                <Route path="/*" element={ <Navigate to='/' />}/>
              </>
            ) 
        }
        
    </Routes>
  )
}
