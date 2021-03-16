import dotenv from 'dotenv'

class Env {
    public readonly Config: dotenv.DotenvParseOutput

    public constructor(){
        const env = dotenv.config({ path: '.env' })

        if(env.error != null){
            console.error(`Env error ${env.error?.message}`)
            return
        }

        if(env.parsed != null){
            this.Config = env.parsed
        }
    }
}

export default new Env()