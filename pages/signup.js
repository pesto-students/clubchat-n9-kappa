import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import Form from '../components/form'
import Link from 'next/link'

const Signup = () => {
    useUser({ redirectTo: '/chat', redirectIfFound: true })

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
                debugger;
                Router.push('/login')
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
                Sign up to continue
      </h1>
            <div className="login">
                <Form isLogin={false} isResetPassword={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
            </div>
            <div className="secondary_text">
                <Link href="/login">
                    <a>I already have an account</a>
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
          color: #58a6ff;
        }
        .login_text {
            display: flex;
            justify-content: center;
            font-size: 24px;
            font-weight: 300;
            letter-spacing: -0.5px;
            margin-top: 50px;
          }
      `}</style>
        </Layout>
    )
}

export default Signup
