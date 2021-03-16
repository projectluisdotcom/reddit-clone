import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core"

export default class GraphQlContext {
    public readonly EntityManager: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    public constructor(em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>){
        this.EntityManager = em
    }
}