import React, { useState, useEffect } from 'react';
import "../css/WorkoutList.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { getAllWorkouts } from '../services/scheduleApi';
import { getAllBookings } from '../services/bookingApi';


const WorkoutList = () => {
  const { user, loading: authLoading } = useAuth();  // For testing, add :mockAuthUser after user, and uncomment the mock user below
  const navigate = useNavigate();

  const [bookedWorkouts, setBookedWorkouts] = useState([]); // lagrar bokade pass
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // const API_BASE_URL = import.meta.env.VITE_BOOKING_API_BASE_URL;
//   const user = mockAuthUser ?? {
//   id: "1234",
//   email: "admin@test.com",
//   roles: ["Admin", "Member"], 
// };
  

  // Hämta alla träningspass
  const fetchWorkouts = async () => {
    try {
      const data = await getAllWorkouts();
      setWorkouts(data);
    } catch (error) {
      setError(error.message || "Något gick fel vid hämtning av träningspass.");
    } finally {
      setLoading(false);
    }
  };

  // Hämta bokningar för inloggad användare
  const fetchBookings = async () => {
    try {
      if (!user) return; // bara om användaren är inloggad
      const data = await getAllBookings(user.id);
      setBookedWorkouts(data.map(b => b.workoutId.toString())); // spara som sträng
    } catch (error) {
      console.error("Kunde inte hämta bokningar", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  // Boka / avboka pass
  const handleBooking = async (workout) => {
    if (!user) {
      alert("Du måste vara inloggad för att boka.");
      return; 
    } 

    const requestData = {
      memberId: user.id.toString(),
      workoutId: workout.id.toString(),
    };

    const isBooked = bookedWorkouts.includes(workout.id.toString());

    try {
      let res;
      if (isBooked) {
        res = await fetch(`${VITE_BOOKING_API_BASE_URL}/api/bookings/${user.id}/${workout.id}`, {
          method: "DELETE",
        });
      } else {
        res = await fetch(`${VITE_BOOKING_API_BASE_URL}/api/bookings`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(requestData),
        });
      }

      if (res.ok) {
        if (isBooked) {
          setBookedWorkouts(bookedWorkouts.filter(id => id !== workout.id.toString()));
          console.log(`Avbokade pass ${workout.id}`);
        } else {
          setBookedWorkouts([...bookedWorkouts, workout.id.toString()]);
          console.log(`Bokade pass ${workout.id}`);
          navigate(`/confirm/${workout.id}`, { state: workout });
        }
        fetchWorkouts();
      } else {
        alert("Något gick fel vid bokningen.");
      }
    } catch (error) {
      alert("Kunde inte ansluta till servern.");
    }
  };

  if (authLoading || loading) return <p>Laddar...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="workoutlist">
      {user?.roles?.includes("Admin") && (
        <button className="create-button" onClick={() => navigate("/CreateWorkoutForm")}>
          Skapa nytt pass
        </button>
      )}

      <h3 className="Headline-workout">Kommande träningspass</h3>
      {workouts.length === 0 ? (
        <p className="List-item-workout">Inga träningspass tillgängliga just nu</p>
      ) : (
        <ul className="List-workout">
          {workouts.map((workout) => (
            <li className="List-item-workout" key={workout.id}>
              <p>{workout.date} - {workout.startTime}</p>
              <h6 className="title-workout">{workout.title}</h6>
              <p className="instructor-workout">Instruktör: {workout.instructor}</p>
              <p className="location-workout">{workout.location}</p>
              <p className="spots-left">
                <span className="number">{workout.totalSpots - workout.bookedSpots}</span> platser kvar
              </p>

              {user?.roles?.includes("Admin") && (
                <button
                  className="update-button"
                  onClick={() => navigate(`/update/${workout.id}`)}
                >
                  Uppdatera
                </button>
              )}
              {user?.roles?.includes("User") && (
              <button
                className="button button-secondary"
                onClick={() => handleBooking(workout)}
              >
                {bookedWorkouts.includes(workout.id.toString()) ? "Avboka" : "Boka"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList;
