import { Injectable } from '@nestjs/common';
import { Email } from './_models/email.interface';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {
  }

  public sendEmail(email: Email): any {
    this.mailerService.sendMail({
      to: email.to,
      from: email.from,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
  }
}
