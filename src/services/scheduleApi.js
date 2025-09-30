const API_BASE_URL = import.meta.env.VITE_SCHEDULE_API_BASE_URL;

// GET: All workouts
export async function getAllWorkouts() {
  const response = await fetch(`${API_BASE_URL}/workouts`);

  if (!response.ok) {
    throw new Error(`Failed to fetch workouts. Status: ${response.status}`);
  }

  return response.json();
}

// POST: Create a new workout
export async function createWorkout(workout) {
  const response = await fetch(`${API_BASE_URL}/workouts/create`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(workout),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'An unexpected error occurred');
  }

  return response.json();
}

// PUT: Update an existing workout
export async function updateWorkout(workoutId, workout) {
  if (!workout.Id) workout.Id = workoutId;

  const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(workout),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'An unexpected error occurred');
  }

  return response.json();
}

// DELETE: Remove a workout by ID
export async function deleteWorkout(workoutId) {
  const response = await fetch(`${API_BASE_URL}/workouts/${workoutId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'An unexpected error occurred');
  }
  return true;
}
