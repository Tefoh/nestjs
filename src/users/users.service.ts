import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserEntity } from './entities/user.entity';
import { HashService } from 'src/hash/hash.service';
import { ActiveUserInterface } from './interfaces/active-user.interface';
import slugify from 'slugify';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly hashService: HashService,
  ) {}

  findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(userDetails: UserEntity): Promise<User> {
    userDetails.password = await this.hashService.hash(userDetails.password);
    userDetails.username = slugify(userDetails.email.split('@')[0], {
      replacement: '-',
      lower: true,
      strict: true,
    });
    return new this.userModel(userDetails).save();
  }

  getActiveUser(user: ActiveUserInterface) {
    return this.userModel.findById(user.sub, { password: 0, _id: 0 });
  }

  async updateUserPassword(id: string, password: string) {
    const hash = await this.hashService.hash(password);

    return this.userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hash,
        },
      },
      { new: true },
    );
  }
}
