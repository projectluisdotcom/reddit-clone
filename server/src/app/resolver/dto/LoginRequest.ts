import { Field, InputType } from "type-graphql";

@InputType()
export default class LoginRequest {
  @Field()
  username: string;
  @Field()
  password: string;
}
