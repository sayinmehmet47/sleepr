import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  // add this method to handle the error
  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      new UnauthorizedException();
    }
    return user;
  }
}
