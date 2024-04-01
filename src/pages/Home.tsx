import React, {useState,useCallback} from 'react'
import LoginButton from '../components/Button/LoginButton'
import { useAppSelector, useAppDispatch } from '../app/store'

const Home = () => {
  
  const REDIRECT_URI = window.location.href;
  const user = useAppSelector((state) => state.userStore.user);
  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState<any>()

  const onLoginStart = useCallback(() => {
    alert('login start')
  }, [])

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('')
    alert('logout success')
  }, [])
  return (
    <div>
      Email: {localStorage.getItem("user_email")}
      User Id: {localStorage.getItem("user_id")}
      Login Method: {localStorage.getItem("login_method")}
      <>
      {user?  <div>
        <h1>User</h1>
        <p>{user.email}</p>
        <p>{user.id}</p>
        <p>{user.login_method}</p>
      </div>:<div>
        <h1>User</h1>
        <p>No User</p>
      </div>}
      </>
    </div>
    
  )
}

export default Home