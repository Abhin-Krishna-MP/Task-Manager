import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { userValidationSchema } from "../utils/validationSchemas.mjs";
import { User } from "../mongoose/Schema/userSchema.mjs";
import { hashpassword } from "../utils/helpers.mjs";
import passport from "passport";

const router = Router()

router.post('/api/user/auth/register',checkSchema(userValidationSchema),async(req,res)=>{
    const result = validationResult(req)
    if(!result.isEmpty()) return res.status(400).send(result.array())
    const data = matchedData(req)
    data.password = hashpassword(data.password)
    const newUser = new User(data)
    try {
        const saveUser = await newUser.save()
        return res.status(201).send(newUser)
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
})

router.post('/api/user/auth/login',passport.authenticate('local'),(req,res)=>{
    res.send({mssg:"Login successfully",user: req.user})
    
})

router.get('/api/user/auth/logout',(req,res)=>{
    req.logout((err)=>{
        if(err) return res.status(500).send({mssg:"Logout failed"})
        return res.send({mssg:"Logout successfull"})
    })
})

router.get('/api/user/auth', (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ mssg: "User not Authenticated" });

    const sanitizedUser = {
        id: req.user._id,
        username: req.user.username,
        displayName : req.user.displayName,
    };

    res.json({ user: sanitizedUser });
});

export default router