import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto{
    @Length(5)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;
    @Length(8)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
    @Length(8)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    retypedPassword: string;
    @Length(2)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;
    @Length(2)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;
}