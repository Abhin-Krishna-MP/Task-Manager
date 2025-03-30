import { tasks } from "./constants.mjs";

export const getTask = (req,res,next)=>{
    const {body,params: {id}} = req
    const parsedId = parseInt(id)
    console.log(parsedId)
    const findTaskId = tasks.findIndex((task)=>task.id === parsedId)
    if (findTaskId === -1) return res.status(404).send({mssg: "Task not found"})
    req.findTaskId = findTaskId
    next()
}