import { Channel, Connection, connect } from 'amqplib';

export class RabbitmqService {
  private con: Connection;
  private channel: Channel;

  constructor() {
    this.start();
  }

  private async start(): Promise<void> {
    try {
      this.con = await connect('amqp://guest:guest@localhost:5672');
      this.channel = await this.con.createChannel();

      this.consumeMessage();
    } catch (error) {
      console.log('Rabbitmq error', error);
    }
  }

  async publishMessage(content: string): Promise<boolean> {
    console.log('not scheduled');
    return this.channel.publish(
      'amq.direct',
      'direct-message',
      Buffer.from(content),
    );
  }

  async publishScheduledMessage(content: string, seconds: number) {
    console.log(`scheduled ${seconds} seconds`);
    return this.channel.publish(
      'exchange-scheduler',
      'scheduled-message',
      Buffer.from(content),
      {
        headers: {
          'x-delay': seconds * 1000,
        },
      },
    );
  }

  consumeMessage(): void {
    this.channel.consume('test-queue', async (msg) => {
      console.log('' + msg.content);
      this.channel.ack(msg);
    });
  }
}
