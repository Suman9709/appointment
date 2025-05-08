import express from 'express'

import { createSlot, deleteSlot, getFilteredSlots } from '../Controllers/slot.controller.js'
import { verifyJwt } from '../Middleware/auth.middleware.js'

const slotRouter = express.Router();


slotRouter.post("/createslot", verifyJwt, createSlot)
slotRouter.delete("/slot/:id", verifyJwt, deleteSlot)
slotRouter.get("/slots", verifyJwt, getFilteredSlots)

export default slotRouter
