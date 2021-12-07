import { useState } from 'react'
import { useRouter } from "next/router";
import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import Form from '../components/form';

const Signup = () => {
  const router = useRouter();
  const { finished, hasUser = false, user, error } = useUser();
  if (finished) {
    if (hasUser && user) {
      router.push('/chat');
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
      const res = await fetch('/api/password_reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
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
      <div className="login">
        <Form isLogin={false} isResetPassword errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-top: 100px;
        }
      `}</style>
    </Layout>
  )
}

export default Signup
