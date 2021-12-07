import Link from 'next/link'
import Router from 'next/router'

const Form = ({ isLogin, errorMessage, onSubmit, isResetPassword }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Email</span>
      <input type="text" name="email" required />
    </label>
    {!isLogin && !isResetPassword && (
      <label>
        <span>Username</span>
        <input type="text" name="username" required />
      </label>
    )}
    <label>
      <div className="forgot_pass_container">
        <span>Password</span>
        {isLogin && (
          <>
            <Link href="/password_reset">
              <a className="forgot_password_txt">Forgot Password?</a>
            </Link>
          </>
        )}
      </div>
      <input type="password" name="password" required />
    </label>
    {!isLogin && (
      <label>
        <span>Repeat password</span>
        <input type="password" name="rpassword" required />
      </label>
    )}
    {errorMessage &&
      <div className="errordiv">
        <span className="error">*{errorMessage}</span>
      </div>}
    <div className="submit">
      {isLogin && !isResetPassword && (
        <button type="submit">Sign in</button>
      )}

      {!isLogin && !isResetPassword && (
        <button type="submit">Sign up</button>
      )}

      {!isLogin && isResetPassword && (
        <>
          <button type="reset">
            <Link href="/login">
              Cancel
            </Link>
          </button>
          <button type="submit">Reset Password</button>
        </>
      )}
    </div>

    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
        width: 100%;
      }
      label > span {
        font-weight: 600;
        color: #a2a2a5;
      }
      input {
        height: 40px;
        padding: 8px;
        margin: 0.3rem 0 1rem;
        outline: none;
        font-size: 18px;
        padding: 0 5px;
        background-color: #3d3b47;
        border: 1px solid #4b494e;
        color: #a2a2a5;
        font-size: 18px;
        line-height: 18px;
        font-weight: 200;
        letter-spacing: 1px;
        -webkit-transition: all 0.30s ease-in-out;
        -moz-transition: all 0.30s ease-in-out;
        -ms-transition: all 0.30s ease-in-out;
        -o-transition: all 0.30s ease-in-out;
      }
      input:focus {
        box-shadow: 0 0 5px rgba(81, 203, 238, 1);
        border: 1px solid #1597e5;
      }
      .submit {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
      }
      .submit > a {
        text-decoration: none;
      }
      .submit > button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        width: 100%;
        height: 40px;
        background: #1597e5;
        color: white;
        font-weight: 600;
        border: none;
      }
      .forgot_password_txt {
        color: #1597e5;
        font-size: 12px;
      }
      .forgot_pass_container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .forgot_pass_container > span {
        font-weight: 600;
        color: #a2a2a5;
      }
      .errordiv {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
      }
      .error {
        color: brown;
      }
    `}</style>
  </form>
)

export default Form
