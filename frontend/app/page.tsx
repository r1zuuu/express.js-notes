"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [notes, setNotes] = useState<any[]>([])
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const login = async () => {
      try {
        const res = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'user2@gmail.com', password: '1234' })
        })

        const { token } = await res.json()
        setToken(token)
        console.log(token)
      } catch (err) {
        console.error(err)
      }
    }

    login()
  }, [])

  const fetchNotes = async () => {
    const res = await fetch('http://localhost:3000/notes', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    setNotes(data)
    console.log(`dane: ${data}`)
  }

  return (
    <div>
      <button onClick={fetchNotes}>Fetch notes</button>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  )
}
