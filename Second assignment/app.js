const express = require('express')

const app = express()
app.use('/', (req, res, next)=>{
    console.log("First middleware")
    next()
})

app.use("/users",(req,res, next)=>{
    console.log("User header")
    res.send("<h1>Users</h1>")
})

app.use("/",(req, res, next) =>{
    console.log("Dummy header")
    res.send("<h1>Dummy header</h1>")
    next()
})

app.listen(3000)
