const express = require("express")
const bodyParser = require("body-parser")

const mongo = require('mongodb').MongoClient;
const connection = 'mongodb://jeenny:jeenny89374@ds137763.mlab.com:37763/heroku_7sgpp14l';

const app = express()
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

var database = []

app.get("/",(req, res) => {

    const co1 = coordinaterCreator("16:00",58)
    const co2 = coordinaterCreator("16:05",60)
    
    const result = [co1,co2]
    res.json(result)


})

app.post("/record",(req,res) => {
    const username = req.body.username
    const bpm = req.body.bpm

    insertUserBPM(username,bpm)
    //const value = coordinaterCreator(Date(),bpm,username)
    //database.push(value)

    res.send()

})

app.get("/record/:username",(req,res) =>{
    //const resutl = database.filter(value => value.username == req.params.username)
    //res.json(resutl)
   // const result = findBPMForUser(req.params.username)
    // res.json(result)
    findBPMForUser((req.params.username),(result) => {
        res.json(result)
    })

})

function coordinaterCreator(time, bpm,username){
    return {time : time , bpm : bpm,username: username}
}

function findBPMForUser(username, callback) {
   mongo.connect(connection,(error, database)=>{
    database.db("heroku_7sgpp14l")
        .collection('BPM')
        .find({username : username})
        .toArray((error , results) =>{
            const response  = results.map((result) => {
                
                return{timestamp :result.timestamp,username : result.username,bpm:result.bpm }
            })


            callback(response)
           // console.log(result);
        })
   })

}

function insertUserBPM(username, bpm){
    mongo.connect(connection,(error, database)=>{
        database.db("heroku_7sgpp14l")
            .collection('BPM')
            .insert({timestamp :(new Date()).getTime(), username:username, bpm : bpm })
       })
}

app.listen(port)
