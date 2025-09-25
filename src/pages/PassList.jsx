import React, { useState } from 'react'
import "../css/PassList.css"
import { useNavigate } from 'react-router-dom'

const workouts = [
  { id: 1, title: "Yoga Flow", date: "2025-09-25", time: "18:00", instructor: "Anna", location: "Core Gym Göteborg" }, //måste vara unika id
  { id: 2, title: "HIIT Cardio", date: "2025-09-26", time: "17:30", instructor: "Johan", location: "Core Gym Stockholm" },
  { id: 3, title: "Strength Training", date: "2025-09-27", time: "19:00", instructor: "Sara", location: "Core Gym Malmö" },
  { id: 4, title: "Gym Intro", date: "2025-09-28", time: "16:00", instructor: "Nils", location: "Core Gym Uppsala" },
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
    memberId: '0e7767ba-13fb-44c6-925a-3c22db351b1e', 
    workoutId: workout.id, 
  };

   try { //lägg in API url sen
      const res = await fetch("", {
        method:'POST', 
        headers: {
          'Content-type' : 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      if (res.ok) {
        navigate(`/confirm/${workout.id}`, { state: workout })
      } else {
        alert('Något gick fel. Försök igen.');
      }
    } catch (error) {
      alert('Kunde inte ansluta till servern.');
    }
  }
   /* if (bookedWorkouts.includes(workout.id)) {
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