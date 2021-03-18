import User from "../domain/entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
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

    @Mutation(() => User, { nullable: true })
    async login(@Arg("title") title: string, @Ctx() ctx: GraphQlContext): Promise<User | null> {
        const repository = ctx.EntityManager.getRepository(User)
        const user = repository.create({ title })

        if(!user.Validate().IsValid){
            return null
        }

        await repository.persist(User).flush()
        return user
    }

    @Mutation(() => User, { nullable: true })
    async update(@Arg("id") id: string, @Arg("title") title: string, @Ctx() ctx: GraphQlContext): Promise<User | null> {
        const user = await ctx.EntityManager.getRepository(User).findOne({ id })
        if(!user){
            return null
        }

        user.title = title

        if(!user.Validate().IsValid){
            return null
        }

        await ctx.EntityManager.persistAndFlush(user)
        return user
    }

    @Mutation(() => Boolean)
    async delete(@Arg("id") id: string, @Ctx() ctx: GraphQlContext): Promise<boolean> {
        try {
            await ctx.EntityManager.getRepository(User).nativeDelete({ id })
            return true
        } catch (error) {
            return false
        }
    }
}
