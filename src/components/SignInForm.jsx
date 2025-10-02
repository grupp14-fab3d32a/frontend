import { useState } from 'react'
import { signIn } from '../services/authService'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

function SignInForm() {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({})
    const [loginError, setLoginError] = useState("")
    const { decodeAndSetUser } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = "Användarnamn är obligatoriskt.";
        }
        if (!formData.password) {
            newErrors.password = "Lösenord är obligatoriskt.";
        }
        return newErrors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return
        }

        try {
            const result = await signIn(formData)
            if (result.isSuccess) {
                localStorage.setItem("token", result.token)
                decodeAndSetUser(result.token)
                setErrors({});
                setLoginError("")
                navigate('/')
            }
        }
        catch (error) {
            console.log('Login failed:', error.message)
            if (error.message) {
                try {
                    const errObj = JSON.parse(error.message)
                    setLoginError(errObj.message || "Login failed")
                } catch {
                    setLoginError(error.message)
                }
            } else {
                setLoginError("Login failed.")
            }
        }

    };

    return (
        <div className="container">
            <div className='auth-frontpage'>
                <form className='form' onSubmit={handleSubmit} noValidate>
                    <h6 className='form-title'>Logga in</h6>

                    <div className="input-group-auth">
                        <input className='clr-text-white'
                            type="email"
                            name="email"
                            placeholder="Användarnamn"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        {errors.username && <span className="form-error-message">{errors.username}</span>}
                    </div>

                    <div className="input-group-auth">
                        <input className='clr-text-white login-pw'
                            type="password"
                            name="password"
                            placeholder="Lösenord"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <span className="form-error-message">{errors.password}</span>}
                    </div>

                    {loginError && <p className="form-error-message">{loginError}</p>}

                    <div className='forgot-container'>
                        <a href="" className='clr-text-white'>Glömt lösenord?</a>
                    </div>
                    <button type="submit" className='button button-secondary'>Logga in</button>
                    <Link to="/signup" className='clr-text-white'>Ny användare? Registrera dig här</Link>
                </form>
            </div>
        </div>

    )
}

export default SignInForm