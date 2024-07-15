import mongoose from "mongoose";

async function connectToMongo() {
    const mongoURI = process.env.MONGOURI;
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.log(error);
    }

}

export {connectToMongo};
