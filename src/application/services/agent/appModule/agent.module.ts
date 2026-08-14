import { Module } from '@nestjs/common';
import { AgentSqlService } from '../agentSql.service';
import { AgentToolsService } from '../agentTools.service';
import { ToolRegisterModule } from './toolregister.module';
import { AgentController } from 'src/presentation/controllers/agent/agent.controller';
import { AgentGateway } from '../agent.gateway';

@Module({
  imports: [
    ToolRegisterModule,
  ],
  providers: [
    AgentSqlService,
    AgentToolsService,
    AgentGateway
  ],
  exports: [
    AgentSqlService,
    AgentToolsService,
    AgentGateway
  ],

  controllers: [AgentController],
})
export class AgentModule {}