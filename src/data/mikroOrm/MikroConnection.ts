import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core'
import dbConfig from './mikro-orm.config'

export default class MikroConnection {
    public async Install(): Promise<MikroORM<IDatabaseDriver<Connection>>> {
        const orm = await MikroORM.init(dbConfig)
        await orm.getMigrator().up()
        return orm
    }
}

