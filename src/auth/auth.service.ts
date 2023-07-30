import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/user.entity";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    public getTokenForUser(user: User): string{
        return this.jwtService.sign({
            username: user.username,
            sub: user.id
        });
    }

    public async hashPassword(password: string): Promise<string>{
        return await bcrypt.hash(password, 10);
    }

    // async findOne(condition): Promise<User> {
    //     return this.userRepository.findOne(condition);
    // }
    async findOne(condition): Promise<User> {
        const [user] = await this.userRepository.find({ where: condition });
        return user;
      }
      
}