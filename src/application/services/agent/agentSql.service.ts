import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { CondinateToolsTyes } from './types';
import { AgentToolsService } from './agentTools.service';


type FunctionCallResultType={
    result:"error"|"success",
    message:string,
    list:any[]
}


@Injectable()
export class AgentSqlService {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
        private readonly agentToolsService: AgentToolsService
        
    ) {

    }

    async runPrompt(prompt: string, systemContent: string): Promise<string> {
        //  const schemaContext = readFileSync(
        //            join(process.cwd(), 'src/agent/schema_semantic_documentation.md'),
        //            'utf8'
        //    );

        const ollamareq: ChatRequest = {
            model: "qwen3:8b",
            messages: [
                {
                    role: 'system',
                    content: systemContent
                },
                {
                    role: "user",
                    content: prompt
                }],
            stream: false,
            options: {
                temperature: 0,
                top_p: 0.9,
                repeat_penalty: 1.1
            }

        }


        const resp = await axios.post(
            "http://localhost:11434/api/chat",
            JSON.stringify({
                ...ollamareq, format: {
                    "type": "object",
                    "properties": {
                        "sql": {
                            "type": "string"
                        },
                        "error": {
                            "type": "string"
                        },
                        "fields": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    }
                }
            }),

            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );


        return resp.data.message.content;

    }
    async executeQuery(text: string): Promise<void> {

        this.dataSource.query(text);
    }
    async extractSchema(prompt: string): Promise<string> {



        const systemRules = `You are a database table selection agent.

Your ONLY task is to select required database tables.

Rules:
- Use ONLY tables from the provided catalog.
- Never explain your answer.
- Never generate SQL.
- Never show reasoning.
- Return ONLY JSON.
- The response must start with { and end with }.

Output format:

{
  "tables": ["TableName"]
}`


        prompt = `
Table catalog:

${JSON.stringify(tables, null, 2)}

Request:
${prompt}`;



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
                        tables: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        }
                    },
                    required: ["tables"]
                }
            }),

            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const tablesResponse = JSON.parse(resp.data.message.content)?.tables || [];
        const selectedTables = [];
        for (const tableName of tablesResponse) {
            const table = schema.tables.find(t => t.name === tableName);
            if (table) {
                selectedTables.push(table);
            }
        }

        return JSON.stringify(selectedTables, null, 2);
    }

    async FunctionCallingOrSqlSelection(prompt: string): Promise<string> {

        const systemContent = readFileSync(
            join(process.cwd(), 'src/application/services/agent/prompts/selector.prompt'),
            'utf8'
        );
        const ollamareq: ChatRequest = {
            model: "qwen3:8b",
            messages: [
                {
                    role: 'system',
                    content: systemContent
                },
                {
                    role: "user",
                    content: prompt
                }],
            stream: false,
            options: {
                temperature: 0,
                top_p: 0.9,
                repeat_penalty: 1.1
            }

        }


        const resp = await axios.post(
            "http://localhost:11434/api/chat",
            JSON.stringify({
                ...ollamareq, format: {
                    type: "object",
                    properties: {
                        decision: {
                            type: "string",
                            enum: [
                                "functionCalling",
                                "sql"
                            ]
                        }
                    },
                    required: [
                        "decision"
                    ]
                }
            }),

            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        return JSON.parse(resp.data.message.content).decision;
    }

    async converToolsToembeddingDocument(): Promise<void> {

        const toolList = tools.tools;
        const embeddingList: {
            tool_name: string;
            document: string;
        }[] = [];
        for (const tool of toolList) {

            const prompt = `Convert this tool definition into an embedding document.
                    The document should contain:
                    - Tool name
                    - Description
                    - When to use
                    - Business keywords
                    - Examples
                    Do not add unsupported functionality.
                    Tool Definition: ${JSON.stringify(tool)}`;

            const ollamareq: ChatRequest = {
                model: "qwen3:8b",
                messages: [
                    {
                        role: 'system',
                        content: "you are a tool embedding document generator. You will receive a tool definition and you need to convert it into an embedding document. The document should contain the following fields: Tool name, Description, When to use, Business keywords, Examples. Do not add unsupported functionality."
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
                    ...ollamareq
                }),

                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            embeddingList.push({
                tool_name: tool.name,
                document: resp.data.message.content
            });
        }

        const markdownContent = embeddingList
            .map(item => {
                return `
                                # Tool Name
                                ${item.tool_name}

                                ${item.document}

                                ---

                                `;
            })
            .join("\n");

        writeFileSync(
            "src/application/services/agent/localFiles/tool_embedding_docs.md",
            markdownContent
        );
    }

    async createVectorBased(): Promise<void> {
        const toolEmbeddingDocs = JSON.parse(readFileSync(
            join(process.cwd(), 'src/application/services/agent/localFiles/tool_embedding_docs.json'),
            'utf8'
        )) as unknown as {
            tool_name: string;
            embedding_text:string
        }[];




        for (const doc of toolEmbeddingDocs) {

            const document = `
                ${doc.embedding_text}
                `;
            ;
            const resp = await axios.post(
                        "http://localhost:11434/api/embed", {
                        model: "bge-m3:latest",
                        input: document
                    }
            )

            await this.dataSource.query(
                `
                INSERT INTO "EmbeddingTool"
                    ("ToolName", "Document", "Embedding")
                VALUES
                    ($1, $2, $3)
                `,
                [
                    doc.tool_name,
                    doc.embedding_text,
                    `[${resp.data.embeddings[0].join(",")}]`
                ]
            );
        }

    }

    async getCondinateToolsForRunPrompt(prompt: string): Promise<string[]> {

        const resp = await axios.post(
            "http://localhost:11434/api/embed", {
            model: "bge-m3:latest",
            input: prompt
        }
        )

        const queryResult:CondinateToolsTyes[]= await this.dataSource.query(
                `
               SELECT
                "ToolName",
                "Embedding" <=> $1 AS distance
                FROM "EmbeddingTool"
                ORDER BY "Embedding" <=> $1
                LIMIT 5;
                `,
                [
                    `[${resp.data.embeddings[0].join(",")}]`
                ]
            ) as CondinateToolsTyes[];

                return queryResult.map((item,index)=>item.ToolName)

    }
    async RunFunctionCalling(prompt:string,req:any,files: string[]):Promise<FunctionCallResultType>{
        try{
            const condinateToolsName=await this.getCondinateToolsForRunPrompt(prompt)
            const selectedToolName=await this.agentToolsService.extractSelectedTool(prompt,condinateToolsName);
            const selectedTool=await this.agentToolsService.extractTools(prompt,selectedToolName);
            await this.agentToolsService.executeTool(selectedTool.functionName,{...selectedTool.parameters,files:files},req);

            return{
                result:"success",
                message:prompt,
                list:[]
            }

        }
        catch(error){

            //throw new HttpException(error?.message||"İşlem gerçekleştirilirken hata oluştu.", HttpStatus.BAD_REQUEST);
                    return{
                             result:"error",
                             message:error?.message||"İşlem gerçekleştirilirken hata oluştu.",
                             list:[]
                    }
        }
    }
}