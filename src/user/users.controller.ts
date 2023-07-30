import { BadRequestException, Body, Controller, Injectable, Post } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "../auth/input/create.user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { emitWarning } from "process";
import { validate } from 'class-validator';

@Controller()
export class UsersController{
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    @Post('register')
    async create(@Body() createUserDto: CreateUserDto){
        const user = new User();

        const errors = await validate(createUserDto);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        
        if(createUserDto.password !== createUserDto.retypedPassword){
            throw new BadRequestException(['Passwords are not similar']);
        }

        const existingUser = await this.userRepository.findOne({
            where: {
                username: createUserDto.username,
                email: createUserDto.email
            },
        });

        if(existingUser){
            throw new BadRequestException(['username or email already exists']);
        }

        user.username = createUserDto.username;
        user.password =  await this.authService.hashPassword(createUserDto.password);
        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;

        return{
            ... (await this.userRepository.save(user)),
            token: this.authService.getTokenForUser(user)
        }
    }
}