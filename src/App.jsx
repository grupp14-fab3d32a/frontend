import Confirm from './components/Confirm'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './css/app.css'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Createform from './components/Createform'
import Deleteform from './components/Deleteform'
import Home from './pages/Home'
import PassList from './pages/PassList'
import UpdatePass from './pages/UpdatePass'
import UpdateProfile from './pages/UpdateProfile'


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PassList" element={<PassList />} />
            <Route path="/confirm/:id" element={<Confirm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/createform" element={<Createform/>} />
            <Route path="/deleteform" element={<Deleteform/>} />
            <Route path="/update/:id" element={<UpdatePass />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
