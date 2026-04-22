import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Homes } from './collections/Homes'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Blogs } from './collections/Blogs'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Homes, Blogs],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: 'media',
      config: {
        credentials: {
          accessKeyId: process.env.SUPABASE_STORE_ACCESS_KEY || '',
          secretAccessKey: process.env.SUPABASE_STORE_SECRET_ACCESS_KEY || '',
        },
        endpoint: process.env.SUPABASE_STORAGE_ENDPOINT,
        forcePathStyle: true,
        region: process.env.SUPABASE_STORAGE_REGION || 'us-east-2',
      },
    }),
  ],
})
