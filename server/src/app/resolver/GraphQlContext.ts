import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core"
import { IHashGenerator } from "src/domain/abstraction/IHashGenerator"

export default class GraphQlContext {
    public readonly EntityManager: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    public readonly Hasher: IHashGenerator
    public constructor(em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>, hasher: IHashGenerator){
        this.EntityManager = em
        this.Hasher = hasher
    }
}