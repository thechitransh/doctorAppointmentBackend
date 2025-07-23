import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://thechitranshsrivastava:Chitransh_1@project.6ce3e3d.mongodb.net/?retryWrites=true&w=majority&appName=Project"), DoctorModule, UserModule],
})
export class AppModule { }