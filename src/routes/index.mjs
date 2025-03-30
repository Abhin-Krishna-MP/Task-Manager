import { Router } from 'express'
import tasksRouter from './task.mjs'

const router = Router()
router.use(tasksRouter)


export default router