import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from './entities/author.entity';
import * as bcrypt from 'bcryptjs';
import { AuthorRepository } from './author.repository';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Author',
        useFactory: async () => {
          const schema = AuthorSchema;
          schema.pre('save', async function (next) {
            if (this.isModified('password')) {
              const salt = await bcrypt.genSalt(12);
              this.password = await bcrypt.hash(this.password, salt);
            }
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [AuthorsService, AuthorRepository],
  exports: [AuthorsService],
})
export class AuthorsModule {}
