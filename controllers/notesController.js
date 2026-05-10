const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const notesFile = path.join(__dirname, '..', 'data', 'notes.json')

// wszystkie notatki
const getNotes = (req, res) => {

    fs.readFile(notesFile, 'utf-8', (err, data) => {
        if(err){
            console.log('Error:', err)
            return res.status(500).json({message: 'Error reading notes'})
        }
        const notes = JSON.parse(data)
        res.json(notes)
    })
}
//post na notatki 
const postNote = (req, res) => {
    const tresc = req.body.tresc
    const id = crypto.randomUUID()
    fs.readFile(notesFile, 'utf-8', (err, data) => {

        const notes = JSON.parse(data);
        const notesToPush = {id, ...req.body}
        notes.push(notesToPush)

        fs.writeFile(notesFile, JSON.stringify(notes, null, 2), (err) => {
            if(err){
                return res.status(500).json({message: 'Error writing notes'})
            }else{
                return res.status(201).json(notesToPush)
            }
        })
    })

    // fs.writeFileSync('./notes.json', 'utf-8',  (err, data) => {
    //     if(err){
    //         console.log('Error:', err)
    //         return res.status(500).send('Error writing notes')
    //     }
    //     else{
    //         const tresc = data
    //         const nowaNotatka = {id, content: tresc}

    //         notes.push(nowaNotatka)
    //         res.status.json(nowaNotatka)
    //     }

    // })
}
//poszczegolna notatka o danym id find
const getNote = (req, res) => {
    const { id } = req.params

    fs.readFile(notesFile, (err, data ) => {
        if(err){
            return res.status(500).json({message: 'Error reading notes'})
        }
        const parsedData = JSON.parse(data)

        const note = parsedData.find((item) => item.id == id)
        if (!note){
            return res.status(404).json({message: 'Note not found'})
        }
        res.status(200).json(note)
    })

    

    // const found = notes.find((item) => item.id === id);
    // if(found == undefined){
    //     return res.status(404).send('Not found')
    // }
    // res.status(200).json(found)
}
// usuniecie notatki maly bug nawet jak nie ma takiej notatki i tak zwroci 404 ale to mozna zajac sie pozniej -> .some()
const deleteNote = (req, res) => {
    const { id } = req.params

    fs.readFile(notesFile, (err, data ) => {
        const parsedData = JSON.parse(data)
        const filteredData = parsedData.filter((item) => item.id !== id)
        if (filteredData.length > parsedData.length){
            return res.status(200).json({message: 'Deleted'})
        }
           
        fs.writeFile(notesFile, JSON.stringify(filteredData, null, 2),(err) => {
            if(err){
                return res.status(500).json({message: 'Error deleting note'})
            }
            else{
                return res.status(200).json({message: 'Note deleted'})
            }
        })
    })
 
    



    // const { id } = req.params


    // if(notes.length == 0){
    //     return res.status(404).send('Pusta tablica z notatkami nie ma nic do usuniecia')
    // }

    // notes = notes.filter((item) => item.id !== id)

    // if(!notes.length){
    //     return res.status(200).send('No response')
    // }
    // res.status(200).json({ message: "Usunięto", data: notes })
}

const updateNote = (req, res) => {
    const { id } = req.params
    const tresc = req.body.tresc

    fs.readFile(notesFile, (err, data ) => {
        const parsedData = JSON.parse(data)
        const noteToUpdate = parsedData.find((item) => item.id == id)
        if (!noteToUpdate){
            return res.status(404).json({message: 'Not found'})
        }
        noteToUpdate.tresc = tresc
        
        fs.writeFile(notesFile, JSON.stringify(parsedData, null, 2),(err) => {
            if(err){
                return res.status(500).json({message: 'Error updating note'})
            }
            else{
                return res.status(200).json(noteToUpdate)
            }
        })
    })


    // const { id } = req.params
    // const tresc = req.body.tresc

    // const noteToUpdate = notes.find((item) => item.id == id)
    // if(noteToUpdate == undefined){
    //     return res.status(404).send('Note not found')
    // }

    // noteToUpdate.content = tresc

}

module.exports = {
    getNotes,
    postNote,
    getNote,
    deleteNote,
    updateNote
}