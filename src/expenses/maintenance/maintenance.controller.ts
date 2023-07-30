import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { MaintenanceService } from "./maintenance.service";
import { AuthGuardJwt } from "src/auth/config/auth.guard.jwt";
import { NewMaintenanceRecordDto } from "../input/record-maintenance.dto";
import { CurrentUser } from "src/user/current-user.decorator";
import { User } from "src/user/user.entity";
import { MaintenanceExpense } from "./maintenanceExpense.entity";

@Controller('/maintenance')
@SerializeOptions({strategy: 'excludeAll'})
export class MaintenanceController{
    constructor(
        private readonly maintenanceService: MaintenanceService
    ) {}

    //Get All Maintenance Expenses
    @Get('/all')
    @UseGuards(AuthGuardJwt)
    async getAllLogBooks(@Query('page') page = 1): Promise<MaintenanceExpense[]> {
        return await this.maintenanceService.paginate(page);
    }

    //Get One Maintenance Expense
    @Get(':id')
    @UseGuards(AuthGuardJwt)
    async getLogBookByID(@Param('id') MaintenanceExpense_ID: number) {
        return await this.maintenanceService.getMaintenanceExpenseById(MaintenanceExpense_ID);
    }

    //Record New Maintenance Expense
    @Post('/record')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async Record(
        @Body() input: NewMaintenanceRecordDto,
        @CurrentUser() user: User
        ) {
        return await this.maintenanceService.recordInsurance(input, user)
    }
}