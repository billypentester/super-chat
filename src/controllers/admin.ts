import { Response } from 'express'
import { User } from '../models/user.js'

const allUsers = async(_, res: Response): Promise<any> => {
    try{
        const user = await User.find().select({
            _id: 1,
            name: 1
        })
        res.status(200).send(user)
    }
    catch(err){
        res.status(400).send(err)
    }
}

export { allUsers }