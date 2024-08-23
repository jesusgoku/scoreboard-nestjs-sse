import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
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
  constructor(private readonly scoreboardService: ScoreboardService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() data: ScoreboardDto) {
    this.scoreboardService.emit('scoreboard:update', { ...data, id });
  }

  @Sse(':id')
  sse(@Param('id') id: string): Observable<MessageEvent> {
    return new Observable((subscriber) => {
      this.scoreboardService.on('scoreboard:update', (data) => {
        if (id === data.id) {
          subscriber.next({ data });
        }
      });
    });
  }
}
