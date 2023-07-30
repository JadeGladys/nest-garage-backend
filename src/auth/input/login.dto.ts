import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

}