import User from "../../domain/entity/User";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import GraphQlContext from "./GraphQlContext";

@Resolver()
export default class UserRepository {
    @Query(() => [User])
    async Users(@Ctx() ctx: GraphQlContext): Promise<User[]> {
        return await ctx.EntityManager.getRepository(User).find({})
    }

    @Query(() => User, { nullable: true })
    async User(@Arg("id") id: string, @Ctx() ctx: GraphQlContext): Promise<User | null> {
        return await ctx.EntityManager.getRepository(User).findOne({ id })
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("request") request: LoginRequest,
        @Ctx() ctx: GraphQlContext
    ): Promise<UserResponse> {
        if(request.username?.length <= 2){
            return {
                errors: [{
                    field: "username",
                    message: "needs to be longer than 2",
                }]
            }
        }

        if(request.password?.length <= 3){
            return {
                errors: [{
                    field: "password",
                    message: "needs to be longer than 3",
                }]
            }
        }

        const repository = ctx.EntityManager.getRepository(User)
        const hashedPassword = ctx.Hasher.Hash(request.password)

        const user = repository.create({
            username: request.username,
            password: hashedPassword,
        })

        await repository.persist(user).flush()

        return {
            user,
        }
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("title") request: LoginRequest,
        @Ctx() ctx: GraphQlContext
    ): Promise<UserResponse> {
        try {
            const repository = ctx.EntityManager.getRepository(User)
            const user = await repository.findOneOrFail({ username: request.username, })
            const isValid = ctx.Hasher.Verify(user.password, request.password)
            if(!isValid){
                return { 
                    errors: [{
                        field: "password",
                        message: "wrong password",
                    }]
                }
            }
            return {
                user,
            }
        } catch(e) {
            return { 
                errors: [{
                    field: "username",
                    message: "missing username",
                }]
            }
        }
    }
}

@InputType()
class LoginRequest {
    @Field()
    username: string;
    @Field()
    password: string;
}

@ObjectType()
class UserResponse {
    @Field(() => User, { nullable: true })
    user?: User;
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];
}

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message?: string;
}
