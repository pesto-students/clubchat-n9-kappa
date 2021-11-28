import { useState } from 'react'
import Router from 'next/router'
import Layout from '../components/layout'
import Form from '../components/form'
import { useUser } from '../lib/hooks'
import Link from 'next/link'

const Login = () => {
  const user = useUser({ redirectTo: '/login', redirectIfFound: true })
  const [errorMsg, setErrorMsg] = useState('')

  if (user) {
    Router.push('/chat')
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
          debugger;
          Router.push('/chat')
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
      <h1 className="login_text">
          Sign in to Clubchat
      </h1>
      <div className="login">
        <Form isLogin isResetPassword={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <div className="secondary_text">
      New to Clubchat?
        <Link href="/signup">
            <a className="color_light_blue"> Create an account</a>
        </Link>
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-top: 15px;
        }
        .secondary_text {
            max-width: 21rem;
            margin: 0 auto;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-top: 15px;
          }

          .color_light_blue {
            color: #58a6ff;
          }

          .login_text {
            display: flex;
            justify-content: center;
            font-size: 24px;
            font-weight: 300;
            letter-spacing: -0.5px;
            margin-top: 100px;
          }
      `}</style>
    </Layout>
  )
}

export default Login
