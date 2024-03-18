/* tslint:disable */
/* eslint-disable */
import { TrainerShortDto } from '../models/trainer-short-dto';
export interface MarathonInfoDto {
  difficulty: 'junior' | 'middle' | 'senior';
  id: number;
  name: string;
  points: number;
  time?: number;
  trainers?: Array<TrainerShortDto>;
}
