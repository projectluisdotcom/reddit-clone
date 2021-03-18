import env from '../../Env'
import { MikroORM } from '@mikro-orm/core'
import path from 'path'

export default {
    migrations: {
        path: path.join(__dirname, '../migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: env.Config.DB_NAME,
    user: env.Config.DB_USER,
    password: env.Config.DB_PASSWORD,
    type: env.Config.DB_TYPE,
    debug: env.Config.DB_DEBUG.toLowerCase() === 'true',
    entities: ['./dist/domain/entities'],
    entitiesTs: ['./src/domain/entities'],
    baseDir: process.cwd(),
} as Parameters<typeof MikroORM.init>[0]
