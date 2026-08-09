import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNameTrToNotificationLists1719686400000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "NotificationLists",
      new TableColumn({
        name: "NameTr",
        type: "character varying",
        isNullable: true,
        comment: "Turkish name of notification list",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("NotificationLists", "NameTr");
  }
}
