import React from 'react'
import LoginButton from '../components/Button/LoginButton'

function Home() {
  return (
    <div>Welcome {localStorage.getItem("user_email")} <LoginButton/></div>
    
  )
}

export default Home