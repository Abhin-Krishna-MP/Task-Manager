import { Router } from "express";
import { tasks } from "../utils/constants.mjs";
import { taskValidationSchema } from "../utils/validationSchemas.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { getTask } from "../utils/middleware.mjs";



const router = Router()

router.post('/api/task/create',checkSchema(taskValidationSchema),(req, res) => {
    const result = validationResult(req)
    const data = matchedData(req)
    if(!result.isEmpty()) return res.status(400).send(result)
    const newTask = {
        id: tasks.length +1,
        date: new Date(),
        title : data.title,
        description: data.description,
        completed: false
    }
    tasks.push(newTask)
    res.status(200).send({mssg:"Added successfully"})
})

router.get('/api/task/read',(req,res)=>{
    const {filter,value} = req.query
    if(filter && value) return res.send(tasks.filter((task)=>{ 
        if(typeof task[filter]=== 'boolean') return task[filter] === (value==='true')
        return task[filter] === value
    }))
    res.send({mssg:"Read successfully",data:tasks})
})

router.patch('/api/task/update/:id',getTask,(req,res)=>{
    const {body,findTaskId} = req
    tasks[findTaskId]  = {...tasks[findTaskId], ...body}
    res.status(200).send({mssg:"updated successfully"})
})

router.delete('/api/task/delete/:id',getTask,(req,res)=>{
    const {body,findTaskId} = req
    tasks.splice(findTaskId,1)
    res.status(200).send({mssg:"Removed successfully"})
})

export default router