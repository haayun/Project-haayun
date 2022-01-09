import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      debug: false,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    UserModule
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
