import { ConsoleLogger } from '@nestjs/common';
import { appendFile } from 'fs';

export class MyLogger extends ConsoleLogger {
  error(message: string, trace: string) {
    appendFile(
      'coded_log.txt',
      message + '\n' + trace + '\n\n',
      function (err) {
        if (err) throw err;
      },
    );
    super.error(message, trace);
  }
}
