import { Request, Response } from 'express'
import { IUser, User } from '../models/user.js'
const secret = 'chatApp'
import jwt from 'jsonwebtoken'


const signUp = async(req: Request, res: Response): Promise<any> => {
    try{
        const { email } = req.body
        let isExist = await User.findOne({ email: email })
        if(isExist) {
            throw { code: 409, message: 'User already exist' }
        }
        const user = new User<IUser>(req.body)
        await user.save()
        res.status(201).send(user)
    }
    catch(e:any){
        res.status(e.code).json({ message: e.message })
        // console.log(e)
        // if(e.code != null) {
            
        // }
        // else {
        //     res.status(500).json({ message: 'Internal Server Error' })
        // }
    }
}

const logIn = async(req: Request, res: Response): Promise<any> => {
    try{
        let { email, password } = req.body
        let resData = await User.findOne({ email: email, password: password })
        if(!resData) {
            throw new Error('User not found')
        }
        let token = jwt.sign({ id: resData._id }, secret)
        resData.token = token
        await resData.save()
        res.status(200).json({
            token: token
        })
    }
    catch(err) {
        res.status(401).send(err)
    } 
}

export { signUp, logIn }