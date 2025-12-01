import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwt: JwtService) { }

    async register(dto) {
        const userExists = await this.usersService.findByEmail(dto.email);
        if (userExists) throw new UnauthorizedException('Email already exists');

        const hashPass = await bcrypt.hash(dto.password, 10);

        const user = await this.usersService.create({
            ...dto,
            password: hashPass,
        });

        return { message: 'Registered successfully', user };
    }

    async login(dto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid email');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid password');

    const accessToken = await this.jwt.signAsync(
      { id: user.id, email: user.email, role: user.role },
      { secret: 'ACCESS_SECRET', expiresIn: '15m' },
    );

    const refreshToken = await this.jwt.signAsync(
      { id: user.id },
      { secret: 'REFRESH_SECRET', expiresIn: '7d' },
    );

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
      message: 'Login successful',
      accessToken,
      refreshToken,
      user,
    };
  }
}
