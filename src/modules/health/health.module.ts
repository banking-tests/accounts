import { Module } from '@nestjs/common';

import { HealthService } from '@/modules/health/application/services/health.service';
import { HealthController } from '@/modules/health/infrastructure/controllers/health.controller';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
