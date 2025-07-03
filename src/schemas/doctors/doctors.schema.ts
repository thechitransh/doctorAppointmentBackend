import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Doctor {
    @Prop({ required: true, trim: true })
    name: string

    @Prop()
    image: string

    @Prop()
    tag: string

    @Prop()
    Available: boolean

    @Prop()
    fee: number

}

const schema = SchemaFactory.createForClass(Doctor)
export const DoctorSchema = schema;