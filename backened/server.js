const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config({path:'./config/config.env'});

const host = process.env.HOST;
const port = process.env.PORT;

app.use(cors())

// Define the origins from which requests are allowed
// const allowedOrigins = ['localhost:3001/', 'https://bbreact.onrender.com'];

// Configure CORS middleware
// app.use(cors({
//   origin: function(origin, callback) {
//     // Check if the request origin is included in the allowed origins
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));

// Express 4.0
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.get('/api' , (req,res) => {
    res.send('welcome to server')
});



mongoose.connect(process.env.MONGODB_CLOUD_URL).then(() => {
    console.log('Mongo DB Connected')
}).catch((err) => {
    console.error(err);
    Process.exit(1);
})

//configure thw router
app.use('/api' , require('./functions/apirouter'));

app.listen(port,host,() => {
    console.log(`server started http://${host}:${port}`)
})