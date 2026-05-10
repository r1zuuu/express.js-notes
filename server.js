const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
require('dotenv').config();


const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json());

app.use('/notes', notesRoutes);

app.use((req, res) => {
    res.status(404).json({message: 'Route not found'})
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})