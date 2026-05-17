"use client"

import { Button } from "@/components/ui/button"
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
    console.log('data:', data)
    setNotes(data)
  }
  return (
    <div className="flex justify-center">
         <Button variant="outline" onClick={fetchNotes}>
           Fetch notes
         </Button>
      <ul>
        {notes.map((note) => (
          <div className="flex flex-row justify-center gap-10 border-4 border-b-black rounded-sm pt-8 pb-8 w-200" key={note.id}>
            <h3>Notatka #{note.id}</h3>
            <h1>{new Date(note.createdAt).toLocaleString("pl-PL")}</h1>
            <p>{note.tresc}</p>
              <Button className=" " variant="destructive">Delete note</Button>
          </div>
        ))}
      </ul>
    </div>
  )
}
