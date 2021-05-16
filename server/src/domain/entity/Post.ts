import { v4 } from "uuid";

import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import EntityValidationResult from "../kernel/EntityValidationResult";
import FieldError from "../kernel/FieldError";

@ObjectType()
@Entity()
export default class Post {
  @Field(() => String)
  @PrimaryKey()
  id: string = v4();

  @Field(() => String)
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "text" })
  title!: string;

  constructor(title: string) {
    this.title = title;
    this.createdAt = new Date();
  }

  public Validate(): EntityValidationResult {
    let isValid: boolean = true;
    const errors: FieldError[] = [];

    if (this.title === "" || this.title == null) {
      isValid = false;
      errors.push({
        field: "title",
        message: "Title must be not empty or null",
      });
    }

    return new EntityValidationResult(isValid, errors);
  }
}
