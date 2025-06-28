import { Module } from "@nestjs/common";
import { DoctorsController } from "./doctors.controller";
import { DoctorService } from "./services/doctor.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Doctor, DoctorSchema } from "src/schemas/doctors/doctors.schema";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:Doctor.name,
                schema:DoctorSchema
            }
        ])
    ],
    controllers:[DoctorsController],
    providers:[DoctorService]
})

export class DoctorModule{}