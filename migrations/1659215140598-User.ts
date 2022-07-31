import { MigrationInterface, QueryRunner } from 'typeorm'

export class User1659215140598 implements MigrationInterface {
  name = 'User1659215140598'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "credentials" ("id" character varying NOT NULL DEFAULT '00943498-6c23-43ff-b35f-80ca0b7343c9', "fname" character varying NOT NULL, "lname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c286aa8e09ecff5cc756ee8321" ON "credentials" ("email") `
    )
    await queryRunner.query(
      `INSERT INTO "credentials" (id, fname, lname, email, password) VALUES ('1', 'Admin', 'Admin', 'email@gmail.com', '$2b$10$cLwCpHKt7./f8a4UhxzlVe8O8C0UjoYOpWiaYfHF383IpwtUg2eY6')`
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL DEFAULT '24fd977d-be8c-448f-ad5c-ed35ffe311a6', "role" character varying NOT NULL DEFAULT 'SUBORDINATE', "credentialsId" character varying, "bossId" character varying, CONSTRAINT "REL_9f92e2173d4e8d981fe96cfdec" UNIQUE ("credentialsId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9f92e2173d4e8d981fe96cfdec9" FOREIGN KEY ("credentialsId") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_f92b3d839b53b5c4ff75bec5945" FOREIGN KEY ("bossId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `INSERT INTO "user" (id, role, "credentialsId") VALUES ('1', 'ADMIN', '1')`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f92b3d839b53b5c4ff75bec5945"`)
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9f92e2173d4e8d981fe96cfdec9"`)
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_c286aa8e09ecff5cc756ee8321"`)
    await queryRunner.query(`DROP TABLE "credentials"`)
  }
}
