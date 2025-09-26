const signInUrl = 'https://localhost:7266/api/user/signin'
const signUpUrl = 'https://localhost:7266/api/user/signup'

export async function signIn(user) {
  const response = await fetch(`${signInUrl}`, {
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
  const response = await fetch(`${signUpUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'applicaton/json'
    },
    body: JSON.stringify(user)
  })
  if (!response.ok) {
    const text = await response.json()
    throw new Error(text)
  }
  return await response.json()
}