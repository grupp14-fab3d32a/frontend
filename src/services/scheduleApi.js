const API_BASE_URL = import.meta.env.VITE_SCHEDULE_API_BASE_URL;


// GET: All workouts
export async function getAllWorkouts() {
  const response = await fetch(`${API_BASE_URL}/api/workouts`);

  if (!response.ok) {
    throw new Error("Något gick fel vid hämtning av träningspass.");
  }

  return response.json();
}

// GET: Get a single workout by ID
export async function getWorkoutById(workoutId) {
  const response = await fetch(`${API_BASE_URL}/api/workouts/${workoutId}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Kunde inte hämta träningspasset");
  }

  const json = await response.json();
  return json.workout;
}

// POST: Create a new workout
export async function createWorkout(workout) {
  const response = await fetchWithToken(`${API_BASE_URL}/api/workouts/create`, {
    method: 'POST',
    headers: {},
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

  const response = await fetchWithToken(`${API_BASE_URL}/api/workouts/${workoutId}`, {
    method: 'PUT',
    headers: {},
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
  const response = await fetchWithToken(`${API_BASE_URL}/api/workouts/${workoutId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'An unexpected error occurred');
  }
  return true;
}

// Helper, fetch with token
export const fetchWithToken = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const mergedHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  return fetch(url, { ...options, headers: mergedHeaders });
}
