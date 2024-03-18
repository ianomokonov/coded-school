/* tslint:disable */
/* eslint-disable */
import { TrainerShortDto } from '../models/trainer-short-dto';
export interface SaveMarathonDto {
  difficulty: 'junior' | 'middle' | 'senior';
  name: string;
  points: number;
  time?: number;
  trainers?: Array<TrainerShortDto>;
}
