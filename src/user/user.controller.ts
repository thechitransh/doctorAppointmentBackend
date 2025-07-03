import { Body, Controller, Get, Post, Query, Req, Res } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller("/user")
export class UserController {

  constructor(private userService: UserService) { }

  @Post("/signup")
  async signup(@Body() body, @Res({ passthrough: true }) res: Response) {
    const result = await this.userService.userSignup(body)
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { message: result.message, status: result.status };
  }


  @Get("/profile")
  profile(@Req() req: Request) {
    const token = req.cookies.token
    if (!token) {
      return { error: 'No token provided' };
    }
    const decoded = jwt.verify(token, 'your_jwt_secret') as { email: string };
    const email = decoded.email
    const res = this.userService.getUser(email)
    return res
  }

  @Post("/login")
  async login(@Body() body, @Res({ passthrough: true }) res: Response) {
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