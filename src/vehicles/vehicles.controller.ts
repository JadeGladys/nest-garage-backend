import { Body, ClassSerializerInterceptor, Controller, ForbiddenException, Get, Injectable, NotFoundException, Param, Patch, Post, Query, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service";
import { CurrentUser } from "src/user/current-user.decorator";
import { NewVehicleRecordDto } from "./input/record-new-vehicle.dto";
import { User } from "src/user/user.entity";
import { AuthGuardJwt } from "src/auth/config/auth.guard.jwt";
import { Vehicle } from "./vehicle.entity";
import { UpdateVehicleDto } from "./input/update-vehicle-dto";
import { QueryBuilder } from "typeorm";

@Controller('/vehicle')
@SerializeOptions({strategy: 'excludeAll'})
export class VehiclesController{
    constructor(
        private readonly vehiclesService: VehiclesService
    ) {}


    //Get All Vehicles
    @Get()
    @UseGuards(AuthGuardJwt)
    async getAllVehicles(@Query('page') page = 1): Promise<Vehicle[]> {
        return await this.vehiclesService.paginate(page);
    }

    //Get One Vehicle
    @Get(':id')
    @UseGuards(AuthGuardJwt)
    async getEventById(@Param('id') vehicle_ID: number) {
        return await this.vehiclesService.getVehicleById(vehicle_ID);
    }
    
    //Record a New Vehicle
    @Post('/record')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async Record(
        @Body() input: NewVehicleRecordDto,
        @CurrentUser() user: User
        ) {
        return await this.vehiclesService.recordVehicle(input, user)
    }

    //Update A Vehicle
    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @Param('id') vehicle_ID, 
        @Body() input: UpdateVehicleDto,
        @CurrentUser() user: User
        ) {
        const vehicle = await this.vehiclesService.getVehicleById(vehicle_ID);

        if(!vehicle){
            throw new NotFoundException(`Vehicle with ID ${vehicle_ID} not found`);  
        }

        if(vehicle.recordedByID !== user.id){
            throw new ForbiddenException(
                null, `You are not authorized to change this vehicle's data`
            );
        }

        return await this.vehiclesService.updateVehicle(vehicle, input);
    }
}