import React from 'react'
import '../css/app.css'
import '../css/auth-pages.css'
import SignInForm from '../components/SignInForm'
function SignInPage() {
    return (
        <div className='container'>

            <div className="auth-frontpage">
                < SignInForm />
            </div>

        </div>
    )
}

export default SignInPage