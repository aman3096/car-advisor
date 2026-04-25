const express = require("express");
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT || 8080

// Enable CORS for local development
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:8080"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get('/api/v1/health-check', async( req, res) =>{
    res.send("Car Service in progress");
})

app.listen(port, ()=> {
    console.log(`App is listening to ${port}`)
})

