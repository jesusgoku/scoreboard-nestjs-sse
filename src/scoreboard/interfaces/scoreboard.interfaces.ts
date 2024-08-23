export type Color = 'ao' | 'aka';

export interface Scoreboard {
  id?: string;

  matchTime: number;
  time: number;

  aoScore: number;
  akaScore: number;

  aoFaults: number;
  akaFaults: number;

  senchu?: Color;

  winner?: Color | 'hikiwake';
}
