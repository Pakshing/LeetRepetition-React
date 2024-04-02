import React, {useState,useCallback,useEffect} from 'react'
import { Button } from 'antd'
import LoginModal from '../components/Modal/LoginModal'
import './Home.module.css'
import logo from '../assets/logo.png'

const Home = () => {

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80vh', padding: '1rem', marginTop:'1rem' , backgroundColor: "#1A1F2B", }}>
            <div style={{display:'flex', justifyContent:'center' , alignItems:'center', flexDirection: 'column', flex: 1}}>
                <div style={{ maxWidth: '500px', textAlign: 'center', color:'white' }}> {/* Adjust the maxWidth as needed */}
                    <h1>Leetcode Scheduler</h1>
                    <p style={{lineHeight:'2',marginTop:'3rem', marginBottom:'3rem'}}>Welcome to Leetcode Scheduler! This app allows you to record your Leetcode question completion records. It provides scheduling based on the spaced-repetition learning method to help you maximize your learning efficiency. Start your journey to mastering Leetcode today!</p>
                </div>
                {localStorage.getItem("user_email") && localStorage.getItem("user_id") ?  <Button size='large'><a href='/question'><b>Let's grind!</b> </a></Button> : <LoginModal/>}
            </div>
            
            <div style={{ flex: 1,marginRight:'2rem' }}>
              <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px',  }} />
            </div>
            
        </div>
    )
}

export default Home