import bcrypt from 'bcrypt'
import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


  export const register = async (req,res)=>{
  const {username, email,password}= req.body
  try{
  const hashedPassword = await bcrypt.hash(password, 10)

  console.log(hashedPassword)

  const newUser = await prisma.user.create({
    data:{
      username,
      email,
      password : hashedPassword,
    }
  })

  console.log(newUser)
  res.status(201).json({message : "User created Successfully"})
  }catch(err){
  console.error(err)
  res.status(500).json({message : "User already exists"})
  }
}

export const login = async (req,res)=>{
  const {username, password} = req.body
  try {
    //check if user exists
    const user = await prisma.user.findUnique({
      where:{username}
    })
    if(!user) return res.status(400).json({message :'Invalid Credentials'})

    //check if the paswd is correct
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) return res.status(400).json({message:"Invalid credentials!"})

    //generate cookie token and send to user
    // res.setHeader("Set-Cookie","test="+"myValue").json('success')

    const age = 1000 * 60 * 60 * 24 * 7

    const token = jwt.sign({
      id : user.id,
      isAdmin : false,
    }, process.env.JWT_SECRET_KEY,{expiresIn : age})

    const {password : userPassword, ...userInfo} = user

    res.cookie("token",token,{
      httpOnly : true,
      // secure : true
      maxAge : age
    }).status(200).json(userInfo)

  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Failed to login'})
  }
}

export const logout =(req,res)=>{
  res.clearCookie('token').status(200).json({message: "Logout successful"})
}