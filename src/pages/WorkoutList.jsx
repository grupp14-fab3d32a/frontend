import React from 'react'
import "../css/WorkoutList.css"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext';

const workouts = [
  { id: 1, title: "Yoga Flow", date: "2025-09-25", time: "18:00", instructor: "Anna", location: "Core Gym Göteborg" },
  { id: 2, title: "HIIT Cardio", date: "2025-09-26", time: "17:30", instructor: "Johan", location: "Core Gym Stockholm" },
  { id: 3, title: "Strength Training", date: "2025-09-27", time: "19:00", instructor: "Sara", location: "Core Gym Malmö" },
  { id: 4, title: "Gym Intro", date: "2025-09-28", time: "16:00", instructor: "Nils", location: "Core Gym Uppsala" },
];

const WorkoutList = () => {
  const {user, loading} = useAuth()
  const navigate = useNavigate()
 
  if (loading) return <p>Laddar...</p>;
  
  return (
    <div className='workoutlist'>
      {user?.roles?.includes('Admin') && (
        <button className='create-button' onClick={() => navigate('/CreateWorkoutForm')}>
          Skapa nytt pass
        </button>
      )}
      <h3 className='Headline-workout'>Kommande träningspass</h3>
      {workouts.length === 0 ? (
        <p className="List-item-workout">Inga träningspass tillgängliga just nu</p>
      ) : (
        <ul className='List-workout'>
          {workouts.map((workout) => (
            <li className='List-item-workout' key={workout.id}>
              <p>{workout.date} - {workout.time}</p>
              <h6 className='title-workout'>{workout.title}</h6>
              <p className='instructor-workout'>Instruktör: {workout.instructor}</p>
              <p className='location-workout'>{workout.location}</p>
              <button
                className='update-button'
                onClick={() => navigate(`/update/${workout}`)}
              >
                Uppdatera
              </button>
              <button
                className='button button-secondary'
                onClick={() => navigate(`/confirm/${workout.id}`, { state: workout })}
              >
                Boka
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList
