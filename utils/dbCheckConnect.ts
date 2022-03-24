import mongoose from 'mongoose'
import { envExist } from './validateEnv'

async function dbCheckConnect() {
    if (mongoose.connection.readyState != mongoose.ConnectionStates.connected) {
        const DB_URI = envExist(process.env.DB_URI, "db uri", true)
        const TEST_DB_NAME = envExist(process.env.TEST_DB_NAME, "test db name")
        await mongoose.connect(DB_URI, { dbName: TEST_DB_NAME, authSource: "admin", connectTimeoutMS: 5000 })
        console.log("db connected")
    }
}
export default dbCheckConnect