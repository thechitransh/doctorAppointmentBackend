import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common"; 
import { DoctorService } from "./services/doctor.service";
import { FileInterceptor } from "@nestjs/platform-express";

interface DoctorData{
    name:string,
    tag:string,
    Available:boolean
}

@Controller("/doctors")
export class DoctorsController {

    constructor(private doctorService:DoctorService){}

    @Get("/top")
    getTopTen(){
        return this.doctorService.GetTopDoctor()
    }


    @Post("/add")
    @UseInterceptors(FileInterceptor('file'))
    addDoctors(@UploadedFile() file:Express.Multer.File, @Body() body:DoctorData){

        if(!file){
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
      if(!tag) return new HttpException("Error in fetching",HttpStatus.FAILED_DEPENDENCY)

      if(tag == "All"){
        return this.doctorService.GetAll()
      }
      const result = this.doctorService.FindOne(tag);
      return result;
    }

    @Get("/appointment")
    getById(@Query("id") id:string){
      if(!id) return new HttpException("Error in fetching",HttpStatus.FAILED_DEPENDENCY)

        const result = this.doctorService.FindOneById(id)
        return result
    }

}