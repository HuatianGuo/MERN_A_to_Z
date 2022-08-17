const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

if(process.env.NODE_ENV  === "production"){
    console.log(1);
    app.use(express.static(path.join(__dirname, '/mern_a_to_z_client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'mern_a_to_z_client', 'build', 'index.html')); 
    });
} else{
    app.get('/',  (req, res) =>{
        res.send("Api running");
    });
}

const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Server running on port ${port}`));