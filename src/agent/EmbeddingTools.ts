import { Column, Entity, Index, OneToMany } from "typeorm";

@Index("Embedding_pkey", ["Id"], { unique: true })
@Entity("EmbeddingTool", { schema: "public" })
export class EmbeddingTool {
    @Column("uuid", { primary: true, name: "Id", generated: "uuid" })
    Id: string;

    @Column("character varying", { name: "ToolName", nullable: false })
    ToolName: string;

    @Column("text", { name: "Document" })
    Document: string;

    @Column({
        name: "Embedding",
        nullable: true
    })
    Embedding: number[];


}
