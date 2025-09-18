import Confirm from './components/Confirm'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './css/app.css'
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createform from './components/Createform'


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Createform/>} />
            <Route path="/" element={<Confirm />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
