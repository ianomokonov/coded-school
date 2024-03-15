export class CreateTrainerDto {
  name: string;
  templatesDir: string;
  task: string;
  files: Express.Multer.File[];
}
