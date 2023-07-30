import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class NewInsuranceRecordDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    InsuranceCompany: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    InsurancePremium: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    PremiumAmount: string;
    
    @IsNotEmpty()
    @ApiProperty()
    StartDate: Date;
    
    @IsNotEmpty()
    @ApiProperty()
    EndDate: Date;
    
    @ApiProperty()
    vehicleVehicleID: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    VIN: string;
}