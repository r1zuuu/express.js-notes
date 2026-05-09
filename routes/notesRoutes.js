const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')
const validateNote = require('../middleware/validator')

router.get('/', notesController.getNotes)
router.post('/', validateNote, notesController.postNote)
router.get('/:id', notesController.getNote)
router.delete('/:id', notesController.deleteNote)
router.put('/:id', validateNote, notesController.updateNote)

module.exports = router