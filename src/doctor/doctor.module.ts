import { Module } from "@nestjs/common";
import { DoctorsController } from "./doctors.controller";
import { DoctorService } from "./services/doctor.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Doctor, DoctorSchema } from "src/schemas/doctors/doctors.schema";
import { Appointment, AppointmentSchema } from "src/schemas/Appointments/appointment.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Doctor.name,
                schema: DoctorSchema
            },
            {
                name: Appointment.name,
                schema: AppointmentSchema
            }
        ])
    ],
    controllers: [DoctorsController],
    providers: [DoctorService]
})

export class DoctorModule { }