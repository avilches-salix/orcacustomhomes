import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_blog_posts_grid" ADD COLUMN "cta_title" varchar;
  ALTER TABLE "_pages_v_blocks_blog_posts_grid" ADD COLUMN "cta_title" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_blog_posts_grid" DROP COLUMN "cta_title";
  ALTER TABLE "_pages_v_blocks_blog_posts_grid" DROP COLUMN "cta_title";`)
}
