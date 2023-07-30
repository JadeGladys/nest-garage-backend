import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vehicle } from './vehicle.entity';
import { NewVehicleRecordDto } from "./input/record-new-vehicle.dto";
import { User } from "src/user/user.entity";
import { UpdateVehicleDto } from "./input/update-vehicle-dto";

@Injectable()
export class VehiclesService{
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepo: Repository<Vehicle>
    ){}

    private getVehiclesBaseQuery(){
        return this.vehicleRepo
            .createQueryBuilder('v')
            .orderBy('v.vehicle_ID','ASC');
    }

    //record vehicles
    public async recordVehicle(input:NewVehicleRecordDto, user:User): Promise<Vehicle>{
        const vehicle = this.vehicleRepo.create({
            ...input,
            recordedBy: user
          });
        
          const savedVehicle = await this.vehicleRepo.save(vehicle);
          return savedVehicle;
    }

    //get all vehicles
    async getAllVehicles(): Promise<Vehicle[]> {
        const queryBuilder = this.getVehiclesBaseQuery();
        return await queryBuilder.getMany();
    }

    //get one vehicle
    public async getVehicleById(vehicle_ID: number): Promise<Vehicle> {
        const queryBuilder = this.getVehiclesBaseQuery();
        queryBuilder.where('v.vehicle_ID = :vehicle_ID', { vehicle_ID });
        return await queryBuilder.getOne();
    }

    //getVehicleByRegistrationNo
    public async getVehicleByRegistrationNo(VIN: string): Promise<Vehicle> {
        const queryBuilder = this.getVehiclesBaseQuery();
        queryBuilder.where('v.VIN = :VIN', { VIN });
        return await queryBuilder.getOne();
    }

    //update vehicle info
    public async updateVehicle(vehicle: Vehicle, input: UpdateVehicleDto): Promise<Vehicle>{
        const updatedVehicle = await this.vehicleRepo.save({
            ...vehicle,
            ...input
          });
        
        return this.getVehicleById(updatedVehicle.vehicle_ID);
    }

    //pagination
    public async paginate(page = 1): Promise<any> {
        const take = 1;
        const [Vehicle, total] = await this.vehicleRepo.findAndCount({
            take,
            skip: (page - 1) * take
        });
        return{
            data: Vehicle,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }
}