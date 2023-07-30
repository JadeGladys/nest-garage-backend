import { Injectable, NotFoundException } from '@nestjs/common';
import { VehicleAffectation } from './vehicle-affectation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAffectationDto} from '../input/create-affectation.dto';
import { VehiclesService } from '../vehicles.service';
import { UpdateAffectationDto } from '../input/update-affectation.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AffectationService{
    constructor(
        @InjectRepository(VehicleAffectation)
        private readonly AffectationRepo: Repository<VehicleAffectation>,
        private readonly vehicleService: VehiclesService
    ){}

    private getVehicleAffectationBaseQuery(){
        return this.AffectationRepo
            .createQueryBuilder('v')
            .orderBy('v.affectation_ID','ASC');
    }

    //record affectation
    public async createAffectation(input:CreateAffectationDto, user:User): Promise<VehicleAffectation>{
        const vehicle = await this.vehicleService.getVehicleByRegistrationNo(input.VIN);
        if (!vehicle) {
        throw new NotFoundException(`Vehicle with registration number ${input.VIN} not found`);
        }

        const affecation = this.AffectationRepo.create({
            ...input,
            StartDate: new Date(input.StartDate),
            EndDate: new Date(input.EndDate),
            vehicle: vehicle.vehicle_ID,
            recordedByID: user
          });
        
          const savedAffectation = await this.AffectationRepo.save(affecation);
          return savedAffectation;
    }

    //get all affectation
    async getAllAffectation(): Promise<VehicleAffectation[]> {
        const queryBuilder = this.getVehicleAffectationBaseQuery();
        return await queryBuilder.getMany();
    }

    //get one vehicle
    public async getAffecationById(affectation_ID: number): Promise<VehicleAffectation> {
        const queryBuilder = this.getVehicleAffectationBaseQuery();
        queryBuilder.where('v.affectation_ID = :affectation_ID', { affectation_ID });
        return await queryBuilder.getOne();
    }

    //update affectation info
    public async updateAffecation(affectation: VehicleAffectation, input: UpdateAffectationDto): Promise<VehicleAffectation>{
        const updatedAffectation = await this.AffectationRepo.save({
            ...affectation,
            ...input
          });
        
        return this.getAffecationById(updatedAffectation.affectation_ID);
    }
}