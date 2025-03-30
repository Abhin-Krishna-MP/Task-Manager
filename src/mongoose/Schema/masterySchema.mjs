import mongoose from "mongoose"


const masterSkillSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    title : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    description : {
        type : mongoose.Schema.Types.String,
        required : true
    },
    tasks : [{type:String}],
    startDate : {
        type:Date,
        required : true,
        default : Date.now
    },
    endDate: {
        type:Date,
        required : true
    },
    status:{
        type:String,
        enum : ["planned","in-progress","completed"],default:"planned"
    }
},{timestamp:true})

export const MasterSkill = mongoose.model("MasterSkill",masterSkillSchema)