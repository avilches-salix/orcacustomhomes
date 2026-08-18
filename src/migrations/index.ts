import * as migration_20260818_220000_add_blog_posts_grid_background from './20260818_220000_add_blog_posts_grid_background';
import * as migration_20260818_214755_add_blog_posts_grid_cta from './20260818_214755_add_blog_posts_grid_cta';

export const migrations = [
  {
    up: migration_20260818_220000_add_blog_posts_grid_background.up,
    down: migration_20260818_220000_add_blog_posts_grid_background.down,
    name: '20260818_220000_add_blog_posts_grid_background',
  },
  {
    up: migration_20260818_214755_add_blog_posts_grid_cta.up,
    down: migration_20260818_214755_add_blog_posts_grid_cta.down,
    name: '20260818_214755_add_blog_posts_grid_cta',
  },
];
