const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')
const validateNote = require('../middleware/validator')
const authenticateToken = require('../middleware/authMiddleware')

router.get('/', authenticateToken ,notesController.getNotes)
router.post('/',authenticateToken,validateNote, notesController.postNote)
router.get('/:id',authenticateToken , notesController.getNote)
router.delete('/:id', authenticateToken ,notesController.deleteNote)
router.put('/:id', authenticateToken ,validateNote, notesController.updateNote)

module.exports = router