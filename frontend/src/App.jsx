import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import SettingPage from './pages/SettingPage'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth)
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth)
  const authUser = useAuthStore((state) => state.authUser)
  const connectSocket = useAuthStore((state) => state.connectSocket)
  const disconnectSocket = useAuthStore((state) => state.disconnectSocket)
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  useEffect(() => {
    if (authUser) {
      connectSocket()
      return
    }

    disconnectSocket()
  }, [authUser, connectSocket, disconnectSocket])
  if(isCheckingAuth){
    return <div>Loading...</div>
  }

  return (
    <div> 
      <Routes>
        <Route path='/' element={authUser?  <HomePage/>: <SignUpPage/>}/>
        <Route path='/login' element={!authUser?  <LoginPage/>: <HomePage/>}/>
        <Route path='/signup' element={!authUser?  <SignUpPage/>: <HomePage/>}/>
        <Route path='/profile' element={authUser? <ProfilePage/>: <SignUpPage/>}/>
        <Route path='/settings' element={<SettingPage/>}/>
      </Routes>
    </div>
  )
}

export default App