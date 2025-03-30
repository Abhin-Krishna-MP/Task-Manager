import { Router } from "express";
import { isAuthenticated } from "../utils/middleware.mjs";
import { MasterSkill } from "../mongoose/Schema/masterySchema.mjs";


const router = Router()

router.post('/api/mskill/create',isAuthenticated,async(req,res)=>{
    try {
        const {title,description,tasks,endDate} = req.body
        const newSkill = MasterSkill({
            user : req.user._id,
            title,
            description,
            tasks,
            endDate
        })
        await newSkill.save()
        return res.status(200).send(newSkill)
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({mssg:error})
    }
})

router.get('/api/mskill/read',isAuthenticated,async(req,res)=>{
    try {
        const skills =await MasterSkill.find({user:req.user._id})
        return res.status(200).send(skills)
    } catch (error) {
        console.log(error)
        return res.status(400).send({mssg:error})
    }
})

router.put('/api/mskill/update/:id',isAuthenticated,async(req,res)=>{
    try {
        const skill = await MasterSkill.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!skill) return res.status(404).send({mssg:"Skill not found"})
            res.status(200).send(skill)
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({mssg:error})
        
    }
})


router.delete('/api/mskill/delete/:id',isAuthenticated,async(req,res)=>{
    try {
        const delelteSkill = await MasterSkill.findByIdAndDelete(req.params.id)
        if(!delelteSkill) return res.status(404).send({mssg:"Skill not found"})
        return res.status(200).send({mssg:"Deleted successfully"})
            
        } catch (error) {
            console.log(error)
            return res.status(400).send({mssg:error})
    }
})

router.post('/api/mskill/tasks/add/:id',isAuthenticated,async (req,res)=>{
    try {
        const skill = await MasterSkill.findById(req.params.id)
        if(!skill) return res.status(404).send({mssg:"Skill not found"})
            skill.tasks.push(req.body.task)
        await skill.save()
        return res.status(200).send({mssg:"Added successfully"})
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({mssg:error})
    }
})

router.delete('/api/mskill/tasks/delete/:id/:taskid',isAuthenticated,async(req,res)=>{
    try {
        const skill = await MasterSkill.findById(req.params.id)
        if(!skill) return res.status(404).send({mssg:"Skill not found"})
            const taskIndex = parseInt(req.params.taskid)
        if(taskIndex<0 || taskIndex >= skill.tasks.length) return res.status(400).json({ msg: "Invalid task index" })
            skill.tasks.splice(taskIndex,1)
        await skill.save()
        return res.status(200).send({mssg:"deleted successfully"})
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({mssg:error})
        
    }
})

export default router