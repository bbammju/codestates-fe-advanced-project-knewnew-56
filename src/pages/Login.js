import axios from "axios";
import React, {useState} from "react";
import styled from "styled-components";
import logo from '../assets/knew.png'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailHandler = (e) => {
		setEmail(e.target.value);
	};
  const passwordHandler = (e) => {
		setPassword(e.target.value);
	};
  const loginHandler = async () => {
    const token = await axios.post('https://dev.knewnnew.com/auth/login/', {email: email, password: password, providerType: 'email'})
    if (token.data.accessToken) {
      window.localStorage.setItem('accessToken', token.data.accessToken)
      navigate('/main')
    }
    else {
      alert('로그인에 실패했습니다.')
    }
  }
  return(
    <Container>
      <LoginContainer>
        <Logo src={logo}/>
        <Email onKeyUp={emailHandler}/>
        <Password onKeyUp={passwordHandler}/>
        <Loginbtn onClick={() => {loginHandler()}}>로그인</Loginbtn>
      </LoginContainer>
    </Container>
  )
}

export default Login;

const Container = styled.div`
  width: 45vw;
  height: 100vh;
  display: flex;
  margin: auto;
`

const LoginContainer = styled.div`
  width: 45vw;
  height: 65vh;
  display: flex;
  flex-direction: column;
  margin: auto;
  border: 1px solid;
`

const Logo = styled.img`
  width: 16vw;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
`

const Email = styled.input`
  width: 30vw;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px;
`
const Password = styled.input`
  width: 30vw;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px;
`

const Loginbtn = styled.button`
  width: 15vw;
  height: 5vh;
  margin: 25px;
`