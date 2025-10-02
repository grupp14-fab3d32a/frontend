const API_BASE_URL = import.meta.env.VITE_BOOKING_API_BASE_URL;

// GET: All bookings
export async function getAllBookings(memberId) {
  const response = await fetch(`${API_BASE_URL}/api/bookings/member/${memberId}`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    throw new Error(`Något gick fel vid hämtning av bokningar: ${response.status}`);
  }

  return await response.json();
}