import {MigrationInterface, QueryRunner} from "typeorm";

export class createBrands1631124906910 implements MigrationInterface {
    name = 'createBrands1631124906910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "brandId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."brand" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."brand" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."category" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."category" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."brand" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."brand" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."brand" ADD CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "public"."brand" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "public"."brand" ADD "image" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."category" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "public"."product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`ALTER TABLE "public"."category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"`);
        await queryRunner.query(`ALTER TABLE "public"."category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."category" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."brand" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "public"."brand" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."brand" DROP CONSTRAINT "UQ_5f468ae5696f07da025138e38f7"`);
        await queryRunner.query(`ALTER TABLE "public"."brand" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."brand" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."category" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "public"."category" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "public"."brand" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "public"."brand" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "brandId"`);
    }

}
