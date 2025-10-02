import React, { useState, useEffect } from 'react';
import "../css/WorkoutHistory.css";
import { useAuth } from '../components/AuthContext';

function HistoryWorkout() {
    const { user } = useAuth();
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const BOOKING_API = import.meta.env.VITE_BOOKING_API_BASE_URL;
    const SCHEDULE_API = import.meta.env.VITE_SCHEDULE_API_BASE_URL;

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                if (!user?.id) {
                    console.log("Ingen user.id");
                    setLoading(false);
                    return;
                }

                const bookingsRes = await fetch(`${BOOKING_API}/bookings/member/${user.id}`);
                if (!bookingsRes.ok) throw new Error("Kunde inte hämta bokningar");
                const bookings = await bookingsRes.json();

                const workoutsRes = await fetch(`${SCHEDULE_API}/workouts`);
                if (!workoutsRes.ok) throw new Error("Kunde inte hämta workouts");
                const allWorkouts = await workoutsRes.json();

                const fullData = bookings.map(b => ({
                    ...b,
                    workout: allWorkouts.find(w => w.id === b.workoutId)
                }));

                setWorkouts(fullData);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, [user]);

    if (loading) return <p>Laddar träningshistorik...</p>;

    return (
        <div className='workout-history'>
            <h3>Din träningshistorik</h3>
            <div className="cards-container">
                {workouts.length === 0 ? (
                    <p>Ingen träningshistorik</p>
                ) : (
                    workouts.map((booking) => (
                        <div className="workout-history-card" key={booking.id}>
                            <h5>{booking.workout?.title || "Okänt pass"}</h5>
                            <p>Instruktör: {booking.workout?.instructor || "Okänd"}</p>
                            <p>Datum: {booking.workout ? new Date(booking.workout.date).toLocaleDateString() : "-"}</p>
                            <p>Plats: {booking.workout?.location || "-"}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HistoryWorkout;
