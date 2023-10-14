import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  notifyEmail(data: { email: string }) {
    return `This action returns a #${data.email} notification`;
  }
}
