import { Field, ObjectType } from "type-graphql";
import User from "../../../domain/entity/User";
import FieldError from "./FieldError";

@ObjectType()
export default class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
