import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OllamaAssistantService } from 'src/agent/ollama-assistant.service';

@Controller('api/assistant')
@ApiTags('Assistant')
export class AgentAssistantController {
  constructor(private readonly assistantService: OllamaAssistantService) {}

  @Post('chat')
  async chat(@Body() body: { text?: string; audioBase64?: string; audioMimeType?: string; fileName?: string }) {
    return this.assistantService.handleUserRequest(body);
  }

  @Post('sql')
  async generateSql(@Body() body: { text?: string }) {
    return this.assistantService.generateSqlOnly(body.text);
  }
}
