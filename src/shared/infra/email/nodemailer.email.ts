import { EmailSenderPort } from '../../application/ports/email.port';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

export class NodemailerEmail implements EmailSenderPort {
  private readonly transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('email.host'),
      port: this.config.get<number>('email.port'),
      secure: this.config.get<boolean>('email.secure') ?? false,
      auth: {
        user: this.config.get<string>('email.user'),
        pass: this.config.get<string>('email.pass'),
      },
    });
  }

  async send(params: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    from?: string;
  }): Promise<void> {
    const from = params.from ?? this.config.get<string>('email.from');
    await this.transporter.sendMail({ ...params, from });
  }
}
