import express from 'express'
import { loginUser, logoutUser, pingUser, registerUser } from '../Controllers/auth.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)


router.get('/ping', (req, res) => {
    return res.send('Server is running')
})


export default router