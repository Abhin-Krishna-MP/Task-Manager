import { Router } from 'express'
import tasksRouter from './task.mjs'
import userRouter from './user.mjs'
import skillRouter from './masterSkill.mjs'

const router = Router()
router.use(tasksRouter)
router.use(userRouter)
router.use(skillRouter)


export default router