import mongoose, { Schema, model, models } from 'mongoose'
import { RegisterProps } from '@/data';

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

const User = models.user || model<RegisterProps>("user", userSchema)
export default User;