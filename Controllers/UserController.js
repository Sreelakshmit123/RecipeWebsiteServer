const users = require('../Models/UserModel')
const jwt = require('jsonwebtoken')

exports.register =async (req,res)=>{
    const {username,email,password}= req.body
    console.log("Inside register request");
    try{
        //check email already exist
        const exisitingUser = await users.findOne({email})
        console.log(exisitingUser);
        if(exisitingUser){
            res.status(406).json("User Already Exist!!! Please Login....")
        }else{
            const newUser = new users({
                username,email,password,userType:"user",bio:"",gender:"",profile:"",facebook:"",instagram:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.login = async(req,res)=>{
    const {email,password,userType}=req.body
    console.log(userType);
    console.log("Inside login request");
        try{
            //check email,password  exists
            const existingUser = await users.findOne({email,password}) 
            console.log(existingUser);
            if(existingUser){
                //generate jwt token for sucessful login user
                const token=jwt.sign({userId:existingUser._id},process.env.jwt_secret)
                res.status(200).json({existingUser,token})
    
            }else{
                res.status(406).json("Invalid Email/Password")
            }
        }catch(err){
            res.status(401).json(err)
        }     
}

//profile updation

exports.editUser=async(req,res)=>{
    const userId=req.payload
    const {username,email,password,bio,gender,profileImg,facebook,instagram}= req.body
    const profile = req.file?req.file.filename:profileImg
    try {
        const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,bio,gender,profile,facebook,instagram},{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(401).json(error)    
    }
}