import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodeMailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodeMailer.createTransport({
    // with google
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get<string>('SMTP_USER'),
      clientId: this.configService.get<string>('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: this.configService.get<string>('GOOGLE_AUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get<string>('GOOGLE_AUTH_REFRESH_TOKEN'),
    },
  });

  async notifyEmail(data: { email: string }) {
    try {
      const response = await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_USER'),
        to: data.email,
        subject: 'Test',
        text: 'Test',
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
