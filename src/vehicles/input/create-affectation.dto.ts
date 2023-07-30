import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAffectationDto{
    affectation_ID: number;
   
    @IsNotEmpty()
    @ApiProperty()
    StartDate: Date;

    
    @IsNotEmpty()
    @ApiProperty()
    EndDate: Date;
    
    @IsNotEmpty()
    @ApiProperty()
    vehicle: number;
    
    @IsNotEmpty()
    @ApiProperty()
    VIN: string;
}