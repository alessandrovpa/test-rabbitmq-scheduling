FROM rabbitmq:3.13.0-management

COPY rabbitmq.conf /etc/rabbitmq
COPY definitions.json /etc/rabbitmq
COPY rabbitmq_delayed_message_exchange-3.13.0.ez /opt/rabbitmq/plugins

RUN rabbitmq-plugins enable rabbitmq_delayed_message_exchange

RUN cat /etc/rabbitmq/rabbitmq.conf

EXPOSE 5672
EXPOSE 15672