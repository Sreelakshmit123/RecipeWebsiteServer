require ('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/routes')
require('./DB/connection')

const rbServer = express()

rbServer.use(cors())
rbServer.use(express.json())
rbServer.use(router)
rbServer.use('/uploads',express.static('./uploads'))

const PORT = 3000

rbServer.listen(PORT,()=>{
    console.log(`project fair server started at port :${PORT}`);
})

rbServer.get('/',(req,res)=>{
    res.status(200).send("<h1 style=color:blue;>Project fair server started!!! Waiting for Client Request...</h1>")
})