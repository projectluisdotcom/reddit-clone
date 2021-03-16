import MikroConnection from "./data/mikroOrm/MikroConnection"
import express from 'express'
import env from './Env'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import HelloResolver from "./resolvers/PostRepository"
import GraphQlContext from "./resolvers/GraphQlContext"
import Argon2Adapter from "./app/Argon2Adapter"

const main = async () => {
    const hasher = new Argon2Adapter()
    const db = new MikroConnection()
    const orm = await db.Install()

    const apollo = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, ],
            validate: false,
        }),
        context: () => new GraphQlContext(orm)
    })

    const app = express()
    apollo.applyMiddleware({ app })
    app.listen(env.Config.PORT)
    console.log("Started")
}

main().catch(e => console.error(e))
