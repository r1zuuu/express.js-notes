const express = require('express');
const cors = require('cors');
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();


const PORT = process.env.PORT || 3000

const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

app.use('/notes', notesRoutes);
app.use('/', authRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
    res.status(404).json({message: `Route ${req.originalUrl} not found`})
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})