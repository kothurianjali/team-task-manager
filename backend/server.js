const express = require('express');
const cors = require('cors');

require('./database');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Backend Server Running');
});

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});