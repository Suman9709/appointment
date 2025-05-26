import express from 'express'
import { loginUser, logoutUser, registerUser } from '../Controllers/auth.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)


// router.get('/ping', (req, res) => {
//     return res.status(200).json({ message: 'Ping successful' });
// })



export default router