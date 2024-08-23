import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'node:events';
import { Scoreboard } from './interfaces/scoreboard.interfaces';

@Injectable()
export class ScoreboardService extends EventEmitter<{
  'scoreboard:update': [Scoreboard];
}> {}
