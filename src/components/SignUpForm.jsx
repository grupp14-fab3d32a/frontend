import React from 'react'
import { useState } from "react";

function SignUpForm() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };

            switch (name) {
                case "userName":
                    if (!value) {
                        newErrors.userName = "Användarnamn är obligatoriskt.";
                    } else if (value.length < 4) {
                        newErrors.userName = "Användarnamn måste vara minst 4 tecken.";
                    } else {
                        delete newErrors.userName;
                    }
                    break;

                case "email":
                    if (!value) {
                        newErrors.email = "Epost är obligatoriskt.";
                    } else if (!/\S+@\S+\.\S+/.test(value)) {
                        newErrors.email = "Ogiltig e-postadress.";
                    } else {
                        delete newErrors.email;
                    }
                    break;

                case "password":
                    if (!value) {
                        newErrors.password = "Lösenord är obligatoriskt.";
                    } else if (value.length < 6) {
                        newErrors.password = "Lösenord måste vara minst 6 tecken.";
                    } else {
                        delete newErrors.password;
                    }

                    if (formData.confirmPassword && value === formData.confirmPassword) {
                        delete newErrors.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (value !== formData.password) {
                        newErrors.confirmPassword = "Lösenorden matchar inte.";
                    } else {
                        delete newErrors.confirmPassword;
                    }
                    break;

                default:
                    break;
            }

            return newErrors;
        });
    };

    const validate = () => {
        let newErrors = {}

        //Validering för username.
        if (!formData.userName) {
            newErrors.userName = "Användarnamn är obligatoriskt."
        } else if (formData.userName.length < 4) {
            newErrors.userName = "Användarnamnet måste vara minst 4 tecken.";
        }

        //Validering för Email.
        if (!formData.email) {
            newErrors.email = "E-postadress är obligatoriskt."
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Ogiltig e-postadress.";
        }

        //Validering för lösenord.
        if (!formData.password) {
            newErrors.password = "Lösenord är obligatoriskt."
        } else if (formData.password.length < 6) {
            newErrors.password = "Lösenord måste vara minst 6 tecken.";
        }

        //Bekräfta lösenord.
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Lösenorden matchar inte."
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
        } else {
            setErrors({})
            console.log("Formulär skickat", formData)
            //Gör FETCH till API här.
        }
    };

    return (
        <div className="container">
            <div className='auth-frontpage'>
                <form className='form' onSubmit={handleSubmit} noValidate>
                    <h6 className='form-title'>Skapa ditt konto</h6>

                    <div className="input-group-auth">
                        <input className='clr-text-white'
                            type="text" name="userName"
                            placeholder="Användarnamn"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                        {errors.userName && <span className="form-error-message">{errors.userName}</span>}
                    </div>

                    <div className="input-group-auth">
                        <input className='clr-text-white'
                            type="email" name="email"
                            placeholder="E-postadress"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <span className="form-error-message">{errors.email}</span>}
                    </div>

                    <div className="input-group-auth">
                        <input className='clr-text-white'
                            type="password" name="password"
                            placeholder="Lösenord"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <span className="form-error-message">{errors.password}</span>}
                    </div>

                    <div className="input-group-auth">
                        <input className='clr-text-white'
                            type="password"
                            name="confirmPassword"
                            placeholder="Bekräfta lösenord"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && <span className="form-error-message">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className='button button-secondary'>Skapa användare</button>
                    <a href="/signin" className='clr-text-white'>Har du redan ett konto?</a>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm