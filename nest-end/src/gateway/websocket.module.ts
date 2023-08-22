// websocket.module.ts
import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gatway';

@Module({
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
