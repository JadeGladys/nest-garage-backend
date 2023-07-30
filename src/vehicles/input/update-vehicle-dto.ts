import { PartialType } from "@nestjs/mapped-types";
import { NewVehicleRecordDto } from "./record-new-vehicle.dto";

export class UpdateVehicleDto extends PartialType(NewVehicleRecordDto){
    
}