import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LogBookDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    current_Address: string;

    @ApiProperty()
    vehicleVehicleID: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    VIN: string;
}