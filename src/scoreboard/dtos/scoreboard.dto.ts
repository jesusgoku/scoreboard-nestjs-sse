import { Color, Scoreboard } from '../interfaces/scoreboard.interfaces';
import { Min, Max, IsIn, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class ScoreboardDto implements Scoreboard {
  // id?: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  matchTime: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  time: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  aoScore: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  akaScore: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  aoFaults: number;

  @IsInt()
  @Min(0)
  @Max(5)
  @IsNotEmpty()
  akaFaults: number;

  @IsIn(['aka', 'ao'])
  @IsOptional()
  senshu?: Color;

  @IsIn(['aka', 'ao', 'hikiwake'])
  @IsOptional()
  winner?: Color | 'hikiwake';
}
