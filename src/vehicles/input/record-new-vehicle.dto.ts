import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class NewVehicleRecordDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    VIN: string;
    
    @IsNotEmpty()
    @ApiProperty()
    Registration_NO: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Manufacturer: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Brand: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Functionality: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Milleage: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Insurance: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    status: string;
}