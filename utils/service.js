const mongoose = require("mongoose")

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
    }catch(err){
        console.log(err);
        throw err
    }
}

mongoose.connection.on("connected",()=>console.log("connected..."))
mongoose.connection.on("disconnected",()=>console.log("disconnected..."))

module.exports = connect