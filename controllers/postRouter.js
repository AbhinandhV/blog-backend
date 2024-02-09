const express=require("express")
const postmodel=require("../usersmodel/postmodel")

const router=express.Router()

router.post("/addpost",async(req,res)=>
{
    let data=req.body
    let postmodelobj=new postmodel(data)
    await postmodelobj.save()
    res.json({status:"success"})
})

router.get("/viewpost",async(req,res)=>
{
    let result=await postmodel.find()
    .populate("userId","name emai -_id")
    .exec()
    res.json(result)
})

module.exports=router