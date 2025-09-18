import Confirm from './components/Confirm'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './css/app.css'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Confirm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  ) 
}

export default App
