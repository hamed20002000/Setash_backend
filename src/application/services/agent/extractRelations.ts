import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { DataSource } from "typeorm";

export function extractRelations(dataSource: DataSource) {
  const schema = {
    generatedAt: new Date().toISOString(),

    tables: dataSource.entityMetadatas.map((entity) => {

      const columns = entity.columns.map((column) => {

        const isUnique =
          entity.uniques.some(u =>
            u.columns.some(c => c.databaseName === column.databaseName)
          ) ||
          entity.indices.some(i =>
            i.isUnique &&
            i.columns.some(c => c.databaseName === column.databaseName)
          );

        return {
          name: column.databaseName,
          property: column.propertyName,

          type:
            typeof column.type === "string"
              ? column.type
              : column.type?.name,

          primaryKey: column.isPrimary,
          generated: column.isGenerated,
          nullable: column.isNullable,

          createDate: column.isCreateDate,
          updateDate: column.isUpdateDate,
          deleteDate: column.isDeleteDate,

          version: column.isVersion,

          unique: isUnique,

          default: column.default ?? null,

          length: column.length ?? null,
          precision: column.precision ?? null,
          scale: column.scale ?? null,

          enum:
            Array.isArray(column.enum)
              ? column.enum
              : null
        };
      });

      const relationships = entity.relations.map((relation) => ({
        type: relation.relationType,

        sourceTable: entity.tableName,
        sourceColumn:
          relation.joinColumns[0]?.databaseName ?? null,

        targetTable:
          relation.inverseEntityMetadata.tableName,

        targetColumn:
          relation.inverseEntityMetadata.primaryColumns[0]
            ?.databaseName ?? null
      }));

      const joins = relationships.map(r => ({
        left: `${r.sourceTable}.${r.sourceColumn}`,
        right: `${r.targetTable}.${r.targetColumn}`
      }));

      return {

        name: entity.tableName,

        entity: entity.name,

        description: "",

        primaryKeys: columns
          .filter(c => c.primaryKey)
          .map(c => c.name),

        generatedColumns: columns
          .filter(c => c.generated)
          .map(c => c.name),

        requiredColumns: columns
          .filter(c =>
            !c.nullable &&
            !c.generated &&
            !c.createDate &&
            !c.updateDate &&
            !c.deleteDate
          )
          .map(c => c.name),

        nullableColumns: columns
          .filter(c => c.nullable)
          .map(c => c.name),

        columns,

        relationships,

        joins,

        rules: []
      };
    })
  };

  writeFileSync(
    join(process.cwd(), "src/application/services/agent/schema.json"),
    JSON.stringify(schema, null, 2),
    "utf8"
  );

    return schema;
}