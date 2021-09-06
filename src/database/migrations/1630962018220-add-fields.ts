import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFields1630962018220 implements MigrationInterface {
  name = 'addFields1630962018220';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "updateAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "createAt"`,
    );
  }
}
