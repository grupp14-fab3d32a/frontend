import React from 'react'

function SignInForm() {
    return (
        <div>
            <form className='signup-form' noValidate>
                <h6 className='form-title'>Logga in</h6>
                <input className='clr-text-white' type="text" name="username" placeholder="Användarnamn" required />
                <input className='clr-text-white login-pw' type="password" name="password" placeholder="Lösenord" required />

                <div className='forgot-container'>
                    <a href="" className='clr-text-white'>Glömt lösenord?</a>
                </div>
                <button type="submit" className='button button-secondary'>Logga in</button>
                <a href="/signin" className='clr-text-white'>Ny användare? Registrera dig här</a>
            </form>
        </div>
    )
}

export default SignInForm