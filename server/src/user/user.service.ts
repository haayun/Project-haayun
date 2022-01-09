import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./user.entity"
import { CreateUserInput, UpdateUserInput } from './user-inputs.dto';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { GraphQLError } from "graphql";

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) { }


  async createUser(createUserInput: CreateUserInput) {
    try {
      const isUser = await this.UserModel.findOne({
        email: createUserInput.email
      });
      if (isUser) {
        throw new GraphQLError('You already exist');
      } else {
        createUserInput.password = await bcrypt.hash(createUserInput.password, 10)
          .then((r) => r);
        return await new this.UserModel(createUserInput).save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login({ password, email }) {
    try {
      const user = await this.UserModel.findOne({email});
      return user && (await bcrypt.compare(password, user.password)) 
        ? await this.jwtService.signAsync({ email, _id: user._id })
        : new GraphQLError('wrong password/email');
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.UserModel.find().exec();
    } catch (error) {
      console.log(error);
    }
  }
}
