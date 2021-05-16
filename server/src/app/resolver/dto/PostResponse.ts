import { Field, ObjectType } from "type-graphql";
import Post from "../../../domain/entity/Post";
import FieldError from "./FieldError";

@ObjectType()
export default class PostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
