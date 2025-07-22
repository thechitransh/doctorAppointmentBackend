import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://chitranshnow:yC5rNwwqbizUEWKx@cluster0.jflhdkj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"), DoctorModule, UserModule],
})
export class AppModule { }