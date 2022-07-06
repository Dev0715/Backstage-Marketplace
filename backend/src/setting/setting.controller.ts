import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SetSettingDto } from './dtos/set-setting.dto';
import { SettingDto } from './dtos/setting.dto';
import { SettingService } from './setting.service';

@Controller('api/setting')
@ApiTags('Setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post('set')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({})
  async set(@Body() body: SetSettingDto[], @Request() req) {
    try {
      await this.settingService.setSetting(body);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  @Get('all')
  @ApiOkResponse({ type: SettingDto })
  async get(): Promise<any> {
    const settings = await this.settingService.getAllSettings();
    return {
      success: true,
      settings: settings.map((setting) => setting.toSettingDto()),
    };
  }
}
