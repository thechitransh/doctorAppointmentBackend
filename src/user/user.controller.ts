import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { Response } from 'express';

@Controller("/user")
export class UserController {

       constructor(private userService:UserService){}
     
    @Post("/signup")
    signup(@Body() body){
         const res = this.userService.userSignup(body)
          return res
    }

    
    @Get("/profile")
    profile(@Query("email") email:string){
      const res = this.userService.getUser(email)
      return res
    }

    @Post("/login")
   async login(@Body() body ,@Res({ passthrough: true }) res: Response){
      const result = await this.userService.loginUser(body)
       if (result.status === 200) {
        res.cookie('token', result.token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
     return { message: result.message, status: result.status };
   }
}