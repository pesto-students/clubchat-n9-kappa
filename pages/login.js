import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Layout from '../components/layout'
import Form from '../components/form'
import { useUser } from '../lib/hooks'
import Link from 'next/link';
import Image from "next/image";
import Logo from "../public/logo.svg";
import Loader from 'react-loader';

const Login = () => {
  const router = useRouter();
  const { finished, hasUser = false, user, error } = useUser();
  const [errorMsg, setErrorMsg] = useState('')

  if (finished) {
    if (hasUser && user) {
      router.push('/chat');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.status === 200) {
        router.push('/chat')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (<>{
    finished ?
      <>
        <Layout>
          < div className="logincontainer" >
            <div className="login-logocontainer">
              <Image src={Logo} alt="logo_icon" layout="intrinsic" />
            </div>
            <h1 className="login_text">
              Sign in to Clubchat
            </h1>
            <div className="login">
              <Form isLogin isResetPassword={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
            </div>
            <div className="secondary_text">
              <span>New to Clubchat?</span>
              <Link href="/signup">
                <a> Create an account</a>
              </Link>
            </div>
          </div >
          <style jsx>{`
      .logincontainer {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }
      .login-logocontainer {
        width: 80%;
        height: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .login_text {
        display: flex;
        justify-content: center;
        font-size: 24px;
        font-weight: 300;
        letter-spacing: -0.5px;
        margin-top: 30px;
        color: #a2a2a5;
      }
      .login {
        width: 80%;
        margin: 0 auto;
        padding: 1rem;
        margin-top: 15px;
      }
      .secondary_text {
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-top: 15px;
        padding: 1rem;
      }
      .secondary_text > span {
        font-size: 1.25vw;
        font-weight: 300;
        letter-spacing: -0.5px;
        color: #a2a2a5;
      }
      .secondary_text > a {
        font-size: 1.25vw;
        font-weight: 300;
        letter-spacing: -0.5px;
        color: #1597e5;
        margin-left: 5px;
      }
      @media screen and (max-width: 770px) {
        .secondary_text > span {
          font-size: 4.25vw;
        }
        .secondary_text > a {
          font-size: 4.25vw;
        }
      }
      `}</style>
        </Layout>
      </>
      : <Loader />}
  </>
  )
}

export default Login
