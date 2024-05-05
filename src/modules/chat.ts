import { Server } from "socket.io";
import jwt from 'jsonwebtoken'
const secret = 'chatApp'
import { User } from "../models/user.js";
import { Chat } from '../models/chat.js'
import { Socket } from "socket.io";

const socketConnect = (server) => {

    interface SocketUser extends Socket {
        user: string
    }

    const io = new Server(server);

    io.on('connection', (socket) => {
        
        const connectedSockets = io.engine.clientsCount;
        console.log('Total connected sockets: ' + connectedSockets);
        console.log('Socket connected: ' + socket.id);

        socket.on('auth', async(data)=> {
            const decodedUser = jwt.verify(data.token, secret);
            const { id } = decodedUser;
            (socket as SocketUser).user  = id;
            let user = await User.findById(id)
            user.socket = socket.id
            user.save()
            console.log('User Authenticated: ', (socket as SocketUser).user)
        })

        socket.on('chats', async(): Promise<any> => {
            let userChats = await Chat.find({
                participants: { $in: [(socket as SocketUser).user] },
            })
            .populate('participants', 'name email')
            .populate('messages.sender', 'name email')
            .slice('messages', -1)
            .sort({'messages.time': -1})
            socket.emit('chats', userChats)
        })

        socket.on('chat', async(data: { user: string }): Promise<any> => {
            let userChat = await Chat.find({
                participants: { $in: [data.user] }
            })
            .populate('participants', 'name email')
            .populate('messages.sender', 'name email')
            socket.emit('chats', userChat)
        })
        
        socket.on('chat message', async(data: { sender: string, receiver: string, text: string }): Promise<void> => {
            let { sender, receiver, text } = data;
            let existChat = await Chat.findOne({
                participants: [sender, receiver]
            })
            if(existChat) {
                existChat.messages.push({
                    sender: sender,
                    text: text,
                    time: new Date()
                })
                existChat.save()
            }
            else {
                let chatData = {
                    participants: [sender, receiver],
                    messages: [
                        {
                            sender: sender,
                            text: text, 
                            time: new Date()
                        }
                    ]
                }
                let newChat = new Chat(chatData)
                await newChat.save()
            }
        })

        socket.on('disconnect', () => {
            console.log('Socket disconnected: ' + socket.id);
        })

    });

    return io;

}

export default socketConnect;