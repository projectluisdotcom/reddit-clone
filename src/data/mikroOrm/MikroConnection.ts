import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core'
import { Post } from "src/domain/entities/Post"
import dbConfig from './mikro-orm.config'

export default class MikroConnection {
    public async Install(): Promise<MikroORM<IDatabaseDriver<Connection>>> {
        const orm = await MikroORM.init(dbConfig)
        await orm.getMigrator().up()
        const p = orm.em.create(Post, { title: 'some title'})
        orm.em.persistAndFlush(p).then((e) => console.log(e)).catch(e => console.error(e))
        return orm
    }
}

