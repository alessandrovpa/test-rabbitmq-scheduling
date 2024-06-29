import { Controller, Get, Query } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Controller()
export class AppController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @Get()
  async publish(@Query() query): Promise<void> {
    if (query.seconds)
      this.rabbitmqService.publishScheduledMessage(
        query.message,
        query.seconds,
      );
    else this.rabbitmqService.publishMessage(query.message);
    return query;
  }
}
