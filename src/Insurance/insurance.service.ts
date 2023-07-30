import { Injectable, NotFoundException } from "@nestjs/common";
import { Insurance } from './insurance.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { NewInsuranceRecordDto } from "./input/record-new-insurance.dto";
import { User } from "src/user/user.entity";
import { VehiclesService } from "src/vehicles/vehicles.service"; 

@Injectable()
export class InsuranceService{
    constructor(
        // @InjectRepository(Vehicle)
        // private readonly vehicleRepo: Repository<Vehicle>,
        @InjectRepository(Insurance)
        private readonly insuranceRepo: Repository<Insurance>,
        private readonly vehicleService: VehiclesService
    ){}

    private getInsuranceBaseQuery(){
        return this.insuranceRepo
            .createQueryBuilder('i')
            .orderBy('i.insurance_ID','ASC');
    }

    //record Insurance
    public async recordInsurance(input:NewInsuranceRecordDto, user:User): Promise<Insurance>{
        const vehicle = await this.vehicleService.getVehicleByRegistrationNo(input.VIN);
        if (!vehicle) {
        throw new NotFoundException(`Vehicle with registration number ${input.VIN} not found`);
        }

        const insurance = this.insuranceRepo.create({
            ...input,
            StartDate: new Date(input.StartDate),
            EndDate: new Date(input.EndDate),
            vehicle: vehicle,
            recordedBy: user
          });
        
          const savedInsurance = await this.insuranceRepo.save(insurance);
          return savedInsurance;
    }

    //get all insurancce
    async getAllInsurances(): Promise<Insurance[]> {
        const queryBuilder = this.getInsuranceBaseQuery();
        return await queryBuilder.getMany();
    }

    //get one insurance
    public async getInsuranceById(insurance_ID: number): Promise<Insurance> {
        const queryBuilder = this.getInsuranceBaseQuery();
        queryBuilder.where('i.insurance_ID = :insurance_ID', { insurance_ID });
        return await queryBuilder.getOne();
    }

    //pagination
    public async paginate(page = 1): Promise<any> {
        const take = 1;
        const [Insurance, total] = await this.insuranceRepo.findAndCount({
            take,
            skip: (page - 1) * take
        });
        return{
            data: Insurance,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }
}