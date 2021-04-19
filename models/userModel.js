import mongoose from 'mongoose'
import 'mongoose-unique-validator'

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

export default mongoose.model('User', userSchema)