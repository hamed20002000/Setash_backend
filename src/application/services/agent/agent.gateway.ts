import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Server } from 'socket.io';
import { FunctionCallResultType } from './types';

@WebSocketGateway({
  cors: { origin: ['http://localhost:5173'], credentials: false },
  path: '/socket.io',
  transports:  ['websocket', 'polling'],
  namespace:"/agent"
})
export class AgentGateway {
  @WebSocketServer()
  server: Server;
  constructor(
  ) {}


  async sendToolResult(userId: string, data: FunctionCallResultType) {
  this.server
    .to(`user:${userId}`)
    .emit('agent-tool-result', data);
}

  async sendCurrentTool(userId: string, data: any) {
  this.server
    .to(`user:${userId}`)
    .emit('agent-current-tool', data);
}


  handleConnection(client: any) {
    const userId = client.handshake.query.userId;

    if (userId && typeof userId === 'string') {
      client.join(`user:${userId}`);
    }
    
  }

  handleDisconnect(client: any) {
  }
}
