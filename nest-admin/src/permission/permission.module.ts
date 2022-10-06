import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';
import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';

import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    CommonModule
  ],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}
