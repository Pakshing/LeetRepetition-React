import React, { useState,useCallback } from 'react';
import { Button, Modal } from 'antd';
import  { useAppDispatch } from '../../app/store';
import {User} from '../../pages/User'
import { createUser } from '../../store/features/user/UserSlice';
import { getGithubUserEmail,fetchGoogleUserEmailByAccessToken } from '../../store/features/user/OauthUserApi';
import {
  LoginSocialGoogle,
  LoginSocialGithub,
  IResolveParams
} from 'reactjs-social-login'

import {
  GoogleLoginButton,
  GithubLoginButton,
} from 'react-social-login-buttons'

const LoginModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const REDIRECT_URI = 'http://localhost:3000/table';


  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onLocalGenerateUser = () => {
    const userConfirmed = window.confirm("This is a one time only local account, no data will be reserved after logout. Are you sure you want to proceed?");
    if(userConfirmed) dispatch(createUser({email:"",loginMethod:"Local"}));
    
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Login
      </Button>
      <Modal
        open={open}
        title="Login"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type='primary' danger key="back" onClick={handleCancel}>
            <b>Cancel</b>
          </Button>,
        ]}
      >
        <div style={{display:"flex",justifyContent:"center",gap:"1rem"}}>
        <LoginSocialGoogle
              isOnlyGetToken = {true}
              client_id={process.env.REACT_APP_GG_APP_ID || ''}
              onResolve={async ({ provider, data }: IResolveParams) => {
                if(data){
                  const email = await fetchGoogleUserEmailByAccessToken(data.access_token);
                  if(email !== "Failure"){
                    dispatch(createUser({email:email,loginMethod:"Google"}));
                  }
                }
              }}
              onReject={(err) => {
                console.log(err)
              }}
            >
              <Button size="large" style={{ backgroundColor: '#4285F4', color: '#FFFFFF' }}> <b>Google</b></Button>
          </LoginSocialGoogle>

              <Button  size="large" onClick={onLocalGenerateUser}>
                <b>Generate Local Only User</b>
              </Button>
        </div>
       
      </Modal>
    </>
  );
};

export default LoginModal;