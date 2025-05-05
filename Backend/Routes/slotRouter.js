import express from 'express'

import { createSlot } from '../Controllers/slot.controller.js'
import { verifyJwt } from '../Middleware/auth.middleware.js'

const slotRouter = express.Router();


slotRouter.post("/createslot", verifyJwt, createSlot)

export default slotRouter
