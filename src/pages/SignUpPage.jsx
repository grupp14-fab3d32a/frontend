import React from 'react'
import '../css/app.css'
import '../css/auth-pages.css'
import SignUpForm from '../components/SignUpForm'

function SignUpPage() {
    return (
        <div className='container'>

            <div className="auth-frontpage">
                < SignUpForm />
            </div>

        </div>
    )
}

export default SignUpPage