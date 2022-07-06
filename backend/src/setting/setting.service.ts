import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getFromDto } from '../common/utils/repository.util';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async setSetting(payload: any[]) {
    for (let i = 0; i < payload.length; i++) {
      const setting: Setting = getFromDto(payload[i], new Setting());
      const existing = await this.settingRepository.find({
        key: payload[i].key,
      });
      if (existing.length) {
        await this.settingRepository.update(existing[0].id, payload[i]);
      } else {
        await this.settingRepository.save(setting);
      }
    }
  }

  getAllSettings(): Promise<Setting[]> {
    return this.settingRepository.find({});
  }
}
