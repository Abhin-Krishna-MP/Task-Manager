import mongoose from "mongoose";
import { tasks } from "./constants.mjs";
import { Task } from "../mongoose/Schema/taskSchema";


export const isAuthenticated = (req,res,next)=>{
    if(!req.isAuthenticated()) return res.status(404).send({mssg:"Not Authenticated"})
    next()
}