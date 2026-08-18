import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_blog_posts_grid_background" AS ENUM('blue', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_posts_grid_background" AS ENUM('blue', 'white');
  ALTER TABLE "pages_blocks_blog_posts_grid" ADD COLUMN "background" "enum_pages_blocks_blog_posts_grid_background" DEFAULT 'blue';
  ALTER TABLE "_pages_v_blocks_blog_posts_grid" ADD COLUMN "background" "enum__pages_v_blocks_blog_posts_grid_background" DEFAULT 'blue';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_blog_posts_grid" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_blog_posts_grid" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_blog_posts_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_blog_posts_grid_background";`)
}
