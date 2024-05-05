import Router from 'express'
import { logIn, signUp } from './../controllers/auth.js'
const router = Router()
import { signUpMiddleware } from '../middleware/signUpMiddleware.js'

router.post("/login", logIn)
router.post("/signup", signUpMiddleware, signUp)

export default router