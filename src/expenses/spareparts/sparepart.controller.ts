import { Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { SparePartService } from "./sparepart.service";
import { AuthGuardJwt } from "src/auth/config/auth.guard.jwt";
import { NewSparePartRecordDto } from "../input/record-sparepart.dto";
import { CurrentUser } from "src/user/current-user.decorator";
import { User } from "src/user/user.entity";

@Controller('/sparepart')
@SerializeOptions({strategy: 'excludeAll'})
export class SparePartController{
    constructor(
        private readonly sparePartService: SparePartService
    ) {}

    //Record a New Spare Part
    @Post('/record')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async Record(
        @Body() input: NewSparePartRecordDto,
        @CurrentUser() user: User
        ) {
        return await this.sparePartService.recordSparePart(input, user)
    }
}