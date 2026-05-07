const express = require('express')
const crypto = require('crypto');
const app = express()
const PORT = '3000'


app.use(express.json())

let notes = [
    
]
app.listen(PORT, (error) => {
    if(!error){
        console.log(`Server is running on ${PORT}`)
    }
    if(error){
        console.log('Error:', error)
    }
})
// wszystkie notatki
app.get('/notes', (req, res) => {
    res.json(notes)
})
//post na notatki 
app.post('/notes', (req, res) => {
    const id = crypto.randomUUID()

    const tresc = req.body.tresc

    const nowaNotatka = {id, content: tresc}

    notes.push(nowaNotatka)
    res.status(201).json(nowaNotatka)
})
//poszczegolna notatka o danym id find
app.get('/notes/:id', (req, res) => {
    const { id } = req.params

    const found = notes.find((item) => item.id === id);
    if(found == undefined){
        return res.status(404).send('Not found')
    }
    res.status(200).json(found)
})
// usuniecie notatki maly bug nawet jak nie ma takiej notatki i tak zwroci 404 ale to mozna zajac sie pozniej -> .some()
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params


    if(notes.length == 0){
        return res.status(404).send('Pusta tablica z notatkami nie ma nic do usuniecia')
    }

    notes = notes.filter((item) => item.id !== id)

    if(!notes.length){
        return res.status(200).send('No response')
    }
    res.status(200).json({ message: "Usunięto", data: notes })
})

app.put('/notes/:id', (req, res) => {
    const { id } = req.params
    const tresc = req.body.tresc

    const noteToUpdate = notes.find((item) => item.id == id)
    if(noteToUpdate == undefined){
        return res.status(404).send('Note not found')
    }

    noteToUpdate.content = tresc

})