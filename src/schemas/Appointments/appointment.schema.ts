import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Appointment {
    @Prop({ required: true, trim: true })
    doctorId: string

    @Prop({ required: true, trim: true })
    email: string

    @Prop()
    amount: number

    @Prop()
    time: string

    @Prop()
    date: string

    @Prop({ default: "Pending", enum: ["Pending", "Completed"] })
    paymentStatus: string

}

const schema = SchemaFactory.createForClass(Appointment)
export const AppointmentSchema = schema;