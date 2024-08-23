import { Module } from '@nestjs/common';
import { ScoreboardController } from './scoreboard.controller';
import { ScoreboardService } from './scoreboard.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ScoreboardController],

  providers: [ScoreboardService],
})
export class ScoreboardModule {}
