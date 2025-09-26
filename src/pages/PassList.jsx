import React, { useState } from 'react'
import "../css/PassList.css"
import { useNavigate } from 'react-router-dom'

const workouts = [
  { id: "3d96f3e1-86eb-4139-bd1c-f6b96ff8cbb2", title: "Yoga Flow", date: "2025-09-25", time: "18:00", instructor: "Anna", location: "Core Gym Göteborg" }, //måste vara unika id
  { id: "3e8de47e-edf0-4caa-bb96-e83474ef3959", title: "HIIT Cardio", date: "2025-09-26", time: "17:30", instructor: "Johan", location: "Core Gym Stockholm" },
  { id: "cfaadeb1-1b60-4e6a-959d-7d79f05454a4", title: "Strength Training", date: "2025-09-27", time: "19:00", instructor: "Sara", location: "Core Gym Malmö" },
  { id: "e71ad296-ab88-4653-bf48-d3cd82636bc7", title: "Gym Intro", date: "2025-09-28", time: "16:00", instructor: "Nils", location: "Core Gym Uppsala" },
  /*{ id: 1, title: "Yoga Flow", date: "2025-09-25", time: "18:00", instructor: "Anna", location: "Core Gym Göteborg" },
  { id: 2, title: "HIIT Cardio", date: "2025-09-26", time: "17:30", instructor: "Johan", location: "Core Gym Stockholm" },
  { id: 3, title: "Strength Training", date: "2025-09-27", time: "19:00", instructor: "Sara", location: "Core Gym Malmö" },
  { id: 4, title: "Gym Intro", date: "2025-09-28", time: "16:00", instructor: "Nils", location: "Core Gym Uppsala" },
  { id: 1, title: "Yoga Flow", date: "2025-09-25", time: "18:00", instructor: "Anna", location: "Core Gym Göteborg" },
  { id: 2, title: "HIIT Cardio", date: "2025-09-26", time: "17:30", instructor: "Johan", location: "Core Gym Stockholm" },
  { id: 3, title: "Strength Training", date: "2025-09-27", time: "19:00", instructor: "Sara", location: "Core Gym Malmö" },
  { id: 4, title: "Gym Intro", date: "2025-09-28", time: "16:00", instructor: "Nils", location: "Core Gym Uppsala" },*/
];

const PassList = () => {
  const navigate = useNavigate()
  const [bookedWorkouts, setBookedWorkouts] = useState([]) // lagrar bokade pass
 
  const handleBooking = async (workout) => { 
    const requestData = {
    memberId: '0e7767ba-13fb-44c6-925a-3c22db651b1e', 
    workoutId: workout.id, 
  };
//Är passet redan bokat?
const isBooked = bookedWorkouts.includes(workout.id);

   try { 
    let res;
    if (isBooked) {
       res = await fetch(`https://localhost:7106/api/bookings/${workout.id}`, {
        method:'DELETE', 
    
      });
    } else {
       res = await fetch("https://localhost:7106/api/bookings", {
        method:'POST', 
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(requestData)
    });
  }

      if (res.ok) {
        if (isBooked) {
          setBookedWorkouts(bookedWorkouts.filter(id => id !== workout.id));
          console.log(`Avbokade pass ${workout.id}`);
        } else {
          setBookedWorkouts([...bookedWorkouts, workout.id]);
          console.log(`Bokade pass ${workout.id}`);
          navigate(`/confirm/${workout.id}`, { state: workout });
        }
      }else {
        alert('Något gick fel');
      }
    } catch (error) {
      alert('Kunde inte ansluta till servern');
    }
    }
       
    /*if (bookedWorkouts.includes(workout.id)) {
      // Avboka
      setBookedWorkouts(bookedWorkouts.filter(id => id !== workout.id))
      console.log(`Avbokade pass ${workout.id}`)
    } else {
      // Boka
      setBookedWorkouts([...bookedWorkouts, workout.id])
      console.log(`Bokade pass ${workout.id}`)
      navigate(`/confirm/${workout.id}`, { state: workout })
    }*/
  

  return (
    <div className='Passlist'>
      <button className='create-button' onClick={() => navigate('/createform')}>
        Skapa nytt pass
      </button>
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
                onClick={() => navigate(`/update/${workout.id}`)}
              >
                Uppdatera
              </button>
              <button 
                className='button button-secondary'
                onClick={() => handleBooking(workout)}
              >
              {bookedWorkouts.includes(workout.id) ? "Avboka" : "Boka"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PassList