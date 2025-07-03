import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Doctor } from "src/schemas/doctors/doctors.schema";
import ImageKit from 'imagekit';
import { Appointment } from "src/schemas/Appointments/appointment.schema";

@Injectable()
export class DoctorService {
    private imagekit: ImageKit;

    constructor(
        @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
        @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>
    ) {
        this.imagekit = new ImageKit({
            publicKey: "public_LUb3rz3nAKjm8pOhtQriU1XNtNM=",
            privateKey: "private_9ucJ03sdTmkk9gjSE2tAJewlYMM=",
            urlEndpoint: "https://ik.imagekit.io/Chitransh"
        });
    }

    async GetTopDoctor() {
        const data = await this.doctorModel.find();
        return data;
    }

    async AddDoctors(file: any, data: any): Promise<any> {
        try {
            const img = await this.imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
                folder: '/uploads',
            });
            const res = await this.doctorModel.create({ ...data, image: img.url })
            return res
        } catch (error) {
            throw new Error("Unable to upload image")
        }
    }

    async FindOne(tag) {
        const res = await this.doctorModel.find({ tag: tag })
        return res

    }

    async GetAll() {
        const res = await this.doctorModel.find()
        return res

    }

    async FindOneById(id) {
        const res = await this.doctorModel.findById(id)
        const related = (await this.FindOne(res?.tag)).filter((item) => item.id !== id)
        return { data: res, related }

    }

    async AddAppointment(data, email: string) {
        const result = await this.FindOneById(data.doctorId)
        if (!result) return new HttpException("Error in fetching", HttpStatus.FAILED_DEPENDENCY)
        const AlreadyBooked = await this.appointmentModel.exists(data)
        if (AlreadyBooked) return new HttpException("Already Booked", HttpStatus.FAILED_DEPENDENCY)
        await this.appointmentModel.create({ ...data, amount: result?.data?.fee, email: email })
        return new HttpException("Appointment Booked Successfully", HttpStatus.OK)
    }
    async getBookedSlots(doctorId: string, date: string) {
        const result = await this.appointmentModel.find({ doctorId, date })
        const slots = result.map((item) => item.time)
        return slots
    }
    async getMyAppointments(email: string) {
        const result = await this.appointmentModel.find({ email })
        const res = result?.map(async (item) => {
            const data = await this.doctorModel.findOne({ _id: item?.doctorId })
            return {
                data,
                feeStatus: item.paymentStatus
            }
        })
        return res
    }
}
