const express=require("express")
const usermodels=require("../usersmodel/usersModel")
const router=express.Router()

router.post("/add",async(req,res)=>
{
    let data=req.body
    let model=new usermodels(data)
    let result=await model.save()
    res.json(
        {
            status:"success"
        }
    )
})

module.exports=router