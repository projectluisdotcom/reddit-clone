import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core"
import { IHashGenerator as IHasher } from "src/domain/IHashGenerator"

export default class GraphQlContext {
    public readonly EntityManager: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    public readonly Hasher: IHasher
    public constructor(em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>, hasher: IHasher){
        this.EntityManager = em
        this.Hasher = hasher
    }
}