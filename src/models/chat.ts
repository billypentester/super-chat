import mongoose, { Schema, Document } from 'mongoose';
import { User } from './user.js';

interface IChat extends Document {
    participants: string[];
    messages: [
        {
            sender: string;
            text: string;
            time: Date;
        }
    ];
}

const chatSchema: Schema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User 
        }
    ],
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: User
            },
            text: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                default: Date.now()
            }
        }
    ]
});


const Chat = mongoose.model<IChat>('chat', chatSchema);

export { Chat };