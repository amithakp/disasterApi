var express = require('express');
var app = express();
var port = process.env.PORT || 8124;

app.get('/',(req,res) => {
    res.send("Hiii From Express")
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})