import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  MessageEvent,
  Param,
  Patch,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ScoreboardService } from './scoreboard.service';
import { ScoreboardDto } from './dtos/scoreboard.dto';

@Controller('/scoreboard')
export class ScoreboardController {
  private readonly logger = new Logger(ScoreboardController.name);

  constructor(private readonly scoreboardService: ScoreboardService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() data: ScoreboardDto) {
    this.scoreboardService.updateState({ ...data, id });
  }

  @Sse(':id')
  sse(@Param('id') id: string): Observable<MessageEvent> {
    return this.scoreboardService.subscribeUpdates(id);
  }
}
