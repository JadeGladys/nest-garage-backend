import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Request, SerializeOptions, UnauthorizedException, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "../user/current-user.decorator";
import { User } from '../user/user.entity';
import { AuthGuardLocal } from "./config/auth.guard.local";
import { AuthGuardJwt } from "./config/auth.guard.jwt";
import { NotFoundError } from "rxjs";
import * as bcrypt from 'bcrypt';

@Controller('auth')
@SerializeOptions({strategy:'excludeAll'})
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }
  @Post('login')
  @UseGuards(AuthGuardLocal)
  async login(@CurrentUser() user: User) {
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    return {
      userId: user.id,
      token: this.authService.getTokenForUser(user),
    };
  }
  
  @Post('log')
  async logs(
    @Body('username') username: string,
    @Body('password') password: string
  ){
    const user = await this.authService.findOne({ username: username });

    if(!user) {
      throw new NotFoundError('User not found');
    }

    if(!await bcrypt.compare(password, user.password)){
      throw new BadRequestException('Invalid credentials');
    }

    return {
      userId: user.id,
      token: this.authService.getTokenForUser(user),
    };
  }

  @Get('profile')
  @UseGuards(AuthGuardJwt)
  async getProfile(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  // @Post('logout')
  // @UseGuards(AuthGuardJwt)
  // async logout(@CurrentUser() user: User) {
  //   const token = this.authService.getTokenForUser(user)

  //   this.authService.invalidateToken(token);
  //   return { message: 'Logout successful' };
  // }

}
