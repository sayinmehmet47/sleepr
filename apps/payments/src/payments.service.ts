import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from '../dto/payments-create.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-08-16',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationClient: ClientProxy,
  ) {}

  // create payment intent
  async createPaymentIntent({ amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
      payment_method: 'pm_card_visa',
    });

    this.notificationClient.emit('notify_email', {
      email,
      text: `Your payment of $${amount} has been processed successfully`,
    });

    return paymentIntent;
  }
}
