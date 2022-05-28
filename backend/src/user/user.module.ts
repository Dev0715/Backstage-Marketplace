import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { EmailModule } from 'src/kit/email/email.module';
import { UploadModule } from 'src/common/upload/upload.module';
import { UserAvatar } from './entities/user_avatar.entity';
import { UserBackground } from './entities/user_background.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAvatar, UserBackground]),
    EmailModule,
    UploadModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
