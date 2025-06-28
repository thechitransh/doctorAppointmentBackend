import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./services/user.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:User.name,
                schema:UserSchema
            }
        ]),
        JwtModule.register({
              secret: 'your_jwt_secret',
              signOptions: { expiresIn: '1d' }
          }),
    ],
    controllers:[UserController],
    providers:[UserService],
    exports:[JwtModule]
})

export class UserModule{}