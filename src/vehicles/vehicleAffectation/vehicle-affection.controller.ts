import { Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseGuards, UseInterceptors, Get, Param, Patch, NotFoundException, ForbiddenException } from '@nestjs/common';
import { AffectationService } from './vehicle-affectation.service';
import { AuthGuardJwt } from 'src/auth/config/auth.guard.jwt';
import { CreateAffectationDto } from '../input/create-affectation.dto';
import { CurrentUser } from 'src/user/current-user.decorator';
import { User } from 'src/user/user.entity';
import { VehicleAffectation } from './vehicle-affectation.entity';
import { UpdateAffectationDto } from '../input/update-affectation.dto';

@Controller('/affectation')
@SerializeOptions({strategy: 'excludeAll'})
export class AffectationController{
    constructor(
        private readonly affectationService: AffectationService
    ) {}

    //Get All Affectation
    @Get('/all')
    @UseGuards(AuthGuardJwt)
    async getAllAffectations(): Promise<VehicleAffectation[]> {
        return await this.affectationService.getAllAffectation();
    }

    //Get One Vehicle
    @Get(':id')
    @UseGuards(AuthGuardJwt)
    async getEventById(@Param('id') affectation_ID: number) {
        return await this.affectationService.getAffecationById(affectation_ID);
    }

    //create an affectation
    @Post('/create')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async Create(
        @Body() input: CreateAffectationDto,
        @CurrentUser() user: User
        ) {
        return await this.affectationService.createAffectation(input, user)
    }

    //Update A Vehicle
    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(
        @Param('id') affectation_ID, 
        @Body() input: UpdateAffectationDto,
        @CurrentUser() user: User
        ) {
        const affectation = await this.affectationService.getAffecationById(affectation_ID);

        if(!affectation){
            throw new NotFoundException(`Affectation with ID ${affectation_ID} not found`);  
        }

        if(affectation.recordedBy !== user.id){
            throw new ForbiddenException(
                null, `You are not authorized to change this affectation's data`
            );
        }

        return await this.affectationService.updateAffecation(affectation, input);
    }
}