import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DoctorService } from "./services/doctor.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Appointment } from "src/schemas/Appointments/appointment.schema";
import { Request } from "express";
import * as jwt from 'jsonwebtoken';
interface DoctorData {
  name: string,
  tag: string,
  Available: boolean
}

@Controller("/doctors")
export class DoctorsController {

  constructor(private doctorService: DoctorService) { }

  @Get("/top")
  getTopTen() {
    return this.doctorService.GetTopDoctor()
  }


  @Post("/add")
  @UseInterceptors(FileInterceptor('file'))
  addDoctors(@UploadedFile() file: Express.Multer.File, @Body() body: DoctorData) {

    if (!file) {
      throw new HttpException("No file found", HttpStatus.NOT_FOUND);
    }

    try {
      const res = this.doctorService.AddDoctors(file, body);
      return {
        message: 'Doctor added successfully',
        data: res
      };
    } catch (error) {
      console.error('Add Doctor Error:', error);
      throw new HttpException('Failed to add doctor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/getone')
  getOne(@Query('tag') tag: string) {
    if (!tag) return new HttpException("Error in fetching", HttpStatus.FAILED_DEPENDENCY)

    if (tag == "All") {
      return this.doctorService.GetAll()
    }
    const result = this.doctorService.FindOne(tag);
    return result;
  }

  @Get("/appointment")
  getById(@Query("id") id: string) {
    if (!id) return new HttpException("Error in fetching", HttpStatus.FAILED_DEPENDENCY)

    const result = this.doctorService.FindOneById(id)
    return result
  }

  @Post("/bookappointment")
  Booking(@Body() body: Appointment, @Req() req: Request) {
    if (!body.doctorId) return new HttpException("Error in fetching", HttpStatus.FAILED_DEPENDENCY)
    const token = req.cookies.token
    if (!token) {
      return { error: 'No token provided' };
    }
    const decoded = jwt.verify(token, 'your_jwt_secret') as { email: string };
    const email = decoded.email

    const result = this.doctorService.AddAppointment(body, email)
    return result
  }

  @Get("/bookedslots")
  async getBookedSlots(@Query('id') id: string, @Query('date') date: string) {
    if (!id) {
      throw new HttpException("Doctor ID missing", HttpStatus.BAD_REQUEST);
    }
    const result = await this.doctorService.getBookedSlots(id, date);
    return result;
  }


  @Get("/myappointments")
  async getMyAppointments(@Req() req: Request) {
    const token = req.cookies.token
    if (!token) {
      return { error: 'No token provided' };
    }
    const decoded = jwt.verify(token, 'your_jwt_secret') as { email: string };
    const res = await this.doctorService.getMyAppointments(decoded.email)
    return res
  }

}