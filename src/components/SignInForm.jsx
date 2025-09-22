import React, { useState } from 'react'

function SignInForm() {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.username) {
            newErrors.username = "Användarnamn är obligatoriskt.";
        }
        if (!formData.password) {
            newErrors.password = "Lösenord är obligatoriskt.";
        }

        return newErrors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            console.log("Login skickas till backend:", formData);
            //FETCH till API här sen.
        }
    };

    return (
        <div className="container">
            <div className='auth-frontpage'>
                <form className='form' onSubmit={handleSubmit} noValidate>
                    <h6 className='form-title'>Logga in</h6>

                    <div className="input-group-auth">
                        <input className='clr-text-white'
                            type="text"
                            name="username"
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


                    <div className='forgot-container'>
                        <a href="" className='clr-text-white'>Glömt lösenord?</a>
                    </div>
                    <button type="submit" className='button button-secondary'>Logga in</button>
                    <a href="/signup" className='clr-text-white'>Ny användare? Registrera dig här</a>
                </form>
            </div>
        </div>

    )
}

export default SignInForm