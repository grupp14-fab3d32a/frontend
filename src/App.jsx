import Confirm from './components/Confirm'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './css/app.css'
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  ) 
}

export default App
