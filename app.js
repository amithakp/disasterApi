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
 
// update reliefCentre details
app.put('/reliefCenter',(req,res) => {
    // var id = Number(req.body.disaster_reliefCenterid);
    db.collection('reliefCentre').updateOne(
        // {id:disaster_reliefCenterid},
            {
                $set:{
                    reliefCenterName:req.body.reliefCenterName,
                    totalAccomodation:req.body.totalAccomodation,
                    vaccancy:req.body.vaccancy
                }
            })
    
        res.send('Updated Successful')
    })

    // app.put('/reliefCenter/:id',(req,res) => {
    //     var id = Number(req.params.id);
    //     db.collection('reliefCentre').updateOne(
    //         {id:id},
    //             {
    //                 $set:{
    //                     reliefCenterName:req.body.reliefCenterName,
    //                     totalAccomodation:req.body.totalAccomodation,
    //                     vaccancy:req.body.vaccancy
    //                 }
    //             })
        
    //         res.send('Updated Successful')
    //     })
        
        



// app.put('/reliefCenter/:id',(req,res) => {
//     var id = Number(req.body.disaster_reliefCenterid);
//     db.collection('reliefCentre').updateOne(
//         {id:id},
//         {
//             $set:{
//                 "reliefCenterName":req.body.reliefCenterName,
//                 "totalAccomodation":req.body.totalAccomodation,
//                 "vaccancy":req.body.vaccancy,
//             }
//         }
//     )
//     res.send('data updated')
// })
// delete
 app.delete('/deleteReliefCentre',(req,res)=>{
    db.collection('reliefCentre').remove({},(err,result) => {
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

//get blogVolunteer details
app.get('/blogVolunteer',(req,res) => {
    db.collection('blogVolunteer').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
//get report
app.get('/report',(req,res) => {
    db.collection('report').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//admin section start
//blog
//get blogVolunteer details
app.get('/blogAdmin',(req,res) => {
    db.collection('blogAdmin').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//get blogVolunteer details
app.get('/reliefCampaign',(req,res) => {
    db.collection('reliefCampaign').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//get helpline details
app.get('/helpline',(req,res) => {
    db.collection('helpline').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
//get contact details
app.get('/contact/:id',(req,res) => {
    var id = parseInt(req.params.id);
    db.collection('contact').find({"contact_id":id}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result) 
    })
})
//get news details
app.get('/news',(req,res) => {
    db.collection('news').find().toArray((err,result) => {
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