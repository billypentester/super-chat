import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    socket?: string;
    token?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        socket: {
            type: String,
            default: null 
        },
        token: {
            type: String,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>('User', userSchema);
export { User, IUser}