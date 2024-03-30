export class UpdateTaskDto {
  topicId?: number;
  name?: string;
  templatesDir?: string;
  task?: string;
  filesToDelete?: string[];
}
