import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '@guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PermissionModule,
    FileModule,
    AuthModule,
    JwtModule,
    ProductModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ApiModule {}
