export class CreateTrainerDto {
  topicId: number;
  name: string;
  templatesDir: string;
  task: string;
  files: Express.Multer.File[];
}
