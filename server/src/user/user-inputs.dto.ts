import { Field, InputType, OmitType, PartialType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {

    @Field()
    name: string;

    @Field()
    password: string;

    @Field()
    email: string;

    @Field()
    createdAt: string = new Date().toISOString();
}

@InputType()
export class UpdateUserInput extends PartialType(
    OmitType(CreateUserInput, ['password', 'createdAt'] as const),
) {}