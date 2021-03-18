import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import EntityValidationResult from "./EntityValidationResult";

@ObjectType()
@Entity()
export default class User {
    @Field(() => String)
    @PrimaryKey()
    id!: string

    @Field(() => String)
    @Property({ type: "date" })
    createdAt: Date = new Date()

    @Field(() => String)
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date()

    @Field(() => String)
    @Property({ type: "text" })
    title!: string

    public Validate(): EntityValidationResult {
        let isValid: boolean = true
        const errors: string[] = []

        if(this.title === '' || this.title == null){
            isValid = false
            errors.push("Title must be not empty or null")
        }

        return new EntityValidationResult(isValid, errors)
    }
}