import React, { useEffect, useState} from 'react';
import "../css/WorkoutList.css"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext';
import { getAllWorkouts } from '../services/scheduleApi';

const WorkoutList = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
        
      } catch (error) {
        setError(error.message || 'Något gick fel vid hämtning av träningspass.');
      } finally {
        setLoading(false);
      }
    };

  fetchWorkouts();
}, []);

  if (authLoading || loading) return <p>Laddar...</p>;
  if (error) return <p className="error-message">{error}</p>;
  

  //Workoutlist is visible for all users, but only admin can create and update workouts.

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

              {user?.roles?.includes('Admin') && (
              <button
                className='update-button'
                onClick={() => navigate(`/update/${workout.id}`)}
              >
                Uppdatera
              </button>
              )}
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
