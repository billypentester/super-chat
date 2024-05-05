import mongoose from 'mongoose'

const uri = 'mongodb://0.0.0.0:27017/chat'

const connection = async() => {
    try {
        await mongoose.connect(uri)
        console.log('Database connected successfully')
    }
    catch(err) {
        console.log('Database connection failed: ', err)
    }
}

export default connection