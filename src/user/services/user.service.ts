import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/user/user.schema";
import { Model } from "mongoose";
import bcrypt from "bcrypt"
import { log } from "console";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService{

constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
    
  ){}


   async userSignup(data){
      const unique = await this.userModel.find({eamil:data.email})
      if (unique.length>0) return {message:"Email Already Exist",status:405}
      const salt = 6
       const hashedPassword = await bcrypt.hash(data.password, salt);
       await this.userModel.create({...data,
         password:hashedPassword
      })
      return {message:"User Added",status:200}
   }

   async getUser(email){
      const result = await this.userModel.findOne({email:email})
      return result
   }

   async loginUser(data){
      const user = await this.userModel.findOne({email:data.email})
      if(!user){
         return {message:"User not exist",status:405}
      }
      const isValidPassword = await bcrypt.compare(data.password,user.password)
      if(isValidPassword){
         const payload = { email: user.email, id: user._id };
         const token = this.jwtService.sign(payload)
         return {token:token,message:"Login Sucessfull",status:200}
      }else{
         return {message:"wromg credentials",status:405}
      }
      
   }
}