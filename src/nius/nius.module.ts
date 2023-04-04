import { Module } from '@nestjs/common';
import { NiusController } from './nius.controller';
import { NiusService } from './nius.service';

@Module({
  controllers: [NiusController],
  providers: [NiusService]
})
export class NiusModule {}
