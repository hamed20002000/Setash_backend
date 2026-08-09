// tool-register.module.ts
import { Global, Module } from '@nestjs/common';
import { ToolRegister } from '../toolRegister';
import { AgentController } from 'src/presentation/controllers/agent/agent.controller';

@Global()
@Module({
  providers: [ToolRegister],
  exports: [ToolRegister],
})
export class ToolRegisterModule {}