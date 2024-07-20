import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number;
}

const connection:ConnectionObject = {}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }else{
        try{
            if (process.env.MONGO_URI) {
                const db = await mongoose.connect(process.env.MONGO_URI);
                connection.isConnected = db.connections[0].readyState;
                console.log("DB connected successfully");
                // console.log("db")
                // console.log(db)
                // console.log("db.connections")
                // console.log(db.connections)
                // console.log("db.connections[0]")
                // console.log(db.connections[0])
                // console.log("db.connections[0].readyState");
                // console.log(db.connections[0].readyState);
              } else {
                throw new Error("MONGO_URI environment variable is not set")
              }
        }catch(error){
            console.log("DB connection failed error", error);
            process.exit(1);
        }
    }
}

export default dbConnect;