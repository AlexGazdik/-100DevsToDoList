//import express module
const express = require('express')
//assign module to variable named app
const app = express()
//import MongoDB module
const MongoClient = require('mongodb').MongoClient
//assign localport 2121 to PORT
const PORT = 2121
//require local .env file
require('dotenv').config()

//create variable for database
    let db,
//connection string variable stored in env file containing url and username/password
    dbConnectionStr = process.env.DB_STRING,
//assign MongoDB database name to variable db
    dbName = 'todo';

// Make connection to database with promise
MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
//on return
    .then(client => {
        //console log connection confirmation
        console.log(`Connected to ${dbName} database`)
        //assign database connection to var 'db'
        db = client.db(dbName)
    })
    //error catch
    .catch(err => {
        console.log(err)
    })

//express functions
//assign ejs as the view engine
app.set('view engine', 'ejs')
//provides access to static files
app.use(express.static('public'))
//
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//pull data from database
app.get('/', async (req, res)=> {
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments(
        {completed: false})
    res.render('index.ejs', {zebra: todoItems, left: itemsLeft})
    })


//add data to database and refresh on repsonse
app.post('/createTodo', (req, res) => {
    db.collection('todos').insertOne({todo: req.body.todoItem, completed:
    false})
    .then(result => {
        console.log('Todo has been added')
        res.redirect('/')
    })
})
app.delete('/deleteTodo', (req, res)=>{
    db.collection('todos').deleteOne({todo:req.body.rainbowUnicorn})
    .then(result =>{
        console.log('Deleted Todo')
        res.json('Deleted It')
    })
})

app.put('/markComplete', (req, res) =>{
    db.collection('todos').updateOne({todo: req.body.rainbowUnicorn}, {
        $set: {
            completed: true
        }
    })
    .then(result =>{
        console.log("Marked Complete")
        res.json('Marked Complete')
    })
    
})
app.put('/undo', (req, res) =>{
    db.collection('todos').updateOne({todo: req.body.rainbowUnicorn}, {
        $set: {
            completed: false
        }
    })
    .then(result =>{
        console.log('Marked Incomplete')
        res.json('Marked Incomplete')
    })

})


//listen for page request 
app.listen(process.env.PORT || PORT,  () => {
    console.log("Your server is running")
})
