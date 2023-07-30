import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehiclesService } from "src/vehicles/vehicles.service";
import { Repository } from "typeorm";
import { LogBook } from './logbook.entity';
import { LogBookDto } from "./input/create-logbook.dto";
import { User } from "src/user/user.entity";

@Injectable()
export class LogBookService{
    constructor(
        // @InjectRepository(Vehicle)
        // private readonly vehicleRepo: Repository<Vehicle>,
        @InjectRepository(LogBook)
        private readonly logBookRepo: Repository<LogBook>,
        private readonly vehicleService: VehiclesService
    ){}

    private getLogBookBaseQuery(){
        return this.logBookRepo
            .createQueryBuilder('l')
            .orderBy('l.logbook_ID','ASC');
    }

    //record LogBook
    public async recordInsurance(input:LogBookDto, user:User): Promise<LogBook>{
        const vehicle = await this.vehicleService.getVehicleByRegistrationNo(input.VIN);
        if (!vehicle) {
        throw new NotFoundException(`Vehicle with registration number ${input.VIN} not found`);
        }

        const logBook = this.logBookRepo.create({
            ...input,
            vehicle: vehicle,
            recordedBy: user
          });
        
          const savedLogBook = await this.logBookRepo.save(logBook);
          return savedLogBook;
    }

    //get all logBooks
    async getAllLogBooks(): Promise<LogBook[]> {
        const queryBuilder = this.getLogBookBaseQuery();
        return await queryBuilder.getMany();
    }

    //get one logBook
    public async getLogBookById(logbook_ID: number): Promise<LogBook> {
        const queryBuilder = this.getLogBookBaseQuery();
        queryBuilder.where('l.logbook_ID = :logbook_ID', { logbook_ID });
        return await queryBuilder.getOne();
    }

    //pagination
    public async paginate(page = 1): Promise<any> {
        const take = 1;
        const [LogBook, total] = await this.logBookRepo.findAndCount({
            take,
            skip: (page - 1) * take
        });
        return{
            data: LogBook,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }
    }
}