import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const configObject = {
    port: process.env.PORT || 8080
};

export const conectDB = () => {
    console.log('Base de datos conectada');
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=coderHouseBackendI`;
    mongoose.connect(uri).catch(error => console.log(error));
};