import { MikroORM } from '@mikro-orm/core'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

export default {
    migrations: {
        path: path.join(__dirname, '../migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    type: process.env.DB_TYPE,
    debug: process.env.DB_DEBUG?.toLowerCase() === 'true',
    entities: ['./dist/domain/entities'],
    entitiesTs: ['./src/domain/entities'],
    baseDir: process.cwd(),
} as Parameters<typeof MikroORM.init>[0]
