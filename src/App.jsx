import Confirm from './components/Confirm'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './css/app.css'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateFormPage from './pages/CreateFormPage';
import DeleteFormPage from './pages/DeleteFormPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Confirm />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/createform" element={<CreateFormPage/>} />
            <Route path="/deleteform" element={<DeleteFormPage/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
