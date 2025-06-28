import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class User {
  @Prop({required:true})
  name: string;

  @Prop({ unique: true,required:true })
  email: string;

  @Prop({ default: 0 })
  phone: number;

  @Prop({ default: "" })
  address: string;

  @Prop({ default: "" })
  gender: string;

  @Prop({ default: "" })
  birthday: string;

  @Prop({
    default:
      "https://ik.imagekit.io/Chitransh/uploads/upload_area.png?updatedAt=1749229749495",
  })
  image: string;

  @Prop({required:true})
  password: string;
}

const schema = SchemaFactory.createForClass(User);
export const UserSchema = schema;
