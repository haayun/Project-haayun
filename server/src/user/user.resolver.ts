import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { CreateUserInput } from './user-inputs.dto';
import { User } from "./user.entity";
import { GqlAuthGuard } from './user.guard';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly us: UserService) { }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ) {
    try {
      return await this.us.createUser(createUserInput);
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    try {
      return await this.us.login({ email, password });
    } catch (error) {
      console.log(error);
    }
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async findAllUsers() {
    try {
      return await this.us.findAll();
    } catch (error) {
      console.log(error);
    }
  }
}
