import { CoreModule } from '@/core/core.module';
import { DatabaseModule } from '@/database/database.module';
import { HealthModule } from '@/modules/health/health.module';
import { SharedModule } from '@/modules/shared/shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    HealthModule,
    SharedModule,
  ],
})
export class AppModule {}
