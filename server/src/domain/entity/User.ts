import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import EntityValidationResult from "../result/EntityValidationResult";

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
    username!: string

    @Field(() => String)
    @Property({ type: "text" })
    password!: string

    public Validate(): EntityValidationResult {
        let isValid: boolean = true
        const errors: string[] = []

        if(this.username === '' || this.username == null){
            isValid = false
            errors.push("Username must be not empty or null")
        }

        if(this.password === '' || this.password == null){
            isValid = false
            errors.push("Password must be not empty or null")
        }

        return new EntityValidationResult(isValid, errors)
    }
}