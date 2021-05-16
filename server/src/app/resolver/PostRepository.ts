import Post from "../../domain/entity/Post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import GraphQlContext from "./GraphQlContext";
import PostResponse from "./dto/PostResponse";

@Resolver()
export default class PostRepository {
  @Query(() => [Post])
  async posts(@Ctx() ctx: GraphQlContext): Promise<Post[]> {
    return await ctx.EntityManager.getRepository(Post).find({});
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: string, @Ctx() ctx: GraphQlContext): Promise<Post | null> {
    return await ctx.EntityManager.getRepository(Post).findOne({ id });
  }

  @Mutation(() => PostResponse)
  async create(@Arg("title") title: string, @Ctx() ctx: GraphQlContext): Promise<PostResponse> {
    const post = new Post(title);

    const validation = post.Validate();
    if (!validation.IsValid) {
      return {
        errors: validation.Errors,
      };
    }

    await ctx.EntityManager.persistAndFlush(post);
    return {
      post,
    };
  }

  @Mutation(() => PostResponse)
  async update(@Arg("id") id: string, @Arg("title") title: string, @Ctx() ctx: GraphQlContext): Promise<PostResponse> {
    const post = await ctx.EntityManager.getRepository(Post).findOne({ id });
    if (!post) {
      return {};
    }

    post.title = title;

    const validation = post.Validate();
    if (!validation.IsValid) {
      return {
        errors: validation.Errors,
      };
    }

    await ctx.EntityManager.persistAndFlush(post);
    return {
      post,
    };
  }

  @Mutation(() => Boolean)
  async delete(@Arg("id") id: string, @Ctx() ctx: GraphQlContext): Promise<boolean> {
    try {
      await ctx.EntityManager.getRepository(Post).nativeDelete({ id });
      return true;
    } catch (error) {
      return false;
    }
  }
}
