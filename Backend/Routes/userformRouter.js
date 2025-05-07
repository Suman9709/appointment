import express from 'express';

import { verifyJwt } from '../Middleware/auth.middleware.js';
import { updateAppointmentStatus } from '../Controllers/appointment.controller.js';
import { appointmentBook } from '../Controllers/appointment.controller.js';
import { allAppointments } from '../Controllers/appointment.controller.js';
import { getUserAppointment } from '../Controllers/appointment.controller.js';

const formRouter = express.Router();
formRouter.post('/book', verifyJwt, appointmentBook);
formRouter.patch('/appointment/:id/status', verifyJwt, updateAppointmentStatus);
formRouter.get("/allappointments", verifyJwt, allAppointments)
formRouter.get("/getuserappointment", verifyJwt, getUserAppointment)
export default formRouter;
