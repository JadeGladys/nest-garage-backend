import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, SerializeOptions, UseGuards, UseInterceptors } from "@nestjs/common";
import { LogBookService } from "./logbook.service";
import { AuthGuardJwt } from "src/auth/config/auth.guard.jwt";
import { LogBook } from "./logbook.entity";
import { CurrentUser } from "src/user/current-user.decorator";
import { LogBookDto } from "./input/create-logbook.dto";
import { User } from "src/user/user.entity";

@Controller('/logBook')
@SerializeOptions({strategy: 'excludeAll'})
export class LogBookController{
    constructor(
        private readonly logBookService: LogBookService
    ) {}

    //Get All LogBooks
    @Get('/all')
    @UseGuards(AuthGuardJwt)
    async getAllLogBooks(@Query('page') page = 1): Promise<LogBook[]> {
        return await this.logBookService.paginate(page);
    }

    //Get One LogBook
    @Get(':id')
    @UseGuards(AuthGuardJwt)
    async getLogBookByID(@Param('id') logbook_ID: number) {
        return await this.logBookService.getLogBookById(logbook_ID);
    }

    //Record a New LogBook
    @Post('/record')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(ClassSerializerInterceptor)
    async Record(
        @Body() input: LogBookDto,
        @CurrentUser() user: User
        ) {
        return await this.logBookService.recordInsurance(input, user)
    }
}