import { useState } from 'react';
import Router from 'next/router';
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import Form from '../components/form';
import Link from 'next/link';
import Image from "next/image";
import Logo from "../public/logo.svg";

const Signup = () => {
  const { finished, hasUser = false, user, error } = useUser();
  if (finished) {
    if (hasUser && user) {
      Router.push('/chat');
    }
  }

    const [errorMsg, setErrorMsg] = useState('')

    const passwordpattern = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.{6,})') //Minimum six characters, at least one letter and one number

    async function handleSubmit(e) {
        e.preventDefault()

        if (errorMsg) setErrorMsg('')

        const body = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            username: e.currentTarget.username.value
        }

        if (body.password !== e.currentTarget.rpassword.value) {
            setErrorMsg(`The passwords don't match`)
            return
        }

        console.log(passwordpattern.test(body.password))
        if (!passwordpattern.test(body.password)) {
            setErrorMsg(`The passwords must be at least 6 digit in length and contains at least one lowercase and one uppercase letter.`)
            return;
        }

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            if (res.status === 200) {
                  const res1 = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                  })
                  if (res1.status === 200) {
                    Router.push('/chat')
                  } else {
                    Router.push('/login')
                    throw new Error(await res.text())
                  }
               
            } else {
                throw new Error(await res.text())
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
            setErrorMsg(error.message)
        }
    }

    return (
        <Layout>
            <div className="logincontainer">
                <div className="login-logocontainer">
                    <Image src={Logo} alt="logo_icon" layout="intrinsic" />
                </div>
                <h1 className="login_text">
                    Sign up to continue
                </h1>
                <div className="login">
                    <Form isLogin={false} isResetPassword={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
                </div>
                <div className="secondary_text">
                    <span>I already have an account</span>
                    <Link href="/login">
                        <a>Click to Login</a>
                    </Link>
                </div>
            </div>
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
    )
}

export default Signup
