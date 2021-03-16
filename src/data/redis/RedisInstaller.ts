import redis from "redis"
import connectRedis from "connect-redis"
import session from "express-session"
import ISessionInstaller from "./ISessionInstaller"

export default class RedisInstaller implements ISessionInstaller {
    public constructor() {
    }

    public Init(app: any, secretKey: string): void {
        const RedisStore = connectRedis(session)
        const redisClient = redis.createClient({})
        app.use(
            session({
                store: new RedisStore({ client: redisClient }),
                secret: secretKey,
                resave: false,
            })
        )
    }
}
