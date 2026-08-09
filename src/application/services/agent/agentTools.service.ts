import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Roles } from 'src/domain/entities/Roles';
import { RoleRepository } from 'src/infrastructure/repositories/user/role.repository';
import { RoleMenuOperations } from 'src/domain/entities/RoleMenuOperations';
import { RoleMenuOperationRepository } from 'src/infrastructure/repositories/user/role-menu-operation.repository';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ChatRequest, Tool } from 'src/agent/types';
import axios from "axios";
import { DataSource } from "typeorm";
import { InjectDataSource } from '@nestjs/typeorm';
import tables from 'src/agent/tables.json';
import schema from 'src/application/services/agent/schema.json';
import { extractRelations } from './extractRelations';
import tools from 'src/application/services/agent/localFiles/tools.json';
import { CondinateToolsTyes, ExtracteToolsType } from './types';
import { ToolRegister } from './toolRegister';


@Injectable()
export class AgentToolsService {
    constructor(
        private readonly toolRegister: ToolRegister,
        @InjectDataSource() private readonly dataSource: DataSource
    ) {

    }

    async extractSelectedTool(prompt: string, condinateTools: string[]): Promise<string> {
        const systemRules = `
You are a tool selection agent.

Your tasks:
1. Select exactly one function from the provided tools.
2. Just return function name.
3. Return valid JSON only.

Tool selection rules:
- Choose the function that matches the user's intent.
- Do not select multiple functions.

Available tools:
${condinateTools.join(", ")}

Tool schemas:
${JSON.stringify(
            tools.tools.filter((item) => {
                if (condinateTools.find((condic, index) => condic == item.name) != undefined) {
                    return item;
                }
            })
        )}
`;

        const ollamareq: ChatRequest = {
            model: "qwen3:8b",
            messages: [
                {
                    role: 'system',
                    content: systemRules
                },
                {
                    role: "user",
                    content: prompt
                }],
            stream: false,
        }
        const resp = await axios.post(
            "http://localhost:11434/api/chat",
            JSON.stringify({
                ...ollamareq, format: {
                    type: "object",
                    properties: {
                        functionName: {
                            type: "string"
                        }
                    },
                    required: ["functionName"]
                }
            }),

            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        return  JSON.parse(resp.data.message.content).functionName;



    }

    async extractTools(prompt: string, condinateTool: string): Promise<ExtracteToolsType> {

        var selectedTool;
        const systemRules = `
You are a tool selection agent.

Your tasks:
1. Select exactly one function from the provided tools.
2. Extract the required parameters for that function.
3. Return valid JSON only.

Tool selection rules:
- Choose the function that matches the user's intent.
- Do not select multiple functions.

Parameter extraction rules:

- Extract only the actual entity value required by the function.
- Remove surrounding words from the user's sentence.
- Return the value as it should exist in the database.
- Keep the original language and writing system of the entity.
- Never translate parameter values.
- Never transliterate parameter values.
- Never convert one language into another language.
- Never replace a value with a synonym.
- Never invent a new value.
- Never change the meaning of the value.
- Do not correct spelling.

Important:
- If the user adds language-specific grammar around an entity, remove only that grammar part.
- Keep the original entity unchanged.
- The output should represent the same entity mentioned by the user.

Examples of behavior:
- "user's entity" -> return only the entity
- "entity with grammatical changes" -> return the original entity without those changes

Parameter values must not be translated or rewritten.

Available tools:
${condinateTool}

Tool schemas:
${JSON.stringify(
            tools.tools.filter((item) => {
                if (item.name == condinateTool) {
                    selectedTool = item;
                    return item;
                }
            })
        )}
`;

        const ollamareq: ChatRequest = {
            model: "qwen3:8b",
            messages: [
                {
                    role: 'system',
                    content: systemRules
                },
                {
                    role: "user",
                    content: prompt
                }],
            stream: false,
        }
        const resp = await axios.post(
            "http://localhost:11434/api/chat",
            JSON.stringify({
                ...ollamareq, format: {
                    type: "object",
                    properties: {
                        functionName: {
                            type: "string"
                        },
                        confidence: {
                            type: "number"
                        },
                        parameters: selectedTool.parameters
                    },
                    required: ["functionName", "parameters", "confidence"]
                }
            }),

            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const result: ExtracteToolsType = {
            functionName: JSON.parse(resp.data.message.content).functionName,
            parameters: JSON.parse(resp.data.message.content).parameters,
            confidence: JSON.parse(resp.data.message.content).confidence
        }
        return result



    }


    async executeTool(toolName: string, parameter: any, req: any): Promise<string> {

        const result = await this.toolRegister.execute(toolName, { ...parameter, req });

        return result ?? "";





    }
}