const mongoose = require('mongoose')
const connectionString = process.env.connectionString
mongoose.connect(connectionString).then(()=>{
        console.log("MongoDB Atlas Connected with rbServer");
    }
).catch((err)=>{
    console.log("MongoDB Connection Failed!!!",err);
})