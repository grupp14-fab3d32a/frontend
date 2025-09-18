import React from 'react'
import '../css/app.css'
import '../css/auth-pages.css'
import SignInForm from '../components/SignInForm'
function SignInPage() {
    return (
        <div className='container'>

            <div className="auth-frontpage">
                <h1 className='auth-title'>Core Gym Club</h1>
                <h6 className='auth-subtitle'>Ditt nästa steg mot styrka och hälsa</h6>
                < SignInForm />

            </div>

        </div>
    )
}

export default SignInPage