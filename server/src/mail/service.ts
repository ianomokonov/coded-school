import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  async sendMail(options: ISendMailOptions): Promise<void> {
    await this.mailer.sendMail(options);
  }
}
