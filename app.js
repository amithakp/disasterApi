var express = require('express');
var app = express();
var dotenv = require('dotenv');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
dotenv.config();
var mongoUrl = "mongodb+srv://test:test@cluster0.vkjly.mongodb.net/disaster?retryWrites=true&w=majority";
var cors = require('cors')
const bodyParser = require('body-parser')
var port = process.env.PORT || 8124;
//save db connection
var db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {
    res.send("Hiii From Express..")
})

// post reliefCentre create
app.post('/reliefCenter',(req,res) => {
    console.log(req.body);
    db.collection('reliefCentre').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("centre created")
    })
})
//get reliefCentre details
app.get('/reliefCenter',(req,res) => {
    db.collection('reliefCentre').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
 
// post collectionCentre create
app.post('/collectionCentre',(req,res) => {
    console.log(req.body);
    db.collection('collectionCentre').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("centre created")
    })
})
//get collectionCentre details
app.get('/collectionCentre',(req,res) => {
    db.collection('collectionCentre').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// post reliefItem create
app.post('/reliefItem',(req,res) => {
    console.log(req.body);
    db.collection('reliefItem').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("centre created")
    })
})
//get reliefItem details
app.get('/reliefItem',(req,res) => {
    db.collection('reliefItem').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// connecting with mongodb
MongoClient.connect(mongoUrl, (err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('disaster');
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})