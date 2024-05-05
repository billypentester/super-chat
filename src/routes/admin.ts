import Router from 'express'
import { allUsers } from './../controllers/admin.js'
const router = Router()

router.get("/users", allUsers)

export default router