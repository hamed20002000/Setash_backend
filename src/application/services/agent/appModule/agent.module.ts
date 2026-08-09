import { Module } from '@nestjs/common';
import { AgentSqlService } from '../agentSql.service';
import { AgentToolsService } from '../agentTools.service';
import { ToolRegisterModule } from './toolregister.module';
import { AgentController } from 'src/presentation/controllers/agent/agent.controller';

@Module({
  imports: [
    ToolRegisterModule,
  ],
  providers: [
    AgentSqlService,
    AgentToolsService,
  ],
  exports: [
    AgentSqlService,
    AgentToolsService,
  ],

  controllers: [AgentController],
})
export class AgentModule {}