import React, {useState,useCallback,useEffect} from 'react'
import { Button } from 'antd'
import LoginModal from '../components/Modal/LoginModal'
import './Home.module.css'
import logo from '../assets/logo.png'
import Cookies from 'js-cookie'

const Home = () => {
    
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '75vh', padding: '1rem', marginTop:'1rem' , backgroundColor: "#1A1F2B", }}>
            <div style={{display:'flex', justifyContent:'center' , alignItems:'center', flexDirection: 'column', flex: 1}}>
                <div style={{ maxWidth: '500px', textAlign: 'center', color:'white' }}> {/* Adjust the maxWidth as needed */}
                    <h1>Leetcode Scheduler</h1>
                    <p style={{lineHeight:'2',marginTop:'3rem', marginBottom:'3rem'}}>Introducing Leetcode Scheduler! This application facilitates the tracking of your Leetcode question completions and offers scheduling based on spaced-repetition learning techniques to optimize your learning process. Embark on your journey to Leetcode mastery today!</p>
                </div>
                {Cookies.get('token') ?  <Button size='large'><a href='/question'><b>Let's grind!</b> </a></Button> : <LoginModal/>}
            </div>
            
            <div style={{ flex: 1,marginRight:'2rem' }}>
              <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px',  }} />
            </div>
            
        </div>
    )
}

export default Home