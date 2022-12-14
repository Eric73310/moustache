import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { HasPermission } from 'src/permission/has-permission.decorator';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {

    constructor(
        private userService: UserService,
        private authService: AuthService
        ) {

    }

    @Get()
    @HasPermission('users')
    async all(@Query('page')page = 1): Promise<PaginatedResult> {
        return this.userService.paginate(page);
    }

    @Post()
    @HasPermission('users')
    async create(@Body() body: UserCreateDto): Promise<User> {
        const password = await bcrypt.hash('1234', 12);

        const {roleId, ...data} = body;
        

        return this.userService.create({
            ...data,
            password,
            role: {id: body.roleId}
        });
    }

    @Get(':id')
    @HasPermission('users')
    async get(@Param('id') id:number) {
        return this.userService.findOneBy({id});
    }

    @Put('info')
    async updateInfo(
        @Req() request: Request,
        @Body() body: UserUpdateDto){

        const id = await this.authService.userId(request);

        await this.userService.update(id, body);

        return this.userService.findOneBy({id});
    }

    @Put('password')
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ){

        if(password !== password_confirm) {
            throw new BadRequestException('Passwords do not match!');
        }

        const id = await this.authService.userId(request);

        const hashed = await bcrypt.hash(password, 12);
        
        await this.userService.update(id, {
            password: hashed
        });

        return this.userService.findOneBy({id});

    }

    @Put(':id')
    //@HasPermission('users')
    async update(
    @Param('id') id: number,
    @Body() body: UserUpdateDto
    ) {
        const {roleId, ...data} = body;
        await this.userService.update(id, {
            ...data,
            role: {id: roleId}
        });

        return this.userService.findOneBy({id});
    }

    @Delete(':id')
    @HasPermission('users')
    async delete(@Param('id') id:number){
         return this.userService.delete(id);
    }
}
