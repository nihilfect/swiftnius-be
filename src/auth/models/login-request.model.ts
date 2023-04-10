import { IsNotEmpty, IsEmail } from "class-validator";

export class LoginRequest {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}