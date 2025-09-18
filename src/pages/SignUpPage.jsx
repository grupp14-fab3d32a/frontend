import React from 'react'
import '../css/app.css'
import '../css/auth-pages.css'
import SignUpForm from '../components/SignUpForm'

function SignUpPage() {
    return (
        <div className='container'>

            <div className="auth-frontpage">
                <h1 className='reg-title'>Core Gym Club</h1>
                <h6 className='reg-subtitle'>Ditt nästa steg mot styrka och hälsa</h6>
                < SignUpForm />
            </div>

        </div>
    )
}

export default SignUpPage