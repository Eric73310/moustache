import {IsNotEmpty, IsEmail} from "class-validator";

export class UserCreateDto{
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    // @IsNotEmpty()
    // password: string;

    @IsNotEmpty()
    roleId: number;
}