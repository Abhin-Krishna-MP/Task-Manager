import { Router } from "express";
import { tasks } from "../utils/constants.mjs";
import { taskValidationSchema } from "../utils/validationSchemas.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {  isAuthenticated } from "../utils/middleware.mjs";
import { Task } from "../mongoose/Schema/taskSchema";



const router = Router()

router.post('/api/task/create',isAuthenticated,checkSchema(taskValidationSchema),async(req, res) => {
    const result = validationResult(req)
    const data = matchedData(req)
    if(!result.isEmpty()) return res.status(400).send(result)
    try {
        const newTask = new Task({
            title : data.title,
            description: data.description,
            user : req.user._id
        })
        const saveTask = newTask.save()
        res.status(200).send({mssg:"Added successfully"})
    } catch (error) {
        res.status(400).send({err:error})
    }
})

router.get('/api/task/read',isAuthenticated,async(req,res)=>{

    try {
        const tasks = await Task.find({user:req.user._id})
        return res.send({tasks})
    } catch (error) {
        console.log(error)
        return res.status(500).send({mssg:error})
    }
})

router.patch('/api/task/update/:id',isAuthenticated,async(req,res)=>{
    const { title, description, completed } = req.body
    try {
        const updatedTask = await Task.findOneAndUpdate(
            {_id: req.params.id, user: req.user._id},
            {title,description,completed},
            {new : true}
        )
        if (!updatedTask) return res.status(404).json({ msg: "Task not found" });
        return res.status(200).send({mssg:"updated successfully"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({mssg:error})
        
    }
})

router.delete('/api/task/delete/:id',async(req,res)=>{
    try {
        const deleteTask = await Task.findOneAndDelete({
            _id : req.params.id,
            user : req.user._id
        })
        return res.status(200).send({mssg:"Removed successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({mssg:error})
        
    }
})

export default router