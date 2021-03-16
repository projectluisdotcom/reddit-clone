import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core"

export default class GraphQlContext {
    public readonly Orm: MikroORM<IDatabaseDriver<Connection>>
    public constructor(orm: MikroORM<IDatabaseDriver<Connection>>){
        this.Orm = orm
    }
}