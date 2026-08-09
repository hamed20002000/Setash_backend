import { MigrationInterface, QueryRunner } from "typeorm";


export class CreateEmbeddingTool1710000000000 implements MigrationInterface{

   name = 'CreateEmbeddingTool1710000000000'

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS vector;
    `);

    await queryRunner.query(`
      CREATE TABLE "EmbeddingTool" (
        "Id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "ToolName" varchar NOT NULL,
        "Document" text NOT NULL,
        "Embedding" vector(1024)
      );
    `);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
      DROP TABLE "EmbeddingTool";
    `);

  }
}