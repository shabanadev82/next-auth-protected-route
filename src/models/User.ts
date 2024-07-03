import mongoose, { Schema, model, models, Document } from 'mongoose';
import { RegisterProps } from '@/data';

// Interface for the user document
interface IUser extends RegisterProps, Document {}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "User"
    }
}, { timestamps: true });

const User = models?.User || model<IUser>('User', userSchema);

export default User;
