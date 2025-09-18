import React from 'react'

function SignUpForm() {
    return (
        <div>
            <form className='signup-form' noValidate>
                <h6 className='form-title'>Skapa ditt konto</h6>
                <input className='clr-text-white' type="text" name="username" placeholder="Användarnamn" required />
                <input className='clr-text-white' type="email" name="email" placeholder="Epost" required />
                <input className='clr-text-white' type="password" name="password" placeholder="Lösenord" required />
                <input className='clr-text-white' type="password" name="confirmPassword" placeholder="Bekräfta lösenord" required />

                <button type="submit" className='button button-secondary'>Skapa användare</button>
                <a href="/signin" className='clr-text-white'>Har du redan ett konto?</a>
            </form>
        </div>
    )
}

export default SignUpForm