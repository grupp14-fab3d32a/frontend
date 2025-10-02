import Confirm from './components/Confirm'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './css/App.css'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateWorkoutForm from './components/CreateWorkoutForm'
import Home from './pages/Home'
import WorkoutList from './pages/WorkoutList'
import UpdateWorkout from './pages/UpdateWorkout'
import UpdateProfile from './pages/UpdateProfile'
import HistoryWorkout from './pages/HistoryWorkout'


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workoutlist" element={<WorkoutList />} />
            <Route path="/confirm/:id" element={<Confirm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/createworkoutform" element={<CreateWorkoutForm />} />
            <Route path="/update/:id" element={<UpdateWorkout />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/workouthistory" element={<HistoryWorkout />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}


export default App
