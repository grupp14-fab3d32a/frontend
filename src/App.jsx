import Confirm from './components/Confirm'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './css/app.css'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateForm from './components/CreateForm'
import DeleteForm from './components/DeleteForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Confirm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/createform" element={<CreateForm/>} />
            <Route path="/deleteform" element={<DeleteForm/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
