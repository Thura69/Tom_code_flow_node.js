import config from 'config';
import mongoose from 'mongoose';




export async function connect() {
    await mongoose.connect(config.get<string>('dbName'));
    console.log("DB is connected now")
}
