const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todoList';

// Make connection to database
MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })
    .catch(err => {
        console.log(err)
    })

//express functions
app.set('view engine', 'ejs')
app.use(express.static('public'))
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
        console.log('un done')
        res.json('un done')
    })

})


//listen for page request 
app.listen(process.env.PORT || PORT,  () => {
    console.log("Your server is running")
})
