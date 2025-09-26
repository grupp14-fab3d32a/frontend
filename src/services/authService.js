const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function signIn(user) {
  const response = await fetch(`${API_BASE_URL}/user/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response.json()
}

export async function signUp(user) {
  const response = await fetch(`${API_BASE_URL}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  if (!response.ok) {
    const text = await response.json()
    throw new Error(text)
  }
  return await response.json()
}