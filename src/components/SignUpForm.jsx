import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signUp } from '../services/authService';

function SignUpForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };

            switch (name) {
                case "firstName":
                    if (!value) {
                        newErrors.firstName = "Namn är obligatoriskt.";
                    } else if (value.length < 4) {
                        newErrors.firstName = "Namn måste vara minst 4 tecken.";
                    } else {
                        delete newErrors.firstName;
                    }
                    break;
                case "lastName":
                    if (!value) {
                        newErrors.lastName = "Efternamn är obligatoriskt.";
                    } else if (value.length < 4) {
                        newErrors.lastName = "Efternamn måste vara minst 4 tecken.";
                    } else {
                        delete newErrors.lastName;
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
        if (!formData.firstName) {
            newErrors.firstName = "Namn är obligatoriskt."
        } else if (formData.firstName.length < 4) {
            newErrors.firstName = "Namn måste vara minst 4 tecken.";
        }
        if (!formData.lastName) {
            newErrors.lastName = "Efternamn är obligatoriskt."
        } else if (formData.lastName.length < 4) {
            newErrors.lastName = "Efternamn måste vara minst 4 tecken.";
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
            const result = await signUp(formData)

            setErrors({});
            navigate('/signin')
        }
        catch (e) {
            if (e.errors) {
                const dupEmail = e.errors.find(err => err.code === "DuplicateEmail")
                setErrors({ ['email']: dupEmail.description })
            }
            console.log(e)
        }
    };

    return (
        <div className="container">
            <div className='auth-frontpage'>
                <form className='form' onSubmit={handleSubmit} noValidate>
                    <h6 className='form-title'>Skapa ditt konto</h6>

                    <div className="input-group-auth">
                        <input className='clr-text-white'
                            type="text" name="firstName"
                            placeholder="Namn"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                        {errors.firstName && <span className="form-error-message">{errors.firstName}</span>}
                    </div>
                    <div className="input-group-auth">
                        <input className='clr-text-white'
                            type="text" name="lastName"
                            placeholder="Efternamn"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        {errors.lastName && <span className="form-error-message">{errors.lastName}</span>}
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