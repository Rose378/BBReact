const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config({path:'./config/config.env'});

const host = process.env.HOST;
const port = process.env.PORT;


app.use(cors({
    origin: 'https://tourmaline-banoffee-584430.netlify.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.options('*', cors());


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