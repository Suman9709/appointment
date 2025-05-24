import express from 'express'
import { loginUser, logoutUser, pingUser, registerUser } from '../Controllers/auth.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/ping', pingUser)


export default router