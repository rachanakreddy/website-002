import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_films_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__films_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_films_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_film_media_id" integer,
  	"version_synopsis" varchar,
  	"version_long_information" jsonb,
  	"version_optional_media_image1_id" integer,
  	"version_optional_media_image2_id" integer,
  	"version_qa1_question" varchar,
  	"version_qa1_answer" varchar,
  	"version_qa2_question" varchar,
  	"version_qa2_answer" varchar,
  	"version_qa3_question" varchar,
  	"version_qa3_answer" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__films_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "directory" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "directory_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sign_ups_id" integer
  );
  
  ALTER TABLE "films" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "film_media_id" DROP NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "synopsis" DROP NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa1_question" DROP NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa1_answer" DROP NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa2_question" DROP NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa2_answer" DROP NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa3_question" DROP NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa3_answer" DROP NOT NULL;
  ALTER TABLE "films" ADD COLUMN "_status" "enum_films_status" DEFAULT 'draft';
  ALTER TABLE "_films_v" ADD CONSTRAINT "_films_v_parent_id_films_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."films"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_films_v" ADD CONSTRAINT "_films_v_version_film_media_id_media_id_fk" FOREIGN KEY ("version_film_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_films_v" ADD CONSTRAINT "_films_v_version_optional_media_image1_id_media_id_fk" FOREIGN KEY ("version_optional_media_image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_films_v" ADD CONSTRAINT "_films_v_version_optional_media_image2_id_media_id_fk" FOREIGN KEY ("version_optional_media_image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "directory_rels" ADD CONSTRAINT "directory_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."directory"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "directory_rels" ADD CONSTRAINT "directory_rels_sign_ups_fk" FOREIGN KEY ("sign_ups_id") REFERENCES "public"."sign_ups"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_films_v_parent_idx" ON "_films_v" USING btree ("parent_id");
  CREATE INDEX "_films_v_version_version_film_media_idx" ON "_films_v" USING btree ("version_film_media_id");
  CREATE INDEX "_films_v_version_optional_media_version_optional_media_i_idx" ON "_films_v" USING btree ("version_optional_media_image1_id");
  CREATE INDEX "_films_v_version_optional_media_version_optional_media_1_idx" ON "_films_v" USING btree ("version_optional_media_image2_id");
  CREATE INDEX "_films_v_version_version_updated_at_idx" ON "_films_v" USING btree ("version_updated_at");
  CREATE INDEX "_films_v_version_version_created_at_idx" ON "_films_v" USING btree ("version_created_at");
  CREATE INDEX "_films_v_version_version__status_idx" ON "_films_v" USING btree ("version__status");
  CREATE INDEX "_films_v_created_at_idx" ON "_films_v" USING btree ("created_at");
  CREATE INDEX "_films_v_updated_at_idx" ON "_films_v" USING btree ("updated_at");
  CREATE INDEX "_films_v_latest_idx" ON "_films_v" USING btree ("latest");
  CREATE INDEX "_films_v_autosave_idx" ON "_films_v" USING btree ("autosave");
  CREATE INDEX "directory_rels_order_idx" ON "directory_rels" USING btree ("order");
  CREATE INDEX "directory_rels_parent_idx" ON "directory_rels" USING btree ("parent_id");
  CREATE INDEX "directory_rels_path_idx" ON "directory_rels" USING btree ("path");
  CREATE INDEX "directory_rels_sign_ups_id_idx" ON "directory_rels" USING btree ("sign_ups_id");
  CREATE INDEX "films__status_idx" ON "films" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_films_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "directory" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "directory_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_films_v" CASCADE;
  DROP TABLE "directory" CASCADE;
  DROP TABLE "directory_rels" CASCADE;
  DROP INDEX "films__status_idx";
  ALTER TABLE "films" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "film_media_id" SET NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "synopsis" SET NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa1_question" SET NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa1_answer" SET NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa2_question" SET NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa2_answer" SET NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa3_question" SET NOT NULL;
  ALTER TABLE "films" ALTER COLUMN "qa3_answer" SET NOT NULL;
  ALTER TABLE "films" DROP COLUMN "_status";
  DROP TYPE "public"."enum_films_status";
  DROP TYPE "public"."enum__films_v_version_status";`)
}
