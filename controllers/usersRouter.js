const express=require("express")
const usermodels=require("../usersmodel/usersModel")
const router=express.Router()
const bcrypt=require("bcryptjs")

const usersModel = require("../usersmodel/usersModel")
const hashFunction=async(password)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

router.post("/add",async(req,res)=>
{
   let {data}={"data":req.body}
   let password=data.password
    const hashedpassword=await hashFunction(password).then((hashedpassword)=>{
        data.password=hashedpassword
        let userobj=new usermodels(data)
        let result=userobj.save()
        res.json({status:"success"})
    })
    
  
})

router.post("/login",async(req,res)=>
{
    let email=req.body.emai
    let inputpassword=req.body.password
    let data=await usermodels.findOne({emai:email})
    if(!data){
        return(
            res.json({status:"no user"})
        )
    }
    let dbpassword=data.password
    const match=await bcrypt.compare(inputpassword,dbpassword)
    if(!match){
        return(
            res.json(
                {status:"invalid password"})
        )
    }
    res.json({status:"success"})

})

module.exports=router