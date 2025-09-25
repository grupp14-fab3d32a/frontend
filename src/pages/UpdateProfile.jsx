import React from 'react'
import "../css/UpdateProfile.css"

const UpdateProfile = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Profile updated")
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Update Profile</h2>
         <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            Namn
            <input type="text"  />
          </label>

          <label>
            E-post
            <input type="email" />
          </label>

          <label>
            Lösenord
            <input type="password" />
          </label>

          <button type="submit" className="save-btn">Spara ändringar</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile
