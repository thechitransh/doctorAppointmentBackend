import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';

@Module({
  imports:[MongooseModule.forRoot("mongodb://localhost:27017/Doctor"),DoctorModule,UserModule],
})
export class AppModule {}
