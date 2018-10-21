const express = require("express")
const bodyParser = require("body-parser")

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

    const value = coordinaterCreator(Date(),bpm,username)
    database.push(value)

    res.send()

})

app.get("/record/:username",(req,res) =>{
    const resutl = database.filter(value => value.username == req.params.username)
    res.json(resutl)
})

function coordinaterCreator(time, bpm,username){
    return {time : time , bpm : bpm,username: username}
}


app.listen(port)
