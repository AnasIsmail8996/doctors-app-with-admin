import mongoose from "mongoose"

const connectDB=async()=>{
    try {
        const URI= process.env.MONGO_URI;
       await mongoose.connect(URI)
       .then(()=> console.log(`mongoDB Connected successfully 💜 `))
       .catch(()=> console.log(`mongoDB  not Connected  😂 `))
    } catch (error) {
        console.log(error.message || "something went wrong error database");
        
    }
}


export default connectDB