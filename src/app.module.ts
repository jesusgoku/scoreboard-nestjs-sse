import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScoreboardModule } from './scoreboard/scoreboard.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ScoreboardModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
