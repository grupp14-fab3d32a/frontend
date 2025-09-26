import React from 'react';
import "../css/WorkoutHistory.css";

const workouts = [
    { id: 1, title: "Yoga Flow", date: "2025-09-25", time: "18:00", instructor: "Anna", location: "Core Gym Göteborg" },
    { id: 2, title: "HIIT Cardio", date: "2025-09-26", time: "17:30", instructor: "Johan", location: "Core Gym Stockholm" },
    { id: 3, title: "Strength Training", date: "2025-09-27", time: "19:00", instructor: "Sara", location: "Core Gym Malmö" },
    { id: 4, title: "Gym Intro", date: "2025-09-28", time: "16:00", instructor: "Nils", location: "Core Gym Uppsala" },
];

function HistoryWorkout() {
    return (
        <div className='workout-history'>
            <h3>Din träningshistorik</h3>
            <div className="cards-container">
                {workouts.length === 0 ? (
                    <p>Ingen träningshistorik</p>
                ) : (
                    workouts.map((workout) => (
                        <div className="workout-history-card" key={workout.id}>
                            <h5>{workout.title}</h5>
                            <p>Instruktör: {workout.instructor}</p>
                            <p>Datum: {workout.date} - {workout.time}</p>
                            <p>Plats: {workout.location}</p>
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}

export default HistoryWorkout;