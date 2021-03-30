import redis from "redis"
import connectRedis from "connect-redis"
import session from "express-session"

export default class RedisInstaller {
    public constructor() {
    }

    public Init(app: any, sessionSecret: string | undefined, sessionDbPassword: string | undefined): void {
        const RedisStore = connectRedis(session)
        const redisClient = redis.createClient({
            password: sessionDbPassword
        })
        app.use(
            session({
                store: new RedisStore({ client: redisClient }),
                secret: sessionSecret,
                resave: false,
            })
        )
    }
}
