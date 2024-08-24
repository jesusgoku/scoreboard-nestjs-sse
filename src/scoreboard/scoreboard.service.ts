import { Injectable, Logger, MessageEvent } from '@nestjs/common';
import { EventEmitter } from 'node:events';
import { Scoreboard } from './interfaces/scoreboard.interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class ScoreboardService extends EventEmitter<{
  'scoreboard:update': [Scoreboard];
}> {
  private readonly logger = new Logger(ScoreboardService.name);

  updateState(scoreboard: Scoreboard) {
    const logCtx = '[method: updateState]';

    this.logger.debug(`${logCtx} receive an update for id: ${scoreboard.id}`);

    this.emit('scoreboard:update', scoreboard);
  }

  subscribeUpdates(id: string) {
    const logCtx = '[method: subscribeUpdates]';

    this.logger.debug(`${logCtx} calling with scoreboard id: ${id}`);

    const obs: Observable<MessageEvent> = new Observable((subscriber) => {
      this.logger.debug(
        `${logCtx} subscription start for scoreboard id: ${id}`,
      );

      const handler = (data) => {
        this.logger.debug(
          `${logCtx} handle "scoreboard:update" for id: ${data.id}`,
        );

        if (id === data.id) {
          this.logger.debug(`${logCtx} emit subscription next for id: ${id}`);

          subscriber.next({ data });
        }
      };

      subscriber.add(() => {
        this.logger.debug(
          `${logCtx} clean up listener to "scoreboard:update" for id: ${id}`,
        );

        this.off('scoreboard:update', handler);
      });

      this.on('scoreboard:update', handler);
    });

    return obs;
  }
}
