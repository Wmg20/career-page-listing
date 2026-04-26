import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortalsModule } from './portals/portals.module';

@Module({
  imports: [PortalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
