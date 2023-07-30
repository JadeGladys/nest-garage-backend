import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { InsuranceService } from "./insurance.service";
import { AuthGuardJwt } from "src/auth/config/auth.guard.jwt";
import { CurrentUser } from "src/user/current-user.decorator";
import { User } from "src/user/user.entity";
import { NewInsuranceRecordDto } from "./input/record-new-insurance.dto";
import { Insurance } from "./insurance.entity";

@Controller('/insurance')
@SerializeOptions({strategy: 'excludeAll'})
export class InsuranceController{
    constructor(
        private readonly insuranceService: InsuranceService
    ) {}


    //Get All Insurances
    @Get()
    @UseGuards(AuthGuardJwt)
    async getAllInsurances(@Query('page') page = 1): Promise<Insurance[]> {
        return await this.insuranceService.paginate(page);
    }

    //Get One Insurance
    @Get(':id')
    @UseGuards(AuthGuardJwt)
    async getInsuranceById(@Param('id') insurance_ID: number) {
        return await this.insuranceService.getInsuranceById(insurance_ID);
    }
    
    //Record a New Insurance
    @Post()
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async Record(
        @Body() input: NewInsuranceRecordDto,
        @CurrentUser() user: User
        ) {
        return await this.insuranceService.recordInsurance(input, user)
    }
}