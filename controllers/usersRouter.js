const express=require("express")
const usermodels=require("../usersmodel/usersModel")
const router=express.Router()

const bcrypt=require("bcryptjs")
const usersModel = require("../usersmodel/usersModel")
const hashFunction=async(password)=>
{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

router.post("/add",async(req,res)=>
{
   let {data}={"data":req.body}
   let passwords=data.password
   hashFunction(passwords).then((hashpassword)=>
   {
    data.password=hashpassword
    console.log(data)
    let userobj=new usermodels(data)
   let result= userobj.save()
   res.json({status:"success"})
   })
  
})

module.exports=router